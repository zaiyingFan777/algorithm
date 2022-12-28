// 990. 等式方程的可满足性
// 给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 equations[i] 的长度为 4，并采用两种不同的形式之一："a==b" 或 "a!=b"。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。
// 只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 true，否则返回 false。 

// 示例 1：
// 输入：["a==b","b!=a"]
// 输出：false
// 解释：如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。

// 示例 2：
// 输入：["b==a","a==b"]
// 输出：true
// 解释：我们可以指定 a = 1 且 b = 1 以满足满足这两个方程。

// 示例 3：
// 输入：["a==b","b==c","a==c"]
// 输出：true

// 示例 4：
// 输入：["a==b","b!=c","c==a"]
// 输出：false

// 示例 5：
// 输入：["c==c","b==d","x!=z"]
// 输出：true
 
// 提示：
// 1 <= equations.length <= 500
// equations[i].length == 4
// equations[i][0] 和 equations[i][3] 是小写字母
// equations[i][1] 要么是 '='，要么是 '!'
// equations[i][2] 是 '='

// 思路：并查集

class UF {
  // n 为图中节点的个数
  constructor(n) {
    this.count = n;
    this.parent = new Array(n).fill(0).map((item, index) => {  
      item = index;
      return item;
    });
  }

  // 将节点 p 和节点 q 连通
  union(p, q) {
    var rootP = this.find(p);
    var rootQ = this.find(q);

    if (rootP == rootQ)
      return;

    this.parent[rootQ] = rootP;
    // 两个连通分量合并成一个连通分量
    this.count--;
  }

  // 判断节点 p 和节点 q 是否连通
  connected(p, q) {
    var rootP = this.find(p);
    var rootQ = this.find(q);
    return rootP == rootQ;
  }

  find(x) {
    if (this.parent[x] != x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // 返回图中的连通分量个数
  $$count() {
    return this.count;
  }
}

// 思路：
// 1.==的先建立连通性
// 2.不等的看是否破坏其连通性

/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
  var base = 'a'.charCodeAt(0);
  var uf = new UF(26); // 一共26个字母
  // 先建立连通性
  for (var eq of equations) {
    if (eq.charAt(1) === '=') {
      // 比如'a==a'，'a'.charCodeAt(0) 对应的97 我们可以将97 - 'a'.charCodeAt(0)作为数组下标0插入uf，b就是1
      var x = eq.charCodeAt(0);
      var y = eq.charCodeAt(3);
      uf.union(x - base, y - base);
    }
  }
  // 检查是否破坏连通性
  for (var eq of equations) {
    if (eq.charAt(1) === '!') {
      var x = eq.charCodeAt(0);
      var y = eq.charCodeAt(3);
      if (uf.connected(x - base, y - base)) 
        return false;
    }
  }
  return true;
};
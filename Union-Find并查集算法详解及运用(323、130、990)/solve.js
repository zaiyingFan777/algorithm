// 130. 被围绕的区域
// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 
// 示例 1：
// 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
// 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
// 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

// 示例 2：
// 输入：board = [["X"]]
// 输出：[["X"]]
 
// 提示：
// m == board.length
// n == board[i].length
// 1 <= m, n <= 200
// board[i][j] 为 'X' 或 'O'

// 1.采用union-find

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

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board.length == 0) return;

  // 行
  var m = board.length;
  // 列
  var n = board[0].length;
  // 给 dummy(假) 留一个额外位置
  var uf = new UF(m * n + 1); // 从1到m*n下标对应其值
  var dummy = m * n;
  // 将首列和末列的 O 与 dummy 连通
  for (var i = 0; i < m; i++) {
    if (board[i][0] == 'O') {
      // 左边第一列有为'O'的，将其与dummy连通
      // (x, y) => x * n + y，因为y为0，所以为 i * n
      uf.union(i * n, dummy);
    }
    if (board[i][n - 1] == 'O') {
      // 右边最后一列有为'O'的，将其与dummy连通
      uf.union(i * n + (n - 1), dummy);
    }
  }
  // 将首行和末行的 O 与 dummy 连通
  for (var j = 0; j < n; j++) {
    if (board[0][j] == 'O') {
      // 第一行
      uf.union(j, dummy);
    }
    if (board[m-1][j] == 'O') {
      // 最后一行
      uf.union((m - 1) * n + j, dummy);
    }
  }
  // 方向数组 d 是上下左右搜索的常用手法
  // 以(0, 0)为基准的上(-1, 0) 下 (1, 0) 左 (0, -1) 右 (0, 1)
  var d = [[1, 0], [0, 1], [0, -1], [-1, 0]];
  // 行: 排除了首末行
  for (var i = 1; i < m - 1; i++) {
    // 列：排除了最左列、最右列
    for (var j = 1; j < n - 1; j++) {
      if (board[i][j] == 'O') {
        // 将此 O 与上下左右的 O 连通
        // 得到(i, j)的上下左右四处坐标
        for (var k = 0; k < 4; k++) {
          // d: [[1, 0], [0, 1], [0, -1], [-1, 0]]
          // d[0][0]: 1, d[1][0]: 0, d[2][0]: 0，d[3][0]: -1;
          var x = i + d[k][0];
          // d[0][1]: 0, d[1][1]: 1, d[2][1]: -1，d[3][1]: 0;
          var y = j + d[k][1];
          if (board[x][y] == 'O') {
            // 将(x, y)与(i, j)连通
            uf.union(x * n + y, i * n + j);
          }
        }
      }
    }
  }
  // 所有不和 dummy 连通的 O，都要被替换
  for (var i = 1; i < m - 1; i++) {
    for (var j = 1; j < n - 1; j++) {
      if (!uf.connected(dummy, i * n + j)) {
        board[i][j] = 'X';
      }
    }
  }
};


// 2.dfs
// 思路：四周最边上的O以及其相邻的O先变为#(dfs),然后将O变为X，最后再将#变为O
// 时间复杂度：O(mn)
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board.length === 0) return;
  var m = board.length, n = board[0].length;
  // 将首列末列dfs
  for (var i = 0; i < m; i++) {
    dfs(board, i, 0);
    dfs(board, i, n - 1);
  }
  // 将首行末行dfs
  for (var j = 0; j < n; j++) {
    dfs(board, 0, j);
    dfs(board, m - 1, j);
  }
  // 将不是O的变为X
  for (var i = 1; i < m - 1; i++) {
    for (var j = 1; j < n - 1; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      }
    }
  }
  // 将#变为O
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
}

var dfs = function(board, i, j) {
  var m = board.length, n = board[0].length;
  if (i < 0 || i >= m || j < 0 || j >= n) return;
  // 如果本身就是X，直接返回
  if (board[i][j] !== 'O') return;
  // 将O变为#
  board[i][j] = '#';
  // 将O周边的O变为#
  dfs(board, i + 1, j); // 下
  dfs(board, i, j + 1); // 右
  dfs(board, i - 1, j); // 上
  dfs(board, i, j - 1); // 左
}

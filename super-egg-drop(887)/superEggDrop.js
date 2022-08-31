// 887. 鸡蛋掉落

// 给你 k 枚相同的鸡蛋，并可以使用一栋从第 1 层到第 n 层共有 n 层楼的建筑。
// 已知存在楼层 f ，满足 0 <= f <= n ，任何从 高于 f 的楼层落下的鸡蛋都会碎，从 f 楼层或比它低的楼层落下的鸡蛋都不会破。
// 每次操作，你可以取一枚没有碎的鸡蛋并把它从任一楼层 x 扔下（满足 1 <= x <= n）。如果鸡蛋碎了，你就不能再次使用它。如果某枚鸡蛋扔下后没有摔碎，则可以在之后的操作中 重复使用 这枚鸡蛋。
// 请你计算并返回要确定 f 确切的值 的 最小操作次数 是多少？
 
// 示例 1：
// 输入：k = 1, n = 2
// 输出：2
// 解释：
// 鸡蛋从 1 楼掉落。如果它碎了，肯定能得出 f = 0 。 
// 否则，鸡蛋从 2 楼掉落。如果它碎了，肯定能得出 f = 1 。 
// 如果它没碎，那么肯定能得出 f = 2 。 
// 因此，在最坏的情况下我们需要移动 2 次以确定 f 是多少。 

// 示例 2：
// 输入：k = 2, n = 6
// 输出：3

// 示例 3：
// 输入：k = 3, n = 14
// 输出：4
 

// 提示：
// 1 <= k <= 100
// 1 <= n <= 104

// 超出时间限制
// 时间复杂度：函数本身的复杂度就是忽略部分的复杂度，这里dp函数中有一个for循环，所以函数本身的复杂度是O(N)。
// 子问题的个数也就是不同状态的组合数，显然是两个状态的乘积，也就是O(KN)，所以算法的总时间复杂度是O(K*N^2)。
// 空间复杂度是O(KN)，子问题的个数存到map中
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
  // 定义Memo
  var memo = new Map();
  // 定义dp函数：当前状态为k个鸡蛋，面对n层楼
  // 返回这个状态的最优结果
  var dp = function(k, n) {
    // base case
    if (k === 1) return n; // 如果只有一个鸡蛋的时候最坏情况要尝试n次
    if (n === 0) return 0; // 如果到0楼的时候不需要扔鸡蛋
    var key = `${k},${n}`;
    // 如果备忘录中存在，则返回
    if (memo.has(key)) return memo.get(key);
    // 定义结果，初始值为正无穷
    var res = Infinity;
    for(var i = 1; i <= n; i++) {
      // 返回每个状态的最优结果，就是要取鸡蛋碎还是不碎最坏的情况的最大值的最小值
      res = Math.min(res, Math.max(
        dp(k-1, i-1), // 碎     比如有8层，当前在第四层，如果碎了，那就是1-3总共三层，也就是i-1为3
        dp(k, n-i),   // 没碎   比如有8层，当前在第四层，如果没碎，那就是5，6，7，8共四层，也就是n-i为8-4为4
      ) + 1); // 本次扔了一次鸡蛋，
    }
    memo.set(key, res);
    return res;
  }
  return dp(k, n);
};


// 二分搜索优化
// 函数本身的复杂度就是忽略递归部分的复杂度，这里dp函数中用了一个二分搜索，所以函数本身的复杂度是O(logN)。
// 子问题的个数也就是不同状态组合的总数，显然是两个状态的乘积，也就是O(KN)。
// 所以算法的总时间复杂度是O(KNlogN)，空间复杂度O(KN)。效率上比之前的算法O(KN^2)要高效一些。
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
  // 定义备忘录
  var memo = new Map();
  // 定义dp函数
  var dp = function(k, n) {
    // base case
    if (k === 1) return n;
    if (n === 0) return 0;
    var key = `${k},${n}`;
    // memo中是否存在
    if (memo.has(key)) return memo.get(key);
    // 定义结果
    var res = Infinity;
    // 采用二分搜索
    var lo = 1, hi = n;
    while(lo <= hi) {
      var mid = Math.floor((lo + hi) / 2);
      // 碎与不碎
      var broken = dp(k-1, mid-1);    // 碎
      var notBroken = dp(k, n-mid);   // 不碎
      // 比较大小
      if (broken > notBroken) {
        // 碎了，缩小hi
        hi = mid - 1;
        res = Math.min(res, broken + 1);
      } else {
        // 没碎，提高lo
        lo = mid + 1;
        res = Math.min(res, notBroken + 1);
      }
    }
    memo.set(key, res);
    return res;
  }
  return dp(k, n);
}

// 重新定义状态转移
// 给你K个鸡蛋，测试m次，最坏情况下最多能测试N层楼。
// **1.无论你在哪层楼扔鸡蛋，鸡蛋只可能摔碎或者没摔碎，碎了的话就测楼下，没碎的话就测楼上。**
// **2.无论你上楼还是下楼，总的楼层数 = 楼上的楼层数 + 楼下的楼层数 + 1(当前这层楼)。**
// 状态转移方程：dp[k][m] = dp[k][m-1] + dp[k-1][m-1] + 1
// **dp[k][m-1]就是楼上的楼层数，**因为鸡蛋个数K不变，也就是鸡蛋没碎，扔鸡蛋次数m减一；
// **dp[k-1][m-1]就是楼下的楼层数，**因为鸡蛋个数k减一，也就是鸡蛋碎了，同时扔鸡蛋次数m减一。

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
  // 定义dp数组
  // dp[k][m] = n，限制k个鸡蛋，扔m次，最坏情况下扔n楼
  // m的扫描次数不能大于n
  // base case: dp[0][..]当鸡蛋为0的时候，无论能扔多少次，都只能扔0层
  // dp[..][0]当扔次数为0的时候，无论有多少个鸡蛋，都只能扔0层
  var dp = new Array(k+1).fill(null).map(() => new Array(n+1).fill(0)); 
  var m = 0;
  // 循环终止条件：dp[k][m] == n
  while(dp[k][m] < n) {
    m++;
    for(var K = 1; K <= k; K++) {
      // 状态转移方程
      dp[K][m] = dp[K][m-1] + dp[K-1][m-1] + 1;
    }
  }
  return m;
}
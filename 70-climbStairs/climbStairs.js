// 70. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 示例 1：
// 输入：n = 2
// 输出：2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶

// 示例 2：
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶

// 提示：
// 1 <= n <= 45

// 动态规划
// dp[n]代表上第n个台阶有多少种跳法
// 状态：表示为上第 n 层台阶时所需要的跳法
// 选择：你可以从dp[n-1]或者dp[n-2]跳上来，所以取和
// 状态转移：dp[n] = dp[n-1] + dp[n-2]
// base case: dp[0] = 1，dp[1] = 1，因为到第0层也就是不动这种方法，到第一层就是需要跳1层就这一种方法
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  var dp = new Array(n+1).fill(0);
  // base case
  dp[0] = dp[1] = 1;
  for(var i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}

// 其实第n层只需要n-1与n-2，所以可以不设置数组
var climbStairs = function (n) {
  var dp_i_1 = dp_i_2 = 1;
  for(var i = 2; i <= n; i++) {
    var sum = dp_i_1 + dp_i_2;
    dp_i_2 = dp_i_1;
    dp_i_1 = sum;
  }
  return dp_i_1;
}
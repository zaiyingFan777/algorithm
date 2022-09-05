// 518. 零钱兑换 II
// 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
// 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
// 假设每一种面额的硬币有无限个。 

// 题目数据保证结果符合 32 位带符号整数。

// 示例 1：
// 输入：amount = 5, coins = [1, 2, 5]
// 输出：4
// 解释：有四种方式可以凑成总金额：
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1

// 示例 2：
// 输入：amount = 3, coins = [2]
// 输出：0
// 解释：只用面额 2 的硬币不能凑成总金额 3 。

// 示例 3：
// 输入：amount = 10, coins = [10] 
// 输出：1
 
// 提示：

// 1 <= coins.length <= 300
// 1 <= coins[i] <= 5000
// coins 中的所有值 互不相同
// 0 <= amount <= 5000

// 此问题可以看为：若只使用coins中的前i个硬币的面值，若想凑出金额j，有dp[i][j]种凑法
// 1.动态规划，二维数组版本
// 状态：背包的重量和可选择的物品
// 选择：选择就是「装进背包」或者「不装进背包」
// 状态方程：dp[i][j] = dp[i-1][j] + dp[i][j-nums[i-1]]，将nums[i-1]装进去以及不装进去的装法的总和
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  var n = coins.length;
  // 定义二维dp
  var dp = new Array(n+1).fill(null).map(() => new Array(amount+1).fill(0));
  // base case 
  // dp[0][..]因为如果不使用任何硬币面值，就无法凑出任何金额
  // dp[..][0]想凑出金额为0的情况只能是1种什么也不选。
  for(var i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }
  for(var i = 1; i <= n; i++) {
    for(j = 1; j <= amount; j++) {
      if (j - coins[i-1] >= 0) { // 当前金额可以用nums[i-1]来凑
        // i-1是因为我们从i=1开始的
        dp[i][j] = dp[i-1][j]  // 不用当前的num[i-1]
                  + dp[i][j-coins[i-1]]; // 用当前的i-1，知道了dp[i][j-nums[i-1]]就知道装入nums[i-1]的次数，比如现在j为5，nums[i-1]为2，我们只需要知道dp[i][3]就知道了本次，因为加上这次的2，凑够了5也就只是一种情况
      } else {
        dp[i][j] = dp[i-1][j];
      }
    }
  }
  return dp[n][amount];
};

// 2.状态压缩
// dp数组的转移只和dp[i][..]和dp[i-1][..]有关，所以可以压缩状态，进一步降低算法的空间复杂度：
// 忽略掉dp[i]行这个问题。
var change = function(amount, coins) {
  var n = coins.length;
  var dp = new Array(amount+1).fill(0);
  // base case: dp[..][0]想凑出金额为0的情况只能是1种什么也不选。
  dp[0] = 1;
  for(var i = 0; i < n; i++) { // dp是一维数组我们从0开始循环
    for(var j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j-coins[i]];
      } else {
        dp[j] = dp[j];
      }
    }
  }
  return dp[amount];
}
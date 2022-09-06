// 494. 目标和
// 给你一个整数数组 nums 和一个整数 target 。
// 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
// 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
// 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

// 示例 1：
// 输入：nums = [1,1,1,1,1], target = 3
// 输出：5
// 解释：一共有 5 种方法让最终目标和为 3 。
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3

// 示例 2：
// 输入：nums = [1], target = 1
// 输出：1

// 提示：

// 1 <= nums.length <= 20
// 0 <= nums[i] <= 1000
// 0 <= sum(nums[i]) <= 1000
// -1000 <= target <= 1000

// 一、回溯
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  var result = 0;
  if (nums.length === 0) return 0;
  var backtrack = function (nums, i, rest) {
    // base case
    if (i === nums.length) {
      // 将target变为0与将0变为target是相反的等价操作
      // 将0变为target与target变为0的操作：+nums[i]与-nums[i]、-nums[i]与+nums[i]
      if (rest === 0) {
        result++;
      }
      return;
    }
    // 做选择：- +
    // -
    rest += nums[i];
    // 穷举 nums[i+1]
    backtrack(nums, i + 1, rest);
    // 撤销选择
    rest -= nums[i];
    // +
    rest -= nums[i];
    // 穷举 nums[i+1]
    backtrack(nums, i + 1, rest);
    // 撤销选择
    rest += nums[i];
  }
  backtrack(nums, 0, target);
  return result;
};

// 二、消除重叠子问题
var findTargetSumWays = function (nums, target) {
  if (nums.length === 0) return 0;
  // 定义备忘录
  var memo = new Map();
  // dp函数：变化的为i和rest
  var dp = function(nums, i, rest) {
    // base case
    if (i === nums.length) {
      // 结果为0则返回1，不为0说明计算没有得到target，则返回0
      if (rest === 0) return 1;
      return 0;
    }
    var key = `${i},${rest}`;
    // 避免重复计算
    if (memo.has(key)) return memo.get(key);
    // 穷举：无论是+还是— 都是做的选择，都可能存在求的结果的可能性，所以相加
    var result = dp(nums, i + 1, rest + nums[i]) + dp(nums, i + 1, rest - nums[i]);
    memo.set(key, result);
    return result;
  }
  return dp(nums, 0, target);
}

// 三、动态规划
// sum(A) - sum(B) = target
// sum(A) = target + sum(B)
// sum(A) + sum(A) = target + sum(B) + sum(A)
// 2 * sum(A) = target + sum(nums)
// sum(A) = (target + sum(nums)) / 2
// 转换为背包问题：状态就是「背包的容量」和「可选择的物品」，选择就是「装进背包」或者「不装进背包」。
// 状态转移方程：dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]]
// base case: dp[0][..] = 0，因为没有物品的话，根本没办法装背包；dp[..][0] = 1，因为如果背包的最大载重为 0，「什么都不装」就是唯一的一种装法。

var findTargetSumWays = function (nums, target) {
  var n = nums.length;
  // 对nums求和
  var sum = nums.reduce((a, b) => a+b, 0);
  // 排除特殊情况
  // 这两种情况，不可能存在合法的子集划分(为什么(sum+target)%2==1不可以，因为如果不能被2整除，那么÷2后得到小数，整数相加不可能得到小数)
  if (sum < target || (sum + target) % 2 === 1 || (sum + target) / 2 < 0) {
    return 0;
  }
  sum = (sum + target) / 2;
  var dp = new Array(n+1).fill(null).map(() => new Array(sum+1).fill(0));
  // base case
  for(var i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }
  for(var i = 1; i <= n; i++) {
    // 由于nums[i]存在等于0的可能，所以j也要从0开始
    for(var j = 0; j <= sum; j++) {
      if (j - nums[i-1] >= 0) {
        dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]];
      } else {
        dp[i][j] = dp[i-1][j];
      }
    }
  }
  return dp[n][sum];
}

// 二维转为一维
var findTargetSumWays = function (nums, target) {
  var n = nums.length;
  // 对nums求和
  var sum = nums.reduce((a, b) => a+b, 0);
  // 排除特殊情况
  // 这两种情况，不可能存在合法的子集划分(为什么(sum+target)%2==1不可以，因为如果不能被2整除，那么÷2后得到小数，整数相加不可能得到小数)
  if (sum < target || (sum + target) % 2 === 1 || (sum + target) / 2 < 0) {
    return 0;
  }
  sum = (sum + target) / 2;
  var dp = new Array(sum+1).fill(0);
  dp[0] = 1;
  for(var i = 0; i < n; i++) { // i等1开始也可以 i<=n
    for(var j = sum; j >= 0; j--) {
      if (j - nums[i] >= 0) {
        dp[j] = dp[j] + dp[j-nums[i]];
      } else {
        dp[j] = dp[j];
      }
    }
  }
  return dp[sum];
}
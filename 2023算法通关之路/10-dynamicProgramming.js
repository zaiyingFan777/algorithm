// 10.动态规划
// lengthOfLIS-最长递增子序列 https://leetcode.cn/problems/longest-increasing-subsequence/
// 思路1：动态规划
// 状态：dp[i]代表以nums[i]为结尾的最长递增子序列的长度
// 转移方程：既然是递增子序列，我们只需要找到比nums[i]小的子序列，然后将nums[i]添加到子序列末尾，就可以形成一个新的递增子序列，
// 而且这个新的子序列长度加1。
// 复杂度分析
// 时间复杂度：(n^2)，其中 n 为数组 nums 的长度。动态规划的状态数为 n，计算状态 dp[i] 时，需要 O(n) 的时间遍历 dp[0…i−1] 的所有状态，所以总时间复杂度为 O(n^2)。
// 空间复杂度：O(n)，需要额外使用长度为 n 的 dp 数组。
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  var n = nums.length;
  // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
  // base case，定义dp数组，默认都为1，因为至少包含自身长度为1
  var dp = new Array(n).fill(1);
  // 结果值
  var res = 1;
  // 外层循环：给dp[i]赋值
  for (var i = 0; i < n; i++) {
    // 内层循环：找出比nums[i]小的子序列
    for (var j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 找到比nums[i]小的子序列，然后将nums[i]添加到子序列末尾，就可以形成一个新的递增子序列，
        // 而且这个新的子序列长度加1。
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(dp[i], res);
  }
  return res;
}


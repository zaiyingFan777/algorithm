// 45. 跳跃游戏 II
// 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
// 假设你总是可以到达数组的最后一个位置。

// 示例 1:
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

// 示例 2:
// 输入: nums = [2,3,0,1,4]
// 输出: 2

// 提示:
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000

// 1.动态规划
// 时间复杂度O(N^2) 空间复杂度O(N)
// 当前在数组的哪个下标为状态，选择为能跳几格

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  var n = nums.length;
  // memo
  // 因为从 0 跳到 n - 1 最多 n - 1 步  [1,2,3] 从下标0跳到下标2 最多n-1 2步
  var memo = new Array(n).fill(n);
  // 定义dp 
  var dp = function (p) {
    // base case
    if (p >= n - 1) {
      // 最后一个没必要跳了
      return 0;
    }
    // 检查memo
    if (memo[p] !== n) {
      return memo[p];
    }
    // 选择，我们遍历所有可以跳的结果
    for (var i = 1; i <= nums[p]; i++) {
      // 穷举每一个选择
      // 计算每一个子问题的结果
      // 子问题
      var subProblem = dp(p + i);
      // 取其中最小的作为最终结果
      // 为何subProblem + 1，首先subProblem是p+i的子问题，我们从p跳到p+i，也得跳一次。
      // 因为我们最后求的是次数
      memo[p] = Math.min(memo[p], subProblem + 1);
    }
    return memo[p];
  }
  return dp(0);
};


// 思路二：贪心算法
// 时间复杂度：O(n) 空间复杂度O(1)
// 贪心算法，每次我在我可选的范围里，找到能跳的最远的，然后作为下次可选的i，再去找能跳的最远的

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  var n = nums.length;
  // i end 标记了可以选择的跳跃步数，farthest标记了可选择跳跃步数[i..end]种能够跳到的最远距离，jumps记录了跳跃次数
  // 比如[2,3,1,1,4]第一次i == end == 0，我们必须跳一次，jump++ = 1，far = 2, end = 2，然后我们找 1-2之间找到下次能跳的最远的far=4 然后当i==end==2的时候 我们需要跳一次，然后让end为上一次i-end能跳的最远的far
  var end = 0, farthest = 0;
  var res = 0;
  for(var i = 0; i < n - 1; i++) { // 最后一处没必要跳了
    // 更新i..end之间能跳的最远的位置
    farthest = Math.max(farthest, nums[i] + i);
    if (i === end) {
      res++;
      end = farthest;
    }
  } 
  return res;
}
// 78. 子集
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
//
// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
//
// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]
//
// 提示：
//
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// nums 中的所有元素 互不相同

// 思路：回溯
// base case: 当start == nums.length，不会进入循环了，在循环前将track放到res即可

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  var res = [];
  // 记录轨迹
  var track = [];
  // 回溯核心框架
  var backtrack = function (nums, start) {
    // 前序位置，我们记录轨迹
    res.push(JSON.parse(JSON.stringify(track)));
    // 循环
    for(var i = start; i < nums.length; i++) {
      // 将nums[i]放到track
      track.push(nums[i]);
      // 接着执行回溯
      backtrack(nums, i + 1);
      // 回撤
      track.pop();
    }
  }
  // 从0开始
  backtrack(nums, 0);
  return res;
};
// 40. 组合总和 II
// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。
//
// 示例 1:
// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
//   输出:
// [
//   [1,1,6],
//   [1,2,5],
//   [1,7],
//   [2,6]
// ]
//
// 示例 2:
// 输入: candidates = [2,5,2,1,2], target = 5,
//   输出:
// [
//   [1,2,2],
//   [5]
// ]
//
// 提示:
// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30

// 思路：元素可重复且不可重复选择，组合跟子集一样，
// 元素可重复但是不可以重复选元素，为了避免一些重复的情况，先排序，我们选择当nums[i] == nums[i-1]进行剪枝
// 我们需要一个变量来记录track的和

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  var res = [];
  var track = [];
  var trackSum = 0;
  var backtrack = function (nums, start, target) {
    // base case
    if (trackSum === target) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }
    // 如果trackSum > target也没必要继续了
    if (trackSum > target) return;
    for(var i = start; i < nums.length; i++) {
      // 避免重复选择
      if (i > start && nums[i] === nums[i-1]) {
        continue;
      }
      // 做选择
      track.push(nums[i]);
      trackSum += nums[i];
      // 递归回溯子树
      backtrack(nums, i + 1, target);
      // 撤销选择
      track.pop();
      trackSum -= nums[i];
    }
  }
  // 排序数组，让相等的数值挨着
  candidates.sort();
  backtrack(candidates, 0, target);
  return res;
};
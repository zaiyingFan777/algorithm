// 90. 子集 II
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
//
// 示例 1：
// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
//
// 示例 2：
// 输入：nums = [0]
// 输出：[[],[0]]
//
// 提示：
//
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10

// 思路：元素可重复但是不可以重复选元素，为了避免一些重复的情况，先排序，我们选择当nums[i] == nums[i-1]进行剪枝

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  var res = [];
  var track = [];
  // 先排序，让相等的值挨着
  nums.sort();
  // 回溯
  var backtrack = function (nums, start) {
    // 将轨迹添加到结果
    res.push(JSON.parse(JSON.stringify(track)));
    // 遍历子树
    for(var i = start; i < nums.length; i++) {
      // 剪枝逻辑，值相同的相邻树枝，只遍历第一条
      // 这里必须加i > start否则，会漏一些数据
      if (i > start && nums[i] === nums[i-1]) continue;
      // 做选择
      track.push(nums[i]);
      // 回溯子树
      backtrack(nums, i+1);
      track.pop();
    }
  }
  backtrack(nums, 0);
  return res;
};
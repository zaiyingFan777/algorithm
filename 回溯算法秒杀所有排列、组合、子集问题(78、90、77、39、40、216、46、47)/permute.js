// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
//
// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//
// 示例 2：
// 输入：nums = [0,1]
// 输出：[[0,1],[1,0]]
//
// 示例 3：
// 输入：nums = [1]
// 输出：[[1]]
//
// 提示：
//
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// nums 中的所有整数 互不相同

// 思路：全排列，无重复无可复选的全排列，我们采用回溯的算法，我们用used数组标记已经在路径上的元素避免重复选择，然后收集所有叶子节点上的值，就是所有全排列的结果：

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  var res = [];
  // 记录轨迹
  var track = [];
  // 标记已经在路上的元素避免重复选择
  var used = new Array(nums.length).fill(false);
  // 回溯算法核心框架
  var backtrack = function (nums) {
    // base case
    if (track.length === nums.length) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }
    for(var i = 0; i < nums.length; i++) {
      // 避免重复选择
      if (used[i]) continue;
      // 做选择
      used[i] = true;
      track.push(nums[i]);
      // 子树
      backtrack(nums);
      // 撤销选择
      used[i] = false;
      track.pop();
    }
  }
  backtrack(nums);
  return res;
};
// 18. 四数之和
// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
// 0 <= a, b, c, d < n
// a、b、c 和 d 互不相同
// nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。
//
// 示例 1：
// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
//
// 示例 2：
// 输入：nums = [2,2,2,2,2], target = 8
// 输出：[[2,2,2,2]]
//
// 提示：
//
// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109

// 思路将4sum转为3sum 3sum转为2sum

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  var n = nums.length;
  var twoSumTarget = function (nums, start, target) {
    var res = [];
    var lo = start, hi = n - 1;
    while(lo < hi) {
      var sum = nums[lo] + nums[hi];
      var left = nums[lo], right = nums[hi];
      if (sum < target) {
        // 为了防止重复
        while(lo < hi && nums[lo] === left) lo++;
      } else if (sum > target) {
        while(lo < hi && nums[hi] === right) hi--;
      } else if (sum === target) {
        // 找到结果
        res.push([left, right]);
        while(lo < hi && nums[lo] === left) lo++;
        while(lo < hi && nums[hi] === right) hi--;
      }
    }
    return res;
  }
  var threeSumTarget = function (nums, start, target) {
    var res = [];
    for(var i = start; i < n; i++) {
      // 对每个i求[i+1, n-1]的两数之和
      var tuples = twoSumTarget(nums, i + 1, target - nums[i]);
      for(var tuple of tuples) {
        tuple.push(nums[i]);
        res.push(tuple);
      }
      // 排除重复的
      while(i < n - 1 && nums[i] === nums[i+1]) i++;
    }
    return res;
  }

  var fourSumTarget = function (nums, target) {
    var res = [];
    // 将数组排序
    nums.sort((a, b) => a - b);
    // 穷举每个元素，对元素后面的求threeSum
    for(var i = 0; i < n; i++) {
      var triples = threeSumTarget(nums, i + 1, target - nums[i]);
      for(var triple of triples) {
        triple.push(nums[i]);
        res.push(triple);
      }
      // 排除重复的
      while(i < n - 1 && nums[i] === nums[i+1]) i++;
    }
    return res;
  }
  return fourSumTarget(nums, target);
};
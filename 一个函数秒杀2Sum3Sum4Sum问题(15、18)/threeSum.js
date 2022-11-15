// 15. 三数之和
// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
//
// 示例 1：
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
//
// 示例 2：
// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
//
// 示例 3：
// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。
//
// 提示：
//
// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

// 思路分析：三数之和，可以简化为两数之和 target - nums[i] （为两数之和的和）
// 时间复杂度分析：1.对数组进行排序 O(NlogN)
// 2.对每个i+1开始的求二数之和的复杂度为0(n),所以对所有三数求和的复杂度为O(n^2)
// 所以复杂度为O(NlogN + N^2) = O(N^2)


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 求两数之和 当然也是不能出现重复结果的 比如[1,3][3,1]这样子的
  var twoSumTarget = function (nums, start, target) {
    var res = [];
    // 因为三树之和函数已经去重了这里不再去重
    var lo = start, hi = nums.length - 1;
    // 循环结束条件 lo == hi，因为我们要找两个数 所以不能用一个数
    while (lo < hi) {
      // 记录left、right为了去重
      var sum = nums[lo] + nums[hi];
      var left = nums[lo], right = nums[hi];
      if (sum < target) {
        // lo++
        // 多一层去重，下面的代码会让lo++。并且如果Lo后面没有重复的也会lo++，
        // 如果重复也会lo++，直到找到不重复的
        while(lo < hi && left === nums[lo]) lo++;
      } else if (sum > target) {
        while(lo < hi && right === nums[hi]) hi--;
      } else {
        // 找到了 将结果放到res里
        res.push([left, right]);
        // 去重
        while(lo < hi && left === nums[lo]) lo++;
        while(lo < hi && right === nums[hi]) hi--;
      }
    }
    return res;
  }
  // 求三数之和的函数
  var threeSumTarget = function (nums, target) {
    // 先对数组进行排序
    nums.sort((a,b) => a - b);
    var res = [];
    var n = nums.length;
    // 我们从i开始，然后求得i+1之后 target-nums[i]的两数之和
    for(var i = 0; i < n; i++) {
      // 得到从i+1之后target-nums[i]的两数之和的集合
      var tuples = twoSumTarget(nums, i + 1, target - nums[i]);
      // 得到循环两数之和的集合，遍历然后将nums[i]放进去，就得到了三数之和的数组
      for(var tuple of tuples) {
        // 得到三数之和的数组
        tuple.push(nums[i]);
        // 然后将三数之和的数组放到res里
        res.push(tuple);
      }
      // 避免重复 比如[1,1,1,2,3]求三数之和为6的 比如1 2 3，那后面的  1 1就不能再放进去了 ，所以为了避免重复我们接下来这样处理
      // 为什么药i < n - 1，因为当i为n-1就到达最后一个元素了，后面没东西了

      // 跳过第一个数字重复的情况，否则会出现重复的结果
      // 这里var a = [1,1,1,3,4]，当i=0的时候，i=0与i=1的值相等，i++ i变为了1
      // 然后 i = 1 与 i = 2相等，i++ i变为了2，然后 i = 2与i = 3不相等，i= 2,然后循环结束，I++变为了3
      while(i < n - 1 && nums[i] === nums[i+1]) {
        i++;
      }
    }
    return res;
  }
  return threeSumTarget(nums, 0);
};
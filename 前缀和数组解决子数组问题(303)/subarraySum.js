// 560. 和为 K 的子数组
// 数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。
//
// 示例 1：
// 输入：nums = [1,1,1], k = 2
// 输出：2
//
// 示例 2：
// 输入：nums = [1,2,3], k = 3
// 输出：2
//
// 提示：
//
// 1 <= nums.length <= 2 * 104
// -1000 <= nums[i] <= 1000
// -107 <= k <= 107

// 思路 前缀和数组
// 然后循环遍历 找到两个子数组差为k preSum[i] - preSum[j] === k

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  var n = nums.length;
  var preSum = new Array(n + 1).fill(0);
  // 构建前缀和数组
  for(var i = 1; i <= n; i++) {
    preSum[i] = preSum[i-1] + nums[i-1];
  }
  var res = 0;
  // 找preSum[i] - preSum[j] === k的两个子数组
  // nums[j, i-1]
  for(var i = 1; i <= n; i++) {
    for(var j = 0; j < i; j++) {
      if (preSum[i] - preSum[j] === k) res++;
    }
  }
  return res;
};

// 上述代码时间复杂度 O(n^2) 我们可以像两数之和那样用map存储
var subarraySum = function(nums, k) {
  var n = nums.length;
  var map = new Map();
  // base case
  // 为什么设置默认前缀和0的时候为1，
  // [2,-2] k = 0 i=0的时候sum0_i为2，sum_j = 2-0 = 2 因为没有sumj=2所以i++
  // 当i=1 sumi = 0, sum_j = 0 - 0 = 0.这时候我们的默认值0 1在这里起作用了 为1
  map.set(0, 1);
  // sum_i [0..i]的和
  var res = 0, sum0_i = 0;
  for(var i = 0; i < n; i++) {
    // 计算sum0_i
    sum0_i += nums[i];
    // 这是我们想找的前缀和 nums[0..j]
    var sum0_j = sum0_i - k;
    if (map.get(sum0_j)) {
      // 如果找到了前缀和
      res += map.get(sum0_j);
    }
    map.set(sum0_i, (map.get(sum0_i) || 0) + 1);
  }
  return res;
};

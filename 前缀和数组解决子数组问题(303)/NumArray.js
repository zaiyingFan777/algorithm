// 303. 区域和检索 - 数组不可变
// 简单
// 517
// 相关企业
// 给定一个整数数组  nums，处理以下类型的多个查询:
//   计算索引 left 和 right （包含 left 和 right）之间的 nums 元素的 和 ，其中 left <= right
// 实现 NumArray 类：
// NumArray(int[] nums) 使用数组 nums 初始化对象
// int sumRange(int i, int j) 返回数组 nums 中索引 left 和 right 之间的元素的 总和 ，包含 left 和 right 两点（也就是 nums[left] + nums[left + 1] + ... + nums[right] )
//
// 示例 1：
// 输入：
// ["NumArray", "sumRange", "sumRange", "sumRange"]
//   [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
// 输出：
// [null, 1, -1, -3]
// 解释：
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
// numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
//
// 提示：
// 1 <= nums.length <= 104
// -105 <= nums[i] <= 105
// 0 <= i <= j < nums.length
// 最多调用 104 次 sumRange 方法

// 思路前缀和数组  详见1.md [1,2,3,4] [0, 1, 3, 6, 10]

/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.nums = nums;
  this.preSum = new Array(this.nums.length + 1).fill(0);
  // 计算前缀和
  for(var i = 1; i < this.preSum.length; i++) {
    this.preSum[i] = this.preSum[i-1] + this.nums[i - 1];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
  return this.preSum[right + 1] - this.preSum[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// 剑指 Offer 03. 数组中重复的数字

// 找出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

// 示例 1：
// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3 

// 限制：
// 2 <= n <= 100000

// 一、用哈希表
// 时间复杂度: O(n)
// 空间复杂度: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  var memo = new Set();
  // 遍历nums将num分别存放到memo中
  for (var num of nums) {
    if (memo.has(num)) {
      return num;
    } else {
      // 不存在，则存放到set中
      memo.add(num);
    }
  }
  return -1;
};

// 二、交换数组元素方式，将i放到下标i的地方
// 思路见index.md
// 时间复杂度：O(n)
// 空间复杂度：O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  if (!nums || nums.length === 0) return -1;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] < 0 || nums[i] >= nums.length) return -1;
  }
  for (var i = 0; i < nums.length; i++) {
    while (i !== nums[i]) {
      if (nums[i] === nums[nums[i]]) {
        return nums[i];
      }
      // 交换元素
      var temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    }
  }
  return -1;
};
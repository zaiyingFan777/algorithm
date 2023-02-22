// 503. 下一个更大元素 II
// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。
// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

// 示例 1:
// 输入: nums = [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。

// 示例 2:
// 输入: nums = [1,2,3,4,3]
// 输出: [2,3,4,-1,4]

// 提示:
//   1 <= nums.length <= 104
//   -109 <= nums[i] <= 109

// 原数组[2,1,2,4,3]
// 思路：环形数组，我们可以构建双倍原数组的数组([2,1,2,4,3,2,1,2,4,3])去做，但是我们循环的时候让数组的长度变为原数组二倍，比如原数组长度为5，我们这时候让数组长度为10
// 然后从9开始循环到0，每次让i 取 i % n
// i%n  0-4 % 5 = (0,1,2,3,4) (5-9) % 5 = (0,1,2,3,4)

// 循环数组模板
// var arr = [1,2,3,4,5];
// var n = arr.length, index = 0;
// while(true) {
//   console.log(arr[index % n]);
//   index++;
// }

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  var n = nums.length;
  var res = new Array(n).fill(0);
  // 栈
  var s = [];
  // 数组长度加倍模拟环形数组 假设数组长度为5，2*5-1 = 9，这时候从9开始到0也是10个元素，不需要将原数组加长到2倍
  // 数组长度加倍模拟环形数组
  for(var i = 2 * n - 1; i >= 0; i--) {
    // i%n  0-4 % 5 = (0,1,2,3,4) (5-9) % 5 = (0,1,2,3,4)
    while(s.length !== 0 && s[s.length - 1] <= nums[i % n]) {
      s.pop();
    }
    // 如果单调栈长度为0，返回-1，如果长度不为0，则返回最靠近res[i]的后面的第一个元素
    res[i % n] = s.length === 0 ? -1 : s[s.length - 1];
    s.push(nums[i % n]);
  }
  return res;
};

// 2023/2/22
// 环形数组没想到怎么处理
// 如何处理循环数组
// var arr = [1,2,3,4,5];
// var n = arr.length, index = 0;
// while(true) {
//   // 在环形数组中转圈
//   console.log(arr[index % n]);
//   index++;
// }
// 处理环形数组，可以构造一个双倍长度的数组，然后套用算法模板，但是我们可以不用构造新数组，而是利用循数组的技巧来模拟数组长度长度翻倍的效果.
var nextGreaterElements = function(nums) {
  var n = nums.length;
  var res = new Array(n).fill(0);
  // 单调栈
  var stack = [];
  // 把循环的次数翻倍
  for(var i = 2 * n - 1; i >= 0; i--) {
    // 栈不为空且栈顶的元素小于等于nums[i]才会把栈顶删除
    while(stack.length && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop();
    }
    // 如果栈为空，返回-1，否则返回栈顶
    res[i % n] = stack.length ? stack[stack.length - 1] : -1;
    // 将nums[i % n]入栈
    stack.push(nums[i % n]); 
  }
  return res;
}
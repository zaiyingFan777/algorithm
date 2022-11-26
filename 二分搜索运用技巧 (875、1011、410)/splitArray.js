// 410. 分割数组的最大值
// 给定一个非负整数数组 nums 和一个整数 m ，你需要将这个数组分成 m 个非空的连续子数组。
// 设计一个算法使得这 m 个子数组各自和的最大值最小。

// 示例 1：
// 输入：nums = [7,2,5,10,8], m = 2
// 输出：18
// 解释：
// 一共有四种方法将 nums 分割为 2 个子数组。 
// 其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。

// 示例 2：
// 输入：nums = [1,2,3,4,5], m = 2
// 输出：9

// 示例 3：
// 输入：nums = [1,4,4], m = 3
// 输出：4
 
// 提示：

// 1 <= nums.length <= 1000
// 0 <= nums[i] <= 106
// 1 <= m <= min(50, nums.length)

// 思路：乍一看很难，但理性分析依然是 二分查找查找左边界
// 1.本题可以理解为一艘船有n堆货物，nums[i]为第n堆货的多少，我们m(target)天搬完，然后求货船的载重最小的情况
// x为载重量 f(x)为天数 运载量越强天数越小 ，单调递减  子数组的最大值就是 运载量

var f = function(nums, x) {
  var target = 0;
  for(var i = 0; i < nums.length; ) {
    var cap = x; // 子数组的最大值
    while(i < nums.length) {
      if (cap < nums[i]) {
        // 子数组的最大值装不下了Nums[i]放到下一轮循环
        break;
      } else {
        cap -= nums[i];
      }
      i++;
    }
    target++;
  }
  return target;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, k) {
  // 定义Left、right
  // left为nums中最大值，因为要保证将数组的每个元素都放到一个子数组里
  // right为 能将所有元素放到一个数组里
  var left = 0, right = 1; // [left, right) 右侧为闭区间 起码要加1
  for(var num of nums) {
    left = Math.max(left, num);
    right += num;
  }
  while(left < right) {
    var mid = ((right- left) >> 1) + left;
    if (f(nums, mid) === k) {
      right = mid;
    } else if (f(nums, mid) < k) {
      // 让fx边大点，单调递减 只能让right往左挪
      right = mid;
    } else if (f(nums, mid) > k) {
      // 让fx边小点，单调递减 只能让left往右挪
      left = mid + 1;
    }
  }
  return left;
};
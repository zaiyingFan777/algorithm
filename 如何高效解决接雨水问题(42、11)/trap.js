// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 示例 1：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

// 示例 2：
// 输入：height = [4,2,0,3,2,5]
// 输出：9

// 提示：
// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// 思路1：时间复杂度O(n)，空间复杂度O(n)
// 不从全局出发，从局部出发，每个数组元素能得盛的水应该为该元素左边包含自身的最大值与该元素右边包含自身的最大值 的最小值 减去 自身的高度


/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  if (height.length === 0) return 0;
  var n = height.length;
  // 定义l_max数组、r_max数组，
  // l_max，数组的每个元素为 从0到i包含i中左边最大的值
  var l_max = new Array(n).fill(0);
  // r_max，数组的每个元素为 从i到n-1包含i中右边最大的值
  var r_max = new Array(n).fill(0);
  // base case
  // 左边最大的数组的第一个元素为height[0]
  l_max[0] = height[0];
  // 同理，右边最后一个元素为height[n-1]
  r_max[n - 1] = height[n - 1];
  var res = 0;
  // 计算l_max height[i]与上一个比较即可
  for(var i = 1; i < n; i++) {
    l_max[i] = Math.max(height[i], l_max[i - 1]);
  }
  // 计算r_max height[i]与下一个比较即可
  for(var i = n-2; i >= 0; i--) {
    r_max[i] = Math.max(height[i], r_max[i + 1]);
  }

  // 第一个跟最后一个不能盛水
  for(var i = 1; i < n - 1; i++) {
    res += Math.min(l_max[i], r_max[i]) - height[i];
  }
  return res;
};

// 思路2：双指针 时间复杂度O(N) 空间复杂度O(N)
// 思路一说的是 当前i 左边left[0..i] 右边right[i..n-1]的最大值的最小值
// 其实我们可以定义左右指针，左指针左边最大值 与右指针右边最大值 相比，只要左指针左边最大值小于右指针右边最大值（可能不是最大的），
// 但只要小于就可以。
var trap = function(height) {
  if (height.length === 0) return 0;
  var n = height.length;
  // l_max代表左指针最大值，r_max代表右指针最大值
  var l_max = 0, r_max = 0;
  var left = 0, right = n - 1;
  var res = 0;
  while(left < right) {
    l_max = Math.max(l_max, height[left]);
    r_max = Math.max(r_max, height[right]);

    // 刚开始l_max = height[0], r_max = height[n - 1]，所以计算的差值为0
    if (l_max < r_max) {
      res += l_max - height[left];
      left++;
    } else {
      res += r_max - height[right];
      right--;
    }
  }
  return res;
};

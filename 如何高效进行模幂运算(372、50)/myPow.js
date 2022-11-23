// 50. Pow(x, n)
// 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
//
// 示例 1：
// 输入：x = 2.00000, n = 10
// 输出：1024.00000
//
// 示例 2：
// 输入：x = 2.10000, n = 3
// 输出：9.26100
//
// 示例 3：
// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25
//
// 提示：
// -100.0 < x < 100.0
// -231 <= n <= 231-1
// -104 <= xn <= 104

// 思路：如果用for循环时间复杂度为O(n)
// 分为奇数和偶数，n为奇数 a^n = a * a^n-1
// 偶数 a^n = (a^n/2)^2
// 这样时间复杂度达到了 logN

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

var quickMul = function(x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n % 2 === 1) {
    // 奇数
    return (x * myPow(x, n-1));
  } else {
    // 偶数
    var sub = myPow(x, n / 2);
    return sub * sub;
  }
}

var myPow = function(x, n) {
  if (n < 0) {
    // 对n为负数的取绝对值
    return 1 / quickMul(x, Math.abs(n));
  } else {
    return quickMul(x, n);
  }
};
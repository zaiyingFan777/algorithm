// 372. 超级次方
//
// 你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。
//
// 示例 1：
// 输入：a = 2, b = [3]
// 输出：8
//
// 示例 2：
// 输入：a = 2, b = [1,0]
// 输出：1024
//
// 示例 3：
// 输入：a = 1, b = [4,3,3,8,5,2]
// 输出：1
//
// 示例 4：
// 输入：a = 2147483647, b = [2,0,0]
// 输出：1198
//
// 提示：
// 1 <= a <= 231 - 1
// 1 <= b.length <= 2000
// 0 <= b[i] <= 9
// b 不含前导 0

// 思路：直接求平方会溢出
// 1.那么我们递归的形式将指数拆分 a^1024 = a^4 * (a^102)^10
// 2.拆分后将每一项与base取模运算 在高幂运算之后取模，我们可以先将底数取一次模，然后求幂的过程中，两两相乘后再次取模
// 3. 1分为part1 part2 这两项均已经与base取模 (a*b)%k = (a%k)(b%k)%k 因为part1为(a%k) part2为(b%k) 最后返回(part1*part2)%k ps part1、2已经是取过模运算的

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function(a, b) {
  var base = 1337;
  // 取高幂取模 a为底数 k为指数
  // 在高幂运算之后取模，我们可以先将底数取一次模，然后求幂的过程中，两两相乘后再次取模
  var myPow = function (a, k) {
    // 先对底数求模
    a %= base;
    var res = 1;
    // 两两相乘再求模
    // a^3 = a * a * a
    for(var i = 0; i < k; i++) {
      // 这里有乘法，是潜在的溢出点
      res *= a;
      // 对res求模
      // 对乘法结果求模
      res %= base;
    }
    return res;
  }
  // base case
  // 当b为空数组，那么返回1 任何数的0次方为1
  if (b.length === 0) return 1;
  // 取出数组的最后一位  a^1024 取出4
  var last = b.pop();
  // a^4 与 a^1240 分别取模
  var part1 = myPow(a, last);
  // a^1024 = a^4 * (a^102)^10
  // 递归
  var part2 = myPow(superPow(a, b), 10);

  // (a*b)%k = (a%k)(b%k)%k
  // part1相当于(a%k) part2相当于(b%k)
  return (part1 * part2) % base;
};
// 204. 计数质数
// 给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。
//
// 示例 1：
// 输入：n = 10
// 输出：4
// 解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
//
// 示例 2：
// 输入：n = 0
// 输出：0
//
// 示例 3：
// 输入：n = 1
// 输出：0
//
// 提示：
// 0 <= n <= 5 * 106

// 思路
// 1.算法复杂度为O(n^2) 超时

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  var count = 0;
  // 判断正数n是否为素数
  // 如何用计算机思维判断一个数是否为素数：比如4，我们可以取[2,4)这个区间的是两个数2 3（因为4本身会被本身整除，1也会被任何自然数整除）来分别去计算  4%2 = 0 4%3 = 1 (ps: %为模，取余的意思) 在[2,4)中只要有一个被4取余等于0的就说明 4不是素数，所以4%2=0所以  4不是素数
  // 还有就是为什么要判断[2,n)区间的，为何不判断大于n的 比如 判断4，我们用4 % 8 = 4 大于4的肯定不能被整除，所以就取[2, n)
  var isPrime = function (n) {
    for(var i = 2; i < n; i++) {
      // 有其他整除因子
      if (n % i === 0) return false;
    }
    return true;
  }
  // 从2开始循环到n-1 [2, n)
  for(var i = 2; i < n; i++) {
    // 对每个元素挨个判断
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
};

// 这种可以通过算法检测  O(N*sqrt(N))
// 对上面算法的优化
// 对称因子
var countPrimes = function(n) {
  var count = 0;
  // 判断正数n是否为素数
  // 如何用计算机思维判断一个数是否为素数：比如4，我们可以取[2,4)这个区间的是两个数2 3（因为4本身会被本身整除，1也会被任何自然数整除）来分别去计算  4%2 = 0 4%3 = 1 (ps: %为模，取余的意思) 在[2,4)中只要有一个被4取余等于0的就说明 4不是素数，所以4%2=0所以  4不是素数
  // 还有就是为什么要判断[2,n)区间的，为何不判断大于n的 比如 判断4，我们用4 % 8 = 4 大于4的肯定不能被整除，所以就取[2, n)
  var isPrime = function (n) {
    // 因子对称性：比如12 sqrt(12)为3.4.... 这时候 2 *6 = 12  3*4=12 sqrt(12)*sqrt(12)=12 4*3=12 6*2=12所以只需要计算sqrt(12)之前的的即可后面是有重复的情况
    for(var i = 2; i * i <= n; i++) {
      // 有其他整除因子
      if (n % i === 0) return false;
    }
    return true;
  }
  // 从2开始循环到n-1 [2, n)
  for(var i = 2; i < n; i++) {
    // 对每个元素挨个判断
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
};

// 思路2：
// 初始化一个长度为n的数组，对每个元素设置为true
// 从[2, n)开始，对每个i的倍数j 将下标J对应的元素置为false，最后再统计
// 首先从 2 开始，我们知道 2 是一个素数，那么 2 × 2 = 4, 3 × 2 = 6, 4 × 2 = 8… 都不可能是素数了。
// 然后我们发现 3 也是素数，那么 3 × 2 = 6, 3 × 3 = 9, 3 × 4 = 12… 也都不可能是素数了。
var countPrimes = function(n) {
  var isPrim = new Array(n).fill(true);
  for(var i = 2; i < n; i++) {
    // 将每个是素数的i的倍数标记为false
    // 不必处理不是素数的i
    if (isPrim[i]) {
      // 这样求倍数：2(2*1) 2+2(2*2) 2+2+2(2*3)
      for(var j = i*2; j < n; j += i) {
        isPrim[j] = false;
      }
    }
  }
  var count = 0;
  for(var k = 2; k < n; k++) {
    if (isPrim[k]) count++;
  }
  return count;
}

// 思路2的优化  时间复杂度O(N * loglogN)
// 第一层循环从2到n-1，其实也有对称因子的问题
// 第二层循环 我们对每个i将其倍数设为false。后面的i可能不需要从2倍开始找，前面的i的倍数可能会包含后面i，
// 比如i = 4时算法会标记 4 × 2 = 8，4 × 3 = 12 等等数字，但是 8 和 12 已经被i = 2和i = 3的 2 × 4 和 3 × 4 标记过了。
var countPrimes = function(n) {
  var isPrim = new Array(n).fill(true);
  for(var i = 2; i * i < n; i++) {
    // 将每个是素数的i的倍数标记为false
    // 不必处理不是素数的i
    if (isPrim[i]) {
      // 这样求倍数：2(2*1) 2+2(2*2) 2+2+2(2*3)
      for(var j = i*i; j < n; j += i) {
        isPrim[j] = false;
      }
    }
  }
  var count = 0;
  for(var k = 2; k < n; k++) {
    if (isPrim[k]) count++;
  }
  return count;
}
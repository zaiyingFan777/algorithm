// 剑指 Offer 05. 替换空格
// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

// 示例 1：
// 输入：s = "We are happy."
// 输出："We%20are%20happy."


// 限制：
// 0 <= s 的长度 <= 10000

// 官方解法
// 时间复杂度：O(N)
// 空间复杂度：O(N)

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  if (s.length === 0) return '';
  var originalLength = s.length;
  var numOfBlank = 0;
  // 找到空格数
  for(var i = 0; i < originalLength; i++) {
    if (s[i] === ' ') {
      numOfBlank++;
    }
  }
  // p1: 指向原字符串末尾
  var indexOfOriginal = originalLength;
  // p2: 指向新字符串末尾，因为空格变为%20，空格变为%，然后再加20两个字符，所以是下面的计算方式
  var indexOfNew = indexOfOriginal + numOfBlank * 2;
  // 创建字符串数组
  var res = new Array(indexOfNew).fill('');
  // 双指针
  // p1、p2开始从后往前移动
  while(indexOfOriginal >= 0) {
    if (s[indexOfOriginal] === ' ') {
      // 让indexOfNew--，并且赋值数组
      res[indexOfNew--] = '0';
      res[indexOfNew--] = '2';
      res[indexOfNew--] = '%';
    } else {
      res[indexOfNew--] = s[indexOfOriginal];
    }
    indexOfOriginal--;
  }
  return res.join('');
};

// 解题方案
// 思路
// 标签：字符串
// 最简单的方案自然是直接使用库函数啦！当然题目肯定是不希望我们这样做的！
// 增加一个新字符串，遍历原来的字符串，遍历过程中，如果非空格则将原来的字符直接拼接到新字符串中，如果遇到空格则将%20拼接到新字符串中
// 时间复杂度：O(n)，空间复杂度：O(n)

var replaceSpace = function (s) {
  var res = '';
  for(var i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      res += '%20';
    } else {
      res += s[i];
    }
  }
  return res;
}

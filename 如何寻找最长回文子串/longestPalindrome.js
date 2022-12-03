 // 5. 最长回文子串
 // 给你一个字符串 s， 找到 s 中最长的回文子串。

 // 示例 1：
 // 输入： s = "babad"
 // 输出： "bab"
 // 解释： "aba"
 // 同样是符合题意的答案。

 // 示例 2：
 // 输入： s = "cbbd"
 // 输出： "bb"

 // 提示：

 // 1 <= s.length <= 1000
 // s 仅由数字和英文字母组成


 // string.substr(start,length)
 // var a = 'abcde'; a.substr(0) => 'abcde'; a.substr(1) => 'bcde';
 // a.substr(1,2) => 'bc'

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  var res = "";
  // 判断是否为回文串
  var isPalindrome = function(s, l, r) {
    while(l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    // string.substr(start, length)
    return s.substr(l + 1, r - l - 1);
  }
  for(var i = 0; i < s.length; i++) {
    // 奇数
    var s1 = isPalindrome(s, i, i);
    // 偶数
    var s2 = isPalindrome(s, i, i + 1);
    res = s1.length > res.length ? s1 : res;
    res = s2.length > res.length ? s2 : res;
  }
  return res;
};
 
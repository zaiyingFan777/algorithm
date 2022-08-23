// 10. 正则表达式匹配
// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 
// 示例 1：
// 输入：s = "aa", p = "a"
// 输出：false
// 解释："a" 无法匹配 "aa" 整个字符串。

// 示例 2:
// 输入：s = "aa", p = "a*"
// 输出：true
// 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

// 示例 3：
// 输入：s = "ab", p = ".*"
// 输出：true
// 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

// 提示：
// 1 <= s.length <= 20
// 1 <= p.length <= 30
// s 只包含从 a-z 的小写字母。
// p 只包含从 a-z 的小写字母，以及字符 . 和 *。
// 保证每次出现字符 * 时，前面都匹配到有效的字符

// 状态：i和j两个指针的位置
// 选择：就是p[j]选择匹配的几个字符

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  // 备忘录
  var memo = new Map();
  // dp函数，若dp(s,i,p,j) = true，则表示s[i..]可以匹配p[j..]；若dp(s,i,p,j) = false，则表示s[i..]无法匹配p[j..]。
  var dp = function(s, i, p, j) {
    // base case 1: 当j走到了p的长度，这时候我们需要判断i与s.length，
    if (j === p.length) {
      // 如果过长或过短都不匹配，只有相等才说明匹配
      return i === s.length;
    }
    // base case 2: 当i走到了s的长度，说明j有剩余，模式串a*b*才可以匹配空串
    if (i === s.length) {
      // s: a, p: ab*c* 这时候，5 - 1 = 4满足剩下的模式串长度为偶数
      if ((p.length - j) % 2 === 1) {
        return false;
      }
      // s: a, p: ab*c* j为1，j+1<p.length, 且j+1为*，然后让j+=2变为3(c)，j+1为4，4<p.length，然后
      // p[4] 为 * , j += 2，j为5跳出循环
      for(; j + 1 < p.length; j += 2) {
        if (p[j+1] !== '*') {
          return false;
        }
      }
      return true;
    }

    // 如果备忘录里有i,j则返回
    if (memo.has(`${i},${j}`)) {
      return memo.get(`${i},${j}`);
    }

    var res = false;
    
    if (s[i] === p[j] || p[j] === '.') { // .通配符可以匹配任何字符
      // 如果匹配
      if (j + 1 < p.length && p[j+1] === "*") {
        // 1、如果匹配，即s[i] == p[j]，那么有两种情况：
        // 1.1 p[j]有可能会匹配多个字符，比如s = "aaa", p = "a*"，那么p[0]会通过*匹配 3 个字符"a"。
        // 1.2 p[i]也有可能匹配 0 个字符，比如s = "aa", p = "a*aa"，由于后面的字符可以匹配s，所以p[0]只能匹配 0 次。
        res = dp(s, i+1, p, j) || dp(s, i, p, j+2);
      } else {
        // 如果匹配，且下一个字符不为*，则直接都+1进行下一次匹配。abc与abc
        res = dp(s, i+1, p, j+1);
      }
    } else {
      // 如果不匹配
      if (j + 1 < p.length && p[j+1] === "*") {
        // 不匹配，但是j+1为*,可以继续匹配：abc与ad*bc
        res = dp(s, i, p, j+2); // 这里j要变为j+2，如上例
      } else {
        // 不匹配，abc与abb直接返回false
        res =  false;
      }
    }
    // 将当前结果记入备忘录
    memo.set(`${i},${j}`, res);
    return res;
  }
  // 指针 i，j 从索引 0 开始移动
  // 根据这个定义，我们想要的答案就是i = 0,j = 0时dp函数的结果
  return dp(s, 0, p, 0);
};
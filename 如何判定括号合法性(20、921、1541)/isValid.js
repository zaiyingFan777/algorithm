// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// 提示：
// 1 <= s.length <= 104
// s 仅由括号 '()[]{}' 组成

// 思路采用栈的形式
// 遇到左括号则将左括号放到栈顶，遇到右括号}])翻译为{[(，在栈顶是否有跟其对应的，如果不对应直接false，如果对应则弹出，最后判断stack数组是否为空

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var stack = [];
  for (var char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      // 右括号
      if (stack.length && leftOf(char) === stack[stack.length - 1]) {
        // 栈顶弹出
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

var leftOf = function (char) {
  if (char === '}') return '{';
  else if (char === ']') return '[';
  return '(';
}
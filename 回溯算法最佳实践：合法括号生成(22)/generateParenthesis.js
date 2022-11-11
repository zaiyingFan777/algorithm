// 22. 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
//
// 示例 1：
// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：
//
// 输入：n = 1
// 输出：["()"]
//
//
// 提示：
//
// 1 <= n <= 8

// 思路
// 典型的回溯问题：
// 1.n代表括号的对数，所以生成的括号数('('')')为2n个
// 2.对于一个「合法」的括号字符串组合p，必然对于任何0 <= i < len(p)都有：子串p[0..i]中左括号的数量都大于或等于右括号的数量【((())) 无论什么情况都是左括号大于等于右括号】。
// 3.我们可以定义left、right都为n，来进行控制左右括号的数量

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  var res = [];
  var track = [];
  // 比如((( 这时候left为0，我们接着选择( 变味了((((，然后再进入递归left变为-1，return出来当left为0的时候，撤销选择这时候track变味了(((，接着选择)
  var backtrack = function (left, right) {
    // base case 如果left > right肯定不对 因为left用的比较多(对于一个「合法」的括号字符串组合p，必然对于任何0 <= i < len(p)都有：子串p[0..i]中左括号的数量都大于或等于右括号的数量)
    if (right < left) return;
    // base case 如果left、right有小于0的肯定不对
    if (left < 0 || right < 0) return;
    // base case 如果left、right都为0那就是结果了
    if (left === 0 && right ===0) {
      var arr = JSON.parse(JSON.stringify(track));
      var str = arr.join('');
      res.push(str);
      return;
    }

    // 递归先从(开始
    // 做选择
    track.push('(');
    // 回溯子树
    backtrack(left - 1, right);
    // 撤销选择
    track.pop();

    // 紧接着递归从)开始
    // 做选择
    track.push(')');
    // 回溯子树
    backtrack(left, right - 1);
    // 撤销选择
    track.pop();
  }
  backtrack(n, n);
  return res;
};
// 216. 组合总和 III
// 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
// 只使用数字1到9
// 每个数字 最多使用一次
// 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。
//
// 示例 1:
// 输入: k = 3, n = 7
// 输出: [[1,2,4]]
// 解释:
//   1 + 2 + 4 = 7
// 没有其他符合的组合了。
//
// 示例 2:
// 输入: k = 3, n = 9
// 输出: [[1,2,6], [1,3,5], [2,3,4]]
// 解释:
//   1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// 没有其他符合的组合了。
//
// 示例 3:
// 输入: k = 4, n = 1
// 输出: []
// 解释: 不存在有效的组合。
// 在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是1+2+3+4 = 10，因为10 > 1，没有有效的组合。
//
// 提示:
//
//   2 <= k <= 9
// 1 <= n <= 60

// 思路：不重复、不可重复使用  子集包含长度为0到N  组合就是长度为n的定向子集问题
// 就是长度为k的组合问题  base case需要注意track的长度是否大于k或者trackSum是否大于n

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  var res = [];
  // 轨迹
  var track = [];
  var trackSum = 0;
  // 回溯核心代码
  var backtrack = function (start) {
    // base case
    if (track.length === k && trackSum === n) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }

    if (track.length > k || trackSum > n) return;

    for(var i = start; i <= 9; i++) {
      // 做选择
      trackSum += i;
      track.push(i);
      // 递归回溯子树
      backtrack(i + 1);
      // 撤销选择
      trackSum -= i;
      track.pop();
    }
  }
  backtrack(1);
  return res;
};
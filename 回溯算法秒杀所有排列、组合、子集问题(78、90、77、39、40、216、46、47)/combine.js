// 77. 组合
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案。
//
// 示例 1：
// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
//
// 示例 2：
// 输入：n = 1, k = 1
// 输出：[[1]]
//
// 提示：
// 1 <= n <= 20
// 1 <= k <= n

// 思路：元素无重不可复选
// 组合跟子集元素无重不可复选的情况一样，所以还是沿用之前的套路，base case当track.size与k相等的时候我们就停止接下来的循环，

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  var res = [];
  // 记录轨迹数组
  var track = [];
  // 回溯算法核心代码
  var backtrack = function (start, n, k) {
    // base case
    if (k === track.length) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }
    for(var i = start; i <= n; i++) {
      // 选择
      track.push(i);
      // 去子树做选择
      backtrack(i + 1, n, k);
      // 撤销选择
      track.pop();
    }
  }
  backtrack(1, n, k);
  return res;
};

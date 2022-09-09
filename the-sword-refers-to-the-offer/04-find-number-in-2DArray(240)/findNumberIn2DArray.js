// 剑指 Offer 04. 二维数组中的查找
// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

// 示例:

// 现有矩阵 matrix 如下：
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

// 限制：
// 0 <= n <= 1000
// 0 <= m <= 1000

// 选取右上角
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  if (matrix.length === 0) return false;
  var row = 0;
  var column = matrix[0].length - 1;
  while(row <= matrix.length - 1 && column >= 0) {
    // 选取右上角
    var chosen = matrix[row][column];
    if (chosen === target) {
      // 找到了
      return true;
    } else if (chosen > target) {
      // 如果选的大于target，需要移除该列，因为右上角是该列最小的
      column--;
    } else {
      // 如果选的小于target，需要移除该行，因为右上角本行最大
      row++;
    }
  }
  return false;
};

// 选取左下角: 左下角是本列最大的，本行最小的。
// chosen < target: 本列删除往右移动
// chosen > target: 删除本行，往上移动
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var findNumberIn2DArray = function (matrix, target) {
  if (matrix.length === 0) return false;
  var row = matrix.length - 1;
  var column = 0;
  while(row >= 0 && column <= matrix[0].length - 1) {
    // 选取左下角
    var chosen = matrix[row][column];
    if (chosen === target) {
      // 找到了
      return true;
    } else if (chosen > target) {
      // 如果选的大于target，需要移除该行，因为左下角是本行最小的
      row--;
    } else {
      // 如果选的小于target，需要移除该列，因为左下角本列最大
      column++;
    }
  }
  return false;
};
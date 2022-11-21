// 304. 二维区域和检索 - 矩阵不可变
// 给定一个二维矩阵 matrix，以下类型的多个请求：
// 计算其子矩形范围内元素的总和，该子矩阵的 左上角 为 (row1, col1) ，右下角 为 (row2, col2) 。
// 实现 NumMatrix 类：
// NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化
// int sumRegion(int row1, int col1, int row2, int col2) 返回 左上角 (row1, col1) 、右下角 (row2, col2) 所描述的子矩阵的元素 总和 。
//
// 示例 1：
// 输入:
//   ["NumMatrix","sumRegion","sumRegion","sumRegion"]
//     [[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
// 输出:
//   [null, 8, 11, 12]
//
// 解释:
//   NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
// numMatrix.sumRegion(2, 1, 4, 3); // return 8 (红色矩形框的元素总和)
// numMatrix.sumRegion(1, 1, 2, 2); // return 11 (绿色矩形框的元素总和)
// numMatrix.sumRegion(1, 2, 2, 4); // return 12 (蓝色矩形框的元素总和)
//
// 提示：
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 200
// -105 <= matrix[i][j] <= 105
// 0 <= row1 <= row2 < m
// 0 <= col1 <= col2 < n
// 最多调用 104 次 sumRegion 方法

// 思路：构造前缀和二维数组
// 数组
// [
//   [1, 2],
//   [3, 4],
// ]
// 构建出来的前缀和二维数组
// [
//   [0, 0, 0],
//   [0, 1, 3],
//   [0, 4, 10],
// ]
// 构建方式 matrix的行m列n 生成一个 new int[m+1][n+1] 这样 可以利用0行0列的作为base case
// 计算每个矩阵[0,0,i,j]的值为：上面的preSum[i-1][j] + 左面的preSum[i][j-1] + 当前值matrix[i-1][j-1] - 左上角的preSum[i-1][j-1]

// 求两个顶点的区域和
// 以这个为例，比如求(4,4,4,4)
// 那就是4顶点的和 - 4上面的2 - 4左边的3 + 4左上角的1  参看1.md
// [
//   [1, 2],
//   [3, 4],
// ]
// [
//   [0, 0, 0],
//   [0, 1, 3],
//   [0, 4, 10],
// ]

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  // 初始化行列
  var m = matrix.length, n = matrix[0].length;
  if (m === 0 || n === 0) return;
  // 初始化前缀和二维数组
  this.preSum = new Array(m+1).fill(null).map(item => new Array(n+1).fill(0));
  // 开始构建
  for(var i = 1; i <= m; i++) {
    for(var j = 1; j <= n; j++) {
      this.preSum[i][j] = this.preSum[i-1][j] + this.preSum[i][j-1] + matrix[i-1][j-1] - this.preSum[i-1][j-1];
    }
  }
};

/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.preSum[row2+1][col2+1] - this.preSum[row1][col2+1] - this.preSum[row2+1][col1] + this.preSum[row1][col1];
};
// NumMatrix.prototype.sumRegion = function(x1, y1, x2, y2) {
//   return this.preSum[x2+1][y2+1] - this.preSum[x1][y2+1] - this.preSum[x2+1][y1] + this.preSum[x1][y1];
// };


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
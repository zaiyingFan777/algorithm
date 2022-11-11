// 773. 滑动谜题
//
// 在一个 2 x 3 的板上（board）有 5 块砖瓦，用数字 1~5 来表示, 以及一块空缺用 0 来表示。一次 移动 定义为选择 0 与一个相邻的数字（上下左右）进行交换.
// 最终当板 board 的结果是 [[1,2,3],[4,5,0]] 谜板被解开。
// 给出一个谜板的初始状态 board ，返回最少可以通过多少次移动解开谜板，如果不能解开谜板，则返回 -1 。
//
// 示例 1：
// 输入：board = [[1,2,3],[4,0,5]]
// 输出：1
// 解释：交换 0 和 5 ，1 步完成
//
// 示例 2:
// 输入：board = [[1,2,3],[5,4,0]]
// 输出：-1
// 解释：没有办法完成谜板
//
// 示例 3:
// 输入：board = [[4,1,2],[5,0,3]]
// 输出：5
// 解释：
// 最少完成谜板的最少移动次数是 5 ，
// 一种移动路径:
//   尚未移动: [[4,1,2],[5,0,3]]
// 移动 1 次: [[4,1,2],[0,5,3]]
// 移动 2 次: [[0,1,2],[4,5,3]]
// 移动 3 次: [[1,0,2],[4,5,3]]
// 移动 4 次: [[1,2,0],[4,5,3]]
// 移动 5 次: [[1,2,3],[4,5,0]]
//
// 提示：
// board.length == 2
// board[i].length == 3
// 0 <= board[i][j] <= 5
// board[i][j] 中每个值都 不同

// 思路：最少次数我们可以通过BFS来寻找  BFS(队列来实现)空间复杂度高，但是速度快，DFS(栈)类似于回溯 时间复杂度高，需要找到所有结果再去对比
// 1.这种问题可以将，board看作(转换)一个bfs问题，因为我们每次可以将0周边的左边的位置放到队列，然后再遍历队列中的每个元素去找接下来的，然后最早发现就是结果
// 2.难点2，二位数数组转换为1维度字符串，我们将每个二维数组的元素在字符串中的相邻下标存起来， 比如1 在一维字符串’123450‘ 他相邻的为 13
// [
//   [1,2,3],
//   [4,5,0],
// ]
// 这样我们就方便操作0周边的字符串的换位值了

// ps: 字符串变为数组 Array.from('123') => ['1', '2', '3'] 等同于 '123'.split('')
// 交换数组元素：var a = [1,2,3] [a[0], a[1]] = [a[1], a[0]] => a: [2, 1, 3]

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function(board) {
  var start = board.flat(1).join(''); // join('')转为无逗号的
  var target = '123450';
  // 将二维数组转为一维字符串
  // 记录一维字符串的相邻索引 每个字符串的下标位置，在二维数组中对应的邻居在一维度字符串的位置
  var neighbor = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];
  if (target === start) {
    return 0;
  }
  // bfs开始
  var q = [start];
  var visited = new Set();
  var step = 0;
  // 当队列不为空的时候一直循环
  while(q.length) {
    var sz = q.length;
    for(var i = 0; i < sz; i++) {
      // 取出队列的第一个元素
      var cur = q.shift();
      // 找到返回结果
      if (cur === target) return step;
      // 找到0在当前字符串的下标
      // var idx = 0;
      // for(; cur[idx] !== '0'; idx++);
      var idx = cur.indexOf('0');
      // 找到'0'的邻居们,并遍历邻居与idx在字符串的位置交换生成新的字串 放到q和visited里
      for(var adj of neighbor[idx]) {
        var newBoard = cur.split('');
        // 交换字符串位置
        // 交换位置 idx与adj
        // var temp = newBoard[idx];
        // newBoard[idx] = newBoard[adj];
        // newBoard[adj] = temp;

        // 交换数组元素
        [newBoard[adj], newBoard[idx]] = [newBoard[idx], newBoard[adj]];

        // 再将temp变为字符串
        newBoard = newBoard.join('');


        // 判断newBoard是否在visited里，不在则添加
        if (!visited.has(newBoard)) {
          visited.add(newBoard);
          q.push(newBoard);
        }
      }
    }
    // 让步长加1
    step++;
  }
  // 没找到结果
  return -1;
};
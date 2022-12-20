// 435. 无重叠区间
// 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。

// 示例 1:
// 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。

// 示例 2:
// 输入: intervals = [ [1,2], [1,2], [1,2] ]
// 输出: 2
// 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

// 示例 3:
// 输入: intervals = [ [1,2], [2,3] ]
// 输出: 0
// 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

// 提示:
// 1 <= intervals.length <= 105
// intervals[i].length == 2
// -5 * 104 <= starti < endi <= 5 * 104

// 思路：贪心算法
// 我们求得有几个区间不重复，用总的减去不重复的剩下的就是：intervals.length - 不能重复的，即需要消除的

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // 求最多有几个不重复的
  var intervalSchedule = function (intervals) {
    // 先对数组按照end进行升序排序(start, end)
    intervals = intervals.sort((a, b) => a[1] - b[1]);
    var count = 1; // 至少有一个不重复的
    // 排序后，第一个区间就是x
    var x_end = intervals[0][1]; 
    // 如何出重，先找到第一个的end值，只要start大于end的值的就是不重复的 然后重新设置x_end值
    for(var interval of intervals) {
      var start = interval[0];
      // 等于也不重复
      if (start >= x_end) {
        count++;
        x_end = interval[1];
      }
    }
    return count;
  }
  return intervals.length - intervalSchedule(intervals);
};
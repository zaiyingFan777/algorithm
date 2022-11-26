// 875. 爱吃香蕉的珂珂

// 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
// 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  
// 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
// 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

// 示例 1：
// 输入：piles = [3,6,7,11], h = 8
// 输出：4

// 示例 2：
// 输入：piles = [30,11,23,4,20], h = 5
// 输出：30

// 示例 3：
// 输入：piles = [30,11,23,4,20], h = 6
// 输出：23
 
// 提示：
// 1 <= piles.length <= 104
// piles.length <= h <= 109
// 1 <= piles[i] <= 109

// 思路：二分搜索区间的最左侧，
// 1.确定x f(x) x为每小时吃几个香蕉、f(x)为每小时吃x的情况下用的小时数  f(x)为单调递减的 吃的越多 耗时越短
// 2.确定left为1，因为每小时最少需要吃1个，right为 109 + 1因为我们我们右边是开区间 target为h

// piles为香蕉堆，x为吃的个数，
// 返回所用的h
// 计算每一堆所用的时间 比如 i堆香蕉为3个  我们每小时吃4个  Math.floor(3/4) = 0 h+= 0 然后再取余数 3%4 = 3 > 0 然后h++ 这样就是1个
// 比如 7  h += Math.floor(7 / 4) 为1 然后，7 % 4 > 0 h++ 为2
// 比如 这一堆为4个 每小时吃2  4/2 = 2小时吃完，4 % 2 = 0 没有余数 不需要在++了
var f = function(piles, x) {
  var h = 0;
  // 遍历piles，根据x来得到时间
  for(var i = 0; i < piles.length; i++) {
    // 7 / 4 得到1.75 我们取Math.floor得到1，肯定不对，需要7 % 4 > 0我们再加1就是2小时，这样就满足题目条件
    h += Math.floor(piles[i] / x);
    if ((piles[i] % x) > 0) {
      h++;
    }
  }
  return h;
}

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
  // 右边界取不到 +1
  var left = 1, right = 1000000000 + 1;
  while(left < right) {
    var mid = (left + right) >> 1;
    if (f(piles, mid) === h) {
      // 缩小右边界
      right = mid;
    } else if (f(piles, mid) < h) {
      // 需要让f(x)大一点 单调递减 需要让right变为Mid
      right = mid;
    } else if (f(piles, mid) > h) {
      // 让left 变大一点
      left = mid + 1;
    }
  }
  return left;
};
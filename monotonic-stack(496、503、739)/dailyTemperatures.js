// 739. 每日温度
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
//
// 示例 1:
// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
//
// 示例 2:
// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
//
// 示例 3:
// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
//
// 提示：
// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

// 思路：将nums的下标存到单调栈中，然后每次比较nums[s.peek()] 与 nums[i]
// 数组中元素与元素的距离：下标减去下标

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  var n = temperatures.length;
  var res = new Array(n).fill(0);
  // 存放下标的单调栈
  var s = [];
  for(var i = n - 1; i >= 0; i--) {
    while(s.length !== 0 && temperatures[s[s.length - 1]] <= temperatures[i]) {
      s.pop();
    }
    // 得到索引间距
    // 下标减下标
    res[i] = s.length === 0 ? 0 : (s[s.length - 1] - i);
    // 将索引入栈，而不是元素
    s.push(i);
  }
  return res;
};
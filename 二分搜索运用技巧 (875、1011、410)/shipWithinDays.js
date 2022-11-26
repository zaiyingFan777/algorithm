// 1011. 在 D 天内送达包裹的能力
// 传送带上的包裹必须在 days 天内从一个港口运送到另一个港口。
// 传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量（weights）的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。
// 返回能在 days 天内将传送带上的所有包裹送达的船的最低运载能力。

// 示例 1：
// 输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// 输出：15
// 解释：
// 船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示：
// 第 1 天：1, 2, 3, 4, 5
// 第 2 天：6, 7
// 第 3 天：8
// 第 4 天：9
// 第 5 天：10
// 请注意，货物必须按照给定的顺序装运，因此使用载重能力为 14 的船舶并将包装分成 (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) 是不允许的。 

// 示例 2：
// 输入：weights = [3,2,2,4,1,4], days = 3
// 输出：6
// 解释：
// 船舶最低载重 6 就能够在 3 天内送达所有包裹，如下所示：
// 第 1 天：3, 2
// 第 2 天：2, 4
// 第 3 天：1, 4

// 示例 3：
// 输入：weights = [1,2,3,1,1], days = 4
// 输出：3
// 解释：
// 第 1 天：1
// 第 2 天：2
// 第 3 天：3
// 第 4 天：1, 1
 
// 提示：
// 1 <= days <= weights.length <= 5 * 104
// 1 <= weights[i] <= 500

// 思路：二分搜索区间左侧
// x为运载能力，f(x)的结果为天数 target就是days 
// x越强 f(x)越小 是一个单调递减的函数
// left: 每次起码能装下所有的货物避免装不下的情况 keft为weights数组的最大值
// right: 最大值可以一天将所有的货物装完，right为weights的和

function f(weights, x) {
  var days = 0;
  for (var i = 0; i < weights.length; ) {
    var cap = x; // 容量
    while(i < weights.length) {
      if (cap < weights[i]) {
        // 容量装不下物品 则退出
        break;
      } else {
        cap -= weights[i];
      }
      i++;
    }
    // 每一次循环结束 days++
    days++;
  }
  return days;
}

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
  // [l, r) 右侧开区间加1
  var left = 0, right = 1;
  for(var weight of weights) {
    left = Math.max(left, weight);
    right += weight;
  }
  while(left < right) {
    var mid = (left + right) >> 1;
    if (f(weights, mid) === days) {
      right = mid;
    } else if (f(weights, mid) < days) {
      // 让fx边大点，单调递减 只能让right往左挪
      right = mid;
    } else if (f(weights, mid) > days) {
      // 让fx边小点，单调递减 只能让left往右挪
      left = mid + 1;
    }
  }
  return left;
};
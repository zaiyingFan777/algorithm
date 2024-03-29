// 239. 滑动窗口最大值
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 。
//
// 示例 1：
// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
//   [1  3  -1] -3  5  3  6  7       3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7
//
// 示例 2：
// 输入：nums = [1], k = 1
// 输出：[1]
//
// 提示：
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// 1 <= k <= nums.length

// 思路：不断滑动窗口将每次窗口中的最大值统计出来，因为窗口要滑动，所以我们还要从窗口中剔除左边的值，所以有顺序要求，我们首先考虑到了队列，先进先出。
// 当然排除最小/大优先队列，因为这个每次添加元素都会排除最小/大的元素在最前面，但是我们移动窗口取出这个元素就会比较麻烦会重新排列，
// 这里用单调队列，最大的排前面，从大到小依次排列，然后每次Push操作的时候  从队尾开始比较，如果队尾的小于他就移除队尾 再跟下个队尾比较，直到为空或者>=新元素的，最后再把新元素放进去，这样
// 我们每次就取对头就是最大的元素。

// 移除元素，如果要移除的元素跟我们对头一致，我们需要移除对头的元素，否则则不用做什么操作

// 这里我们用双链表去实现单调队列，因为这样push pop的操作都为O(1),
// 这里我们采用数组去模拟双链表(数组查询O(1)，但是增加或删除为O(n))

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// var maxSlidingWindow = function(nums, k) {
//   // 用数组模拟单调队列
//   var window = [];
//   // 结果数组
//   var res = [];
//   for(var i = 0; i < nums.length; i++) {
//     if (i < k - 1) {
//       // window的前k-1个元素
//       while(window.length !== 0 && window[window.length - 1] < nums[i]) {
//         // 弹出队列的最后一个
//         window.pop();
//       }
//       window.push(nums[i]);
//     } else {
//       // window的第k个元素
//       // 先加入到单调队列中
//       while(window.length !== 0 && window[window.length - 1] < nums[i]) {
//         // 弹出队列的最后一个
//         window.pop();
//       }
//       window.push(nums[i]);
//       // 取出最大的也就是window的对头
//       res.push(window[0]);
//       // 在window中移除Nums[i]，为了i++后的元素能够加入到window中，腾出位置
//       // 如果nums[i-k+1](窗口的第一个元素)与window[0]相等，则去掉window的第一个
//       if (nums[i-k+1] === window[0]) {
//         window.shift();
//       }
//     }
//   }
//   return res;
// };

var maxSlidingWindow = function(nums, k) {
  // 用数组模拟单调队列
  var window = [];
  // 结果数组
  var res = [];
  for(var i = 0; i < nums.length; i++) {
    // window的前k-1个元素
    while(window.length !== 0 && window[window.length - 1] < nums[i]) {
      // 弹出队列的最后一个
      window.pop();
    }
    window.push(nums[i]);
    if (i >= k - 1) {
      // 取出最大的也就是window的对头
      res.push(window[0]);
      // 在window中移除Nums[i]，为了i++后的元素能够加入到window中，腾出位置
      // 如果nums[i-k+1](窗口的第一个元素)与window[0]相等，则去掉window的第一个
      if (nums[i-k+1] === window[0]) {
        window.shift();
      }
    }
  }
  return res;
};
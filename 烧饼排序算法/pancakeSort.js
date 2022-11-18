// 969. 煎饼排序
// 给你一个整数数组 arr ，请使用 煎饼翻转 完成对数组的排序。
// 一次煎饼翻转的执行过程如下：
// 选择一个整数 k ，1 <= k <= arr.length
// 反转子数组 arr[0...k-1]（下标从 0 开始）
// 例如，arr = [3,2,1,4] ，选择 k = 3 进行一次煎饼翻转，反转子数组 [3,2,1] ，得到 arr = [1,2,3,4] 。
// 以数组形式返回能使 arr 有序的煎饼翻转操作所对应的 k 值序列。任何将数组排序且翻转次数在 10 * arr.length 范围内的有效答案都将被判断为正确。
//
// 示例 1：
// 输入：[3,2,4,1]
// 输出：[4,2,4,3]
// 解释：
// 我们执行 4 次煎饼翻转，k 值分别为 4，2，4，和 3。
// 初始状态 arr = [3, 2, 4, 1]
// 第一次翻转后（k = 4）：arr = [1, 4, 2, 3]
// 第二次翻转后（k = 2）：arr = [4, 1, 2, 3]
// 第三次翻转后（k = 4）：arr = [3, 2, 1, 4]
// 第四次翻转后（k = 3）：arr = [1, 2, 3, 4]，此时已完成排序。
//
// 示例 2：
// 输入：[1,2,3]
// 输出：[]
// 解释：
// 输入已经排序，因此不需要翻转任何内容。
// 请注意，其他可能的答案，如 [3，3] ，也将被判断为正确。
//
// 提示：
// 1 <= arr.length <= 100
// 1 <= arr[i] <= arr.length
// arr 中的所有整数互不相同（即，arr 是从 1 到 arr.length 整数的一个排列）

// 思路，递归的方式，我们现在数组找到n个元素中的最大的，然后将这个最大的翻到最上面，然后在将这个最大的翻到最下面，依次递归n-1 n-2
// base case 为1的时候说明还剩下一个元素。

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function(arr) {
  var res = [];
  // 反转
  var reverse = function (arr, i, j) {
    // 偶数结束条件i > j 奇数结束条件 i == j
    while(i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  // sort排序反转
  var sort = function (arr, n) {
    // base case
    // 当n为1的时候只剩下1个
    if (n === 1) return;
    // 定义最大的元素，最大的元素下标
    var maxVal = 0;
    var maxValIndex = 0;
    for(var i = 0; i < n; i++) {
      if (arr[i] > maxVal) {
        maxVal = arr[i];
        maxValIndex = i;
      }
    }
    // 反转0到maxValIndex  将最大的反转到上面
    reverse(arr, 0, maxValIndex);
    // 比如[1,2,3,4]我们翻转前两个 这时候maxValIndex为1，所以加到res的时候需要在maxValIndex基础上加1
    res.push(maxValIndex + 1);
    // 将最大的反转到最下面
    reverse(arr, 0, n - 1);
    // 记录这次反转
    res.push(n);

    // 递归 剩下的n-1
    sort(arr, n - 1);
  }
  sort(arr, arr.length);
  return res;
};
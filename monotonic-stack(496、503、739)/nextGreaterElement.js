// 496. 下一个更大元素 I
// nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
// 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
// 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。

// 示例 1：
// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
//   输出：[-1,3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
// - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。

// 示例 2：
// 输入：nums1 = [2,4], nums2 = [1,2,3,4].
//   输出：[3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
// - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。

// 提示：
// 1 <= nums1.length <= nums2.length <= 1000
// 0 <= nums1[i], nums2[i] <= 104
// nums1和nums2中所有整数 互不相同
// nums1 中的所有整数同样出现在 nums2 中

// 常规做法：对每个元素往后找第一个比自己大的，时间复杂度O(N^2)
// 思路: 利用栈的结构：后入先出，所以我们将nums倒序遍历，将nums[i]从后往前遍历分别加入到栈中，利用栈后入先出的规则，nums[i-1]会比较栈顶到栈底的数据,也就是从nums[i]到nums[i+1]等
// 因为nums1是nums2的子集，所以我们将nums2按照上述思路打造成一个数组，然后每个元素对应的新数组的元素 按照key val存到map里

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  var nextGreaterElement = function (nums) {
    var n = nums.length;
    // 结果数组
    var res = new Array(n).fill(0);
    // 栈
    var s = [];
    // 倒着往栈里放(倒着往栈里放是为了数组元素从头往后正着出,也就是比如第一个2需要跟后面的1、2、4进行比较，这时候因为倒着入栈，所以出站的时候就是正着出，1，2，4)
    for(var i = n - 1; i >= 0; i--) {
      // 检查stack是否有元素，检查s的栈顶元素是否小于等于nums[i]，如果都满足则进入while循环去弹出栈顶元素
      while(s.length !== 0 && s[s.length - 1] <= nums[i]) {
        // 删除栈顶，也就是数组的最后一个元素
        s.pop();
      }
      // 如果栈是空的，说明nums[i]后面没有比他大的则返回-1，否则返回栈顶元素
      // nums[i] 身后的更大元素
      res[i] = s.length === 0 ? -1 : s[s.length - 1];
      // 将nums[i]放到s里
      s.push(nums[i]);
    }
    return res;
  }
  // 记录nums2中每个元素的下一个更大的元素
  var greater = nextGreaterElement(nums2);
  // 将nums2[i]作为key，greater[i]作为val存到map中
  var greaterMap = new Map();
  for(var i = 0; i < nums2.length; i++) {
    greaterMap.set(nums2[i], greater[i]);
  }
  var res = new Array(nums1.length).fill(0);
  for(var i = 0; i < nums1.length; i++) {
    res[i] = greaterMap.get(nums1[i]);
  }
  return res;
};

// 2023/2/22
// 我第一思路: 但是我们遍历nums1的时候，通过nums2.indexOf(nums1[i])去找nums1[i]在nums2的下标的时候本身就需要循环，indexOf我认为也是循环去找的下标，其实也是很费时的
var nextGreaterElement = function(nums1, nums2) {
  // 获取每个数组元素下一个大元素的方法
  // 单调栈：解决下一个更大元素的问题
  // 思路：栈，先进后出，我们从数组第一位开始往后遍历，找到这个元素下一个更大的元素，如果我们反向遍历数组nums，将nums[i]放到栈中，
  // 因为是后面的先放到栈底了，所以对于i-1去看i的时候就是顺序去找下一个更大的元素。
  var nextGreaterElement = function(nums) {
    var n = nums.length;
    // 结果数组
    var res = new Array(nums.length).fill(0);
    // 单调栈
    var stack = [];
    // 倒着入栈
    for(var i = n-1; i >= 0; i--) {
      // 当栈不为空，并且栈顶的元素小于等于nums[i]
      while(stack.length && stack[stack.length - 1] <= nums[i]) {
        // 矮个子移出去
        stack.pop();
      }
      // 如果栈为空返回-1，说明后面没有更大的元素
      res[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
      // nums[i]入栈
      stack.push(nums[i]);
    }
    return res;
  }
  var res = new Array(nums1.length).fill(0);
  // 先找到nums2数组每个元素下一个最大元素的集合
  var greater = nextGreaterElement(nums2);
  // 遍历nums1，
  for(var i = 0; i < nums1.length; i++) {
    // 通过nums2.indexOf(nums1[i])找到nums1[i]在Nums2中的下标，然后在greater[找到的下表]赋值给res[i]即可
    res[i] = greater[nums2.indexOf(nums1[i])]
  }
  return res;
}

// 用空间换时间
var nextGreaterElement = function(nums1, nums2) {
  var nextGreaterElement = function(nums) {
    var n = nums.length;
    // 结果数组
    var res = new Array(nums.length).fill(0);
    // 单调栈
    var stack = [];
    // 倒着入栈
    for(var i = n-1; i >= 0; i--) {
      // 当栈不为空，并且栈顶的元素小于等于nums[i]
      while(stack.length && stack[stack.length - 1] <= nums[i]) {
        // 矮个子移出去
        stack.pop();
      }
      // 如果栈为空返回-1，说明后面没有更大的元素
      res[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
      // nums[i]入栈
      stack.push(nums[i]);
    }
    return res;
  }
  var res = new Array(nums1.length).fill(0);
  // 保存nums2下一个更大元素的集合
  var greater = nextGreaterElement(nums2);
  // 定义map，将Nums2中每个元素为key，每个元素对应的下个最大元素为value存到map里
  var greaterMap = new Map();
  for(var i = 0; i < nums2.length; i++) {
    greaterMap.set(nums2[i], greater[i]);
  }
  // 遍历nums1，去greater中找nums1[i]对应的值，存到数组里
  for(var j = 0; j < nums1.length; j++) {
    res[j] = greaterMap.get(nums1[j]);
  }
  return res;
}
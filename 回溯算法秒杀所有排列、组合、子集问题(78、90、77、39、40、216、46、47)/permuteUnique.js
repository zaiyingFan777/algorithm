// 47. 全排列 II
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
//
// 示例 1：
// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//   [1,2,1],
//   [2,1,1]]
//
// 示例 2：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//
// 提示：
// 1 <= nums.length <= 8
// -10 <= nums[i] <= 10

// 思路：元素可重复但不可重复选择，
// 全排列：首先我们要给元素排序，然后需要用used数组标记哪些元素不可使用，
// 但是做到上面两点还是不行，122' 我们在1固定，2走完得到 122，然后 1 2'的时候因为2与2'是重复的，并且2已被回退了此时used[1](2)为false,
// 这时候肯定会出现重复，所以在使用重复数字的情况需要保证used[i-1]也得是true是在被使用的才行

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  var res = [];
  var track = [];
  var used = new Array(nums.length).fill(false);
  var backtrack = function (nums) {
    // base case
    if (track.length === nums.length) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }
    for(var i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      // 新添加的剪枝逻辑，固定相同的元素在排列中的相对位置
      // 首先这里全排列跟子集和组合不一样的地方，这里没有start，不需要start > i
      // 像[1,2,2]，我们第一层选择了i=0(1)，然后在第二层我们选择了i=1(2)，第三层i=2(2)，选出了122
      // 但是第二层我们选择i=2(2)的时候，i = 2 > 0 && nums[2](2) == nums[1](2) && 这时候used[1]在回撤中恢复为了false，
      // 正好满足我们的条件，直接跳过即可
      if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue;
      // 做选择
      track.push(nums[i]);
      used[i] = true;
      // 递归回溯子树
      backtrack(nums);
      // 回撤
      track.pop(nums[i]);
      used[i] = false;
    }
  }
  // 数组排序，让相等的元素挨着
  nums.sort();
  backtrack(nums);
  return res;
};
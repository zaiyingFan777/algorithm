// 39. 组合总和
// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
// 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
//
// 示例 1：
// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
// 解释：
// 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
// 7 也是一个候选， 7 = 7 。
// 仅有这两种组合。
//
// 示例 2：
// 输入: candidates = [2,3,5], target = 8
// 输出: [[2,2,2,2],[2,3,3],[3,5]]
//
// 示例 3：
// 输入: candidates = [2], target = 1
// 输出: []
//
// 提示：
// 1 <= candidates.length <= 30
// 2 <= candidates[i] <= 40
// candidates 的所有元素 互不相同
// 1 <= target <= 40

// 思路：无重复可复选的子集
// 1.由于可以复选，我们在我们之前无重复不可复选的子集基础上，去掉backtrack(nums, i+1)变为backtrack(nums, i)即可
// 由于可以无限制的去递归，我们需要有base case，当轨迹的和大于target的时候就没必要继续递归了

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  var res = [];
  var track = [];
  var trackSum = 0;
  var backtrack = function (nums, start, target) {
    // base case，找到目标和，记录结果
    if (trackSum === target) {
      res.push(JSON.parse(JSON.stringify(track)));
      return;
    }
    // base case，超过目标和，停止向下遍历
    if (trackSum > target) return;
    for(var i = start; i < nums.length; i++) {
      // 做选择
      trackSum += nums[i];
      track.push(nums[i]);
      // 递归回溯子树，但是可以重复选择同一元素
      // 递归遍历下一层回溯树
      // 同一元素可重复使用，注意参数
      backtrack(nums, i, target);
      // 回撤
      trackSum -= nums[i];
      track.pop();
    }
  }
  if (candidates.length === 0) return res;
  backtrack(candidates, 0, target);
  return res;
};
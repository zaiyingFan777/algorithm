// 124. 二叉树中的最大路径和
// 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。
// 给你一个二叉树的根节点 root ，返回其 最大路径和 。
 
// 示例 1：
// 输入：root = [1,2,3]
// 输出：6
// 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

// 示例 2：
// 输入：root = [-10,9,20,null,null,15,7]
// 输出：42
// 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 
// 提示：
// 树中节点数目范围是 [1, 3 * 104]
// -1000 <= Node.val <= 1000

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  // 求最大，我们设置未负无穷，因为有可能Node.val为负数
  var res = -Infinity;
  var maxGain = function(root) {
    if (!root) return 0;
    // 由于node.val有可能为负数，负数+其他只会变得更小
    // 所以计算左右子树的最大路径和的时候需要与0比较，
    var leftMax = Math.max(0, maxGain(root.left));
    var rightMax = Math.max(0, maxGain(root.right));
    // var newRes = root.val + leftMax + rightMax;
    // // 这里使用后序位置去计算res
    // res = Math.max(res, newRes);
    res = Math.max(res, leftMax + rightMax + root.val);
    return root.val + Math.max(leftMax, rightMax);
  } 
  maxGain(root);
  return res;
}
// 104. 二叉树的最大深度

// 给定一个二叉树，找出其最大深度。
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
// 说明: 叶子节点是指没有子节点的节点。

// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

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
var maxDepth = function(root) {
  var res = 0;
  var depth = 0;
  function traverse(root) {
    if (root === null) {
      res = Math.max(res, depth);
      return;
    }
    // 前序位置让depth++
    depth++;
    traverse(root.left);
    traverse(root.right);
    // 后序位置让depth--变为刚进来的depth
    depth--;
  }
  traverse(root);
  return res;
};

var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  var leftMax = maxDepth(root.left);
  var rightMax = maxDepth(root.right);
  // 后序位置处理数据
  // return Math.max(leftMax, rightMax) + 1; // 这里加1是加的本层的
  // 整棵树的最大深度等于左右子树的最大深度取最大值，
  // 然后再加上根节点自己
  var res = Math.max(leftMax, rightMax) + 1;
  return res;
}
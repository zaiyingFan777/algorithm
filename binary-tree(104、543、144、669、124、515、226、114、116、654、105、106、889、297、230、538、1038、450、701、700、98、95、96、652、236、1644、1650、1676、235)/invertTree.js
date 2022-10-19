// 226. 翻转二叉树
// 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

// 示例 1：
// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]

// 示例 2：
// 输入：root = [2,1,3]
// 输出：[2,3,1]

// 示例 3：
// 输入：root = []
// 输出：[]
 
// 提示：

// 树中节点数目范围在 [0, 100] 内
// -100 <= Node.val <= 100

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 一、遍历的方式
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // 遍历函数
  var traverse = function(root) {
    if (!root) return;
    // 前序位置交换元素
    var tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    traverse(root.left);
    traverse(root.right);
    // 后序位置交换元素也可以
    // var tmp = root.left;
    // root.left = root.right;
    // root.right = tmp;
  }
  traverse(root);
  return root;
};

// 二、分解问题方式，得到左右子树的返回值，在后序位置交换元素
var invertTree = function(root) {
  // 分解问题的方式必须返回null
  if (!root) return null;
  var left = invertTree(root.left);
  var right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}
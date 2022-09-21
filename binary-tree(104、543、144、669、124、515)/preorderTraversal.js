// 144. 二叉树的前序遍历
// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

// 示例 1：
// 输入：root = [1,null,2,3]
// 输出：[1,2,3]

// 示例 2：
// 输入：root = []
// 输出：[]

// 示例 3：
// 输入：root = [1]
// 输出：[1]

// 示例 4：
// 输入：root = [1,2]
// 输出：[1,2]

// 示例 5：
// 输入：root = [1,null,2]
// 输出：[1,2]

// 提示：
// 树中节点数目在范围 [0, 100] 内
// -100 <= Node.val <= 100
// 进阶：递归算法很简单，你可以通过迭代算法完成吗？

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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  var res = [];
  var preorder = function(root) {
    if (!root) return;
    // 前序遍历 根左右
    res.push(root.val);
    preorder(root.left);
    preorder(root.right);
  }
  preorder(root);
  return res;
}

// 迭代方式
var preorderTraversal = function (root) {
  var res = [];
  if (!root) return res;
  // 用队列，属于层序遍历
  // 用栈，先放右子树，再放左子树，先入后出
  var stack = [root];
  while(stack.length) {
    var sz = stack.length;
    for(var i = 0; i < sz; i++) {
      // 取出最后一个元素
      var node = stack.pop();
      res.push(node.val);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  return res;
}
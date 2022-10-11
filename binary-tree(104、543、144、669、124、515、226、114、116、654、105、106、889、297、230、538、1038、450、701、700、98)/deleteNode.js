// 450. 删除二叉搜索树中的节点
// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

// 一般来说，删除节点可分为两个步骤：

// 首先找到需要删除的节点；
// 如果找到了，删除它。

// 示例 1:
// 输入：root = [5,3,6,2,4,null,7], key = 3
// 输出：[5,4,6,2,null,null,7]
// 解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
// 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
// 另一个正确答案是 [5,2,6,null,4,null,7]。

// 示例 2:
// 输入: root = [5,3,6,2,4,null,7], key = 0
// 输出: [5,3,6,2,4,null,7]
// 解释: 二叉树不包含值为 0 的节点

// 示例 3:
// 输入: root = [], key = 0
// 输出: []

// 提示:

// 节点数的范围 [0, 104].
// -105 <= Node.val <= 105
// 节点值唯一
// root 是合法的二叉搜索树
// -105 <= key <= 105

// 进阶： 要求算法时间复杂度为 O(h)，h 为树的高度。

// 1.删除的节点无子节点，返回null
// 2.删除的节点只有左子树或者右子树，返回对面一侧即可
// 1.2其实可以写在一起
// 3.删除的节点有左右子树，我们可以选出来左子树的最大或者右子树的最小来替换这个值，再删除对应的，我们这里删除右子树的最小

// 找到bst的最小
var getMin = function(root) {
  while(root.left !== null) root = root.left;
  return root;
}

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
 * @param {number} key
 * @return {TreeNode}
 */

var deleteNode = function (root, key) {
  if (!root) return null;
  if (root.val === key) {
    // 一二合并
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    // 三
    // 找到右子树的最小节点
    var minNode = getMin(root.right);
    // 修改值
    root.val = minNode.val;
    // 删除minNode
    root.right = deleteNode(root.right, minNode.val);
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key);
  }
  return root;
};
// 538. 把二叉搜索树转换为累加树
// 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

// 提醒一下，二叉搜索树满足下列约束条件：
// 节点的左子树仅包含键 小于 节点键的节点。
// 节点的右子树仅包含键 大于 节点键的节点。
// 左右子树也必须是二叉搜索树。

// 注意：本题和 1038: https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/ 相同

// 示例 1：
// 输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
// 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

// 示例 2：
// 输入：root = [0,null,1]
// 输出：[1,null,1]

// 示例 3：
// 输入：root = [1,0,2]
// 输出：[3,3,2]

// 示例 4：
// 输入：root = [3,2,4,1]
// 输出：[7,9,4,10]


// 提示：
// 树中的节点数介于 0 和 104 之间。
// 每个节点的值介于 -104 和 104 之间。
// 树中的所有值 互不相同 。
// 给定的树为二叉搜索树。


// 累加：本节点+右子树的节点val之和，所以最好从最大的开始算，我们采用中序遍历，中序遍历得到升序的，但是如果遍历的时候先递归root.right就会得到降序的序列，

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
 * @return {TreeNode}
 */
var convertBST = function (root) {
  // 计算累加和
  var sum = 0;
  var traverse = function (root) {
    if (!root) return;
    // 先遍历右子树
    traverse(root.right);
    // 维护累加和
    sum += root.val;
    // 将 BST 转化成累加树
    root.val = sum;
    traverse(root.left);
  }
  traverse(root);
  return root;
};
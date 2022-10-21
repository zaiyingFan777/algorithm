// 235. 二叉搜索树的最近公共祖先
// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
//
// 示例 1:
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。
//
// 示例 2:
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
//
// 说明:
//
//   所有节点的值都是唯一的。
// p、q 为不同节点且均存在于给定的二叉搜索树中。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 思路，bst没必要像常规遍历哪种方式去遍历所有节点去找，利用bst的特性，满足val1 <= root.val <= val2，即可
var lowestCommonAncestor = function(root, p, q) {
  // val1为p与q的最小值，val2为p与q的最大值
  var val1 = Math.min(p.val, q.val);
  var val2 = Math.max(p.val, q.val);
  // 查找函数
  var find = function (root, val1, val2) {
    // base case
    if (!root) return null;
    // 如果root.val大于val2，我们需要去值更小的左子树去寻找，这样才能满足val1 <= root.val <= val2
    if (root.val > val2) {
      return find(root.left, val1, val2);
    }
    // 如果root.val小于val1，我们需要去值更大的右子树去寻找，这样才能满足val1 <= root.val <= val2
    if (root.val < val1) {
      return find(root.right, val1, val2);
    }
    // 剩下的情况就是val1 <= root.val <= val2
    // 直接返回root，root即为lca
    return root;
  }
  return find(root, val1, val2);
};
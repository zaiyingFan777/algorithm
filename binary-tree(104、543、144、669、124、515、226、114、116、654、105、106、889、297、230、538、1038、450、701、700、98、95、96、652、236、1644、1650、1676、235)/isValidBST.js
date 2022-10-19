// 98. 验证二叉搜索树
// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

// 有效 二叉搜索树定义如下：

// 节点的左子树只包含 小于 当前节点的数。
// 节点的右子树只包含 大于 当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。


// 示例 1：
// 输入：root = [2,1,3]
// 输出：true

// 示例 2：

// 输入：root = [5,1,4,null,null,3,6]
// 输出：false
// 解释：根节点的值是 5 ，但是右子节点的值是 4 。


// 提示：
// 树中节点数目范围在[1, 104] 内
// -231 <= Node.val <= 231 - 1

// 如果递归判断root.left < root.val < root.right 是不行，只能保证每一个节点，但不能保证根元素的左子树都小于root.val小于根元素的右子树
// 我们通过使用辅助函数，增加函数参数列表，在参数中携带额外信息，将这种约束传递给子树的所有节点，这也是二叉树算法的一个小技巧吧

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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 限定以 root 为根的子树节点必须满足 max.val > root.val > min.val 
  var isValid = function (root, min, max) {
    // base case
    if (!root) return true;
    // 若root.val不符合max和min的限制，说明不是合法BST
    if (min !== null && min.val >= root.val) return false;
    if (max !== null && max.val <= root.val) return false;
    // 限定左子树的最大值是root.val，右子树的最小值是root.val
    return isValid(root.left, min, root)
        && isValid(root.right, root, max);
  }
  return isValid(root, null, null);
};
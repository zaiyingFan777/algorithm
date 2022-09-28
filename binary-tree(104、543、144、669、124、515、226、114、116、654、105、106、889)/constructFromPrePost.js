// 889. 根据前序和后序遍历构造二叉树
// 给定两个整数数组，preorder 和 postorder ，其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树。
// 如果存在多个答案，您可以返回其中 任何 一个。

// 示例 1：
// 输入：preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
// 输出：[1,2,3,4,5,6,7]

// 示例 2:
// 输入: preorder = [1], postorder = [1]
// 输出: [1]

// 提示：
// 1 <= preorder.length <= 30
// 1 <= preorder[i] <= preorder.length
// preorder 中所有值都 不同
// postorder.length == preorder.length
// 1 <= postorder[i] <= postorder.length
// postorder 中所有值都 不同
// 保证 preorder 和 postorder 是同一棵二叉树的前序遍历和后序遍历

// 思路：从前序遍历数组的第一个元素为rootVal，rootVal下一个元素为root.left的rootVal，然后通过leftRootVal在后序遍历数组中找到对应下标，可以计算出leftSize，

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function(preorder, postorder) {
  // 记录后序遍历数组
  var valToIndex = new Map();
  for(var i = 0; i < postorder.length; i++) {
    valToIndex.set(postorder[i], i);
  }
  var build = function(preorder, preStart, preEnd, postorder, postStart, postEnd) {
    // base case
    if (preStart > preEnd) return null;
    if (preStart === preEnd) {
      // 相等的时候最后一个子节点的rootval
      return new TreeNode(preorder[preStart]);
    }
    // 从前序遍历数组中找到rootVal
    var rootVal = preorder[preStart];
    var leftRootVal = preorder[preStart + 1];
    // 根据leftRootVal在后序遍历数组中查找到Index
    var index = valToIndex.get(leftRootVal); // 左子树的根节点
    // 根据左子树根节点的index在后序遍历数组中找到leftSize
    var leftSize = index - postStart + 1; // 这里用index-postStart的话不包含index，后序遍历数组我们得需要保留index才是真正计算的leftSize
    // 创建根元素
    var root = new TreeNode(rootVal);
    // 递归构建左右子树
    root.left = build(preorder, preStart + 1, preStart + leftSize, postorder, postStart, index);
    root.right = build(preorder, preStart + leftSize + 1, preEnd, postorder, index + 1, postEnd);
    return root;
  }
  return build(preorder, 0, preorder.length - 1, postorder, 0, postorder.length - 1);
};
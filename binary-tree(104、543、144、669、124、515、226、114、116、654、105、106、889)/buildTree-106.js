// 106. 从中序与后序遍历序列构造二叉树
// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

// 示例 1:
// 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// 输出：[3,9,20,null,null,15,7]

// 示例 2:
// 输入：inorder = [-1], postorder = [-1]
// 输出：[-1]

// 提示:

// 1 <= inorder.length <= 3000
// postorder.length == inorder.length
// -3000 <= inorder[i], postorder[i] <= 3000
// inorder 和 postorder 都由 不同 的值组成
// postorder 中每一个值都在 inorder 中
// inorder 保证是树的中序遍历
// postorder 保证是树的后序遍历

// 思路：
// 后序遍历数组的最后一个元素为根元素
// 中序遍历，根据rootVal找到在中序数组中的下标index，可以计算出左子树的leftSize: index - inStart，然后我们根据postStart + leftSize可以得出后序遍历数组的左子树的边界为(postStart + leftSize - 1)
// 例如 中序遍历 [1,2,3..] 后序遍历 [1,2,..,3] 假设3为index，2-0 = 2，leftSize为2，在后序遍历数组中postStart + leftSize = 0 + 2 = 2，但是后序遍历数组的前半段又不包含rootVal，所以计算出的下标2需要减一，才能得到left的最后一个位置

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  var valToIndex = new Map();
  for(var i = 0; i < inorder.length; i++) {
    valToIndex.set(inorder[i], i);
  }
  // 构造函数
  var build = function(inorder, inStart, inEnd, postorder, postStart, postEnd) {
    // base case
    if (inStart > inEnd) return null;
    // 后序遍历的最后一个元素就是root的根
    var rootVal = postorder[postEnd];
    // 找到rootVal在中序数组中的index
    var index = valToIndex.get(rootVal);
    // 通过index以及inStart计算出左子树的size
    var leftSize = index - inStart;
    var root = new TreeNode(rootVal);
    // 递归构造左右子树
    root.left = build(inorder, inStart, index - 1, postorder, postStart, postStart + leftSize - 1);
    root.right = build(inorder, index + 1, inEnd, postorder, postStart + leftSize, postEnd - 1);
    return root;
  }
  return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1);
};
// 543. 二叉树的直径
// 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

// 示例 :
// 给定二叉树
//           1
//          / \
//         2   3
//        / \     
//       4   5    
// 返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

// 注意：两结点之间的路径长度是以它们之间边的数目表示。

// 思路一：现在让我求整棵树中的最长「直径」，那直截了当的思路就是遍历整棵树中的每个节点，然后通过每个节点的左右子树的最大深度算出每个节点的「直径」，最后把所有「直径」求个最大值即可。

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
var diameterOfBinaryTree = function (root) {
  var maxDiameter = 0;
  // 遍历二叉树
  var traverse = function (root) {
    if (!root) return;
    // 遍历二叉树的时候计算每个节点的最大直径
    // 对每个节点计算直径
    // 算直径，不加本节点，左子树最大深度+右子树最大深度
    // 计算Left、right的最大深度
    var leftMax = maxDepth(root.left);
    var rightMax = maxDepth(root.right);
    var myDiameter = leftMax + rightMax;
    // 与之前计算的maxDiameter值比较取最大的
    maxDiameter = Math.max(maxDiameter, myDiameter);
    // 接着遍历左右子树的节点并计算直径
    traverse(root.left);
    traverse(root.right);
  }
  // 计算二叉树的最大深度
  var maxDepth = function (root) {
    if (!root) return 0;
    var leftMax = maxDepth(root.left);
    var rightMax = maxDepth(root.right);
    // 最大深度：根节点+左右子树的最大深度
    return 1 + Math.max(leftMax, rightMax);
  }
  // 对每个节点计算直径，求最大直径
  // 遍历每个子节点
  traverse(root);
  return maxDiameter;
};

// 上面这个解法是正确的，但是运行时间很长，原因也很明显，traverse遍历每个节点的时候还会调用递归函数maxDepth，而maxDepth是要遍历子树的所有节点的，所以最坏时间复杂度是 O(N^2)。


// 思路二：后序位置的优化，我们从root节点开始计算他的最大深度，计算完左右子树的最大深度后，后序位置计算出它的最大直径，再然后返回1+左右子树的最大深度
var diameterOfBinaryTree = function (root) {
  var maxDiameter = 0;
  var maxDepth = function(root) {
    if (!root) return 0;
    var leftMax = maxDepth(root.left);
    var rightMax = maxDepth(root.right);
    // 后序位置，计算直径
    var myDiameter = leftMax + rightMax;
    maxDiameter = Math.max(maxDiameter, myDiameter);
    return 1 + Math.max(leftMax, rightMax);
  }
  maxDepth(root);
  return maxDiameter;
}
// 230. 二叉搜索树中第K小的元素
// 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。

// 示例 1：
// 输入：root = [3,1,4,null,2], k = 1
// 输出：1

// 示例 2：


// 输入：root = [5,3,6,2,4,null,null,1], k = 3
// 输出：3

// 提示：
// 树中的节点数为 n 。
// 1 <= k <= n <= 104
// 0 <= Node.val <= 104

// 思路：BST 的中序遍历结果是有序的（升序）
// BST的中序遍历，会从最小的那个开始打印，最小的算是第1个最小的，所以我们可以认为到达最小的那个元素后让rank++从0变为1.
//   1 
//    \
//     2
// 比如上面的，traverse(1.left); rank++; traverse(1.right);
// traverse(1.left); == traverse(null); return ，这时候走到了 rank++ 为1，root.val也为1，然后traverse(1.right)==traverse(2); 得到 traverse(null); rank++(2，root.val也为2); traverse(null);

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  // 记录当前元素的排名
  // 我们从0开始，由于k是从1开始的，所以第一次遇到空节点left后，rank++就是1再与k去比较
  var rank = 0;
  var res = 0;
  // 中序遍历
  var traverse = function (root, k) {
    if (!root) return;
    traverse(root.left, k);
    /* 中序遍历代码位置 */
    rank++;
    if (rank === k) {
      // 找到第 k 小的元素
      res = root.val;
      return;
    }
    /*****************/
    traverse(root.right, k);
  }
  traverse(root, k);
  return res;
};
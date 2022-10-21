/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.parent = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 这道题就是链表相交问题，两个链表找交点  下面就是操作思路
var lowestCommonAncestor = function(root, p, q) {
  var a = p, b = q;
  while(a !== b) {
    // 找链表交点的操作

    // a走一步，如果走到根节点，转到q节点
    if (a === null) {
      a = q;
    } else {
      a = a.parent;
    }

    // b走一步，如果走到根节点，转到p
    if (b === null) {
      b = p;
    } else {
      b = b.parent;
    }
  }
  return a;
}
// pq可能不存在二叉树中，所以我们需要遍历所有得节点
// 这里应该先判断root是否为lca，如果是的话就不用再判断自己的.val是否与pq相等了
// 判断root.val == p || q得时候需要放在后序位置(先判断left与right是否都不为null，也就是当前的root是否为lca节点，再去判断root.val与pq的关系)


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
var lowestCommonAncestor = function(root, p, q) {
  // 定义是否找到p或q
  var foundP = foundQ = false;
  // find函数
  var find = function (root, p, q) {
    // base case
    if (!root) return null;
    var left = find(root.left, p, q);
    var right = find(root.right, p, q);
    // 后序位置，判断当前节点是不是 LCA 节点
    // 判断left与right是否都不为null
    if (left && right) return root;
    // 后序位置，判断当前节点是不是目标值
    // 为了能够遍历所有（因为p，q可能不都存在于root中），所以我们在后序位置判断root.val与pq是否相等
    if (root.val === p.val || root.val === q.val) {
      if (root.val === p.val) foundP = true;
      if (root.val === q.val) foundQ = true;
      return root;
    }
    // 上面的判断都不满足
    return left ? left : right;
  }
  // 执行find函数得到res
  var res = find(root, p, q);
  // 如果foundP或者foundQ有一个没找到或者都没找到就返回null
  if (!foundP || !foundQ) return null;
  // p 和 q 都存在二叉树中，才有公共祖先
  return res;
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode[]} nodes
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, nodes) {
  // 遍历nodes将node存到set里，方便后边比对
  var values = new Set(nodes); // js可以直接将数组作为参数传入到set中，还有去重功能
  // 寻找二叉树的方法
  var find = function (root) {
    // base case
    if (!root) return null;
    // 前序位置检查root.val
    if (values.has(root.val)) {
      return root;
    }
    // 检查左右子树
    var left = find(root.left);
    var right = find(root.right);
    // 后序位置判断: left与right是否都不为null，如果都不为null那就是最近的公共祖先
    if (left && right) {
      // 当前节点是 LCA 节点
      return root;
    }
    // 如果left不为null返回left，如果right不为null返回right，如果left与right都为null依然返回null
    // 注意上面已经判断了left和right都不为null的情况，所以这里left、right不可能同时不为null
    return left ? left : right;
  }
  return find(root);
};
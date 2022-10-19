// 236. 二叉树的最近公共祖先
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
//
// 示例 1：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
//
// 示例 2：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
//
// 示例 3：
// 输入：root = [1,2], p = 1, q = 2
// 输出：1
//
// 提示：
//
// 树中节点数目在范围 [2, 105] 内。
// -109 <= Node.val <= 109
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。

// 1.注意两种情况，第一种：示例一，第二种：示例二，第一种很常规，left!=null&&right!=null我们返回root节点，第二种5包含4 搜索到了5就直接返回5，这时候右边为null，也不满足left!=null&&right!=null，所以直接返回不为null的left
// 正好就是答案。
// 2.找公共祖先，其实就是先去找对应元素，所以我们用到以下find二叉树元素的框架,只不过我们在后序位置去判断left与right是否同时不为空，来决定是否返回最近公共祖先root

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
  // 寻找二叉树的方法
  var find = function (root, p, q) {
    // base case
    if (!root) return null;
    // 前序位置检查root.val
    if (root.val === p || root.val === q) {
      return root;
    }
    // 检查左右子树
    var left = find(root.left, p, q);
    var right = find(root.right, p, q);
    // 后序位置判断: left与right是否都不为null，如果都不为null那就是最近的公共祖先
    if (left && right) {
      return root;
    }
    // 如果left不为null返回left，如果right不为null返回right，如果left与right都为null依然返回null
    // 注意上面已经判断了left和right都不为null的情况，所以这里left、right不可能同时不为null
    return left ? left : right;
  }
  return find(root, p.val, q.val);
};
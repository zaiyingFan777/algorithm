// 114. 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：
// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 示例 1：
// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]

// 示例 2：
// 输入：root = []
// 输出：[]

// 示例 3：
// 输入：root = [0]
// 输出：[0]

// 提示：
// 树中结点数在范围 [0, 2000] 内
// -100 <= Node.val <= 100

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 如果采用遍历的形式，需要额外重新生成一棵树，但是本函数return void，所以我们采用分解思想
// 将root的左右子树拉平，然后在将root.right变为Left，然后在root.right上接入原先的right
var flatten = function (root) {
  // base case 
  if (!root) return;

  // 利用定义将左右子树拉平
  flatten(root.left);
  flatten(root.right);

  // 后序位置
  // 1、左右子树已经被拉平成一条链表
  var left = root.left;
  var right = root.right;

  // 2、将左子树作为右子树
  root.left = null;
  root.right = left;

  // 3、将原先的右子树接到当前右子树的末端
  var p = root;
  while(p.right) {
    p = p.right;
  }
  p.right = right;
};
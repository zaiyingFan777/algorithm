// 116. 填充每个节点的下一个右侧节点指针
// 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }

// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 初始状态下，所有 next 指针都被设置为 NULL。

// 示例 1：
// 输入：root = [1,2,3,4,5,6,7]
// 输出：[1,#,2,3,#,4,5,6,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。

// 示例 2:
// 输入：root = []
// 输出：[]
 
// 提示：
// 树中节点的数量在 [0, 212 - 1] 范围内
// -1000 <= node.val <= 1000
 
// 进阶：
// 你只能使用常量级额外空间。
// 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
// 采用遍历的思维，将二叉树看作三叉树
// base case: 右侧所有的节点包括root，他们的next默认值就是null，所以不需要再做处理
// 只需要连接同一父节点的左右子树以及相邻节点之间的间隙
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) return null;
  // 三叉树遍历框架
  var traverse = function(node1, node2) {
    if (!node1 || !node2) return;
    // 前序位置
    // 将传入的两个节点穿起来
    node1.next = node2;
    // 连接相同父节点的两个子节点
    traverse(node1.left, node1.right);
    traverse(node2.left, node2.right);
    // 连接跨越父节点的两个子节点
    traverse(node1.right, node2.left);
  }
  traverse(root.left, root.right);
  return root;
};
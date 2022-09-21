// 515. 在每个树行中找最大值
// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

// 示例1：
// 输入: root = [1,3,2,5,3,null,9]
// 输出: [1,3,9]

// 示例2：
// 输入: root = [1,2,3]
// 输出: [1,3]
 
// 提示：
// 二叉树的节点个数的范围是 [0,104]
// -231 <= Node.val <= 231 - 1

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
 * @return {number[]}
 */
// 层序遍历二叉树
var largestValues = function(root) {
  var res = [];
  if (!root) return res;
  // 创建队列
  var queue = [root];
  while(queue.length) {
    // 有负节点，所以这里设为负无穷
    var maxNodeVal = -Infinity;
    var sz = queue.length;
    for(var i = 0; i < sz; i++) {
      // 截取第一个
      var node = queue.shift();
      maxNodeVal = Math.max(maxNodeVal, node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(maxNodeVal);
  }
  return res;
};
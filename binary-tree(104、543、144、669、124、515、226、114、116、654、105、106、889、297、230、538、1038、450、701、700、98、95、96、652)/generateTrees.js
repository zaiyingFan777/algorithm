// 95. 不同的二叉搜索树 II
// 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。

// 示例 1：

// 输入：n = 3
// 输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]

// 示例 2：

// 输入：n = 1
// 输出：[[1]]


// 提示：
// 1 <= n <= 8

// 思路穷举
// 1、穷举root节点的所有可能。
// 2、递归构造出左右子树的所有合法 BST。
// 3、给root节点穷举所有左右子树的组合。


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  // 生成区间[lo, hi]的treeNode集合
  var build = function (lo, hi) {
    // 定义res数组
    var res = [];
    // base case
    if (lo > hi) {
      res.push(null);
      return res;
    }
    // 1.穷举root节点的所有可能
    for(var i = lo; i <= hi; i++) {
      // 2、递归构造出左右子树的所有合法 BST。
      var leftTree = build(lo, i - 1);
      var rightTree = build(i + 1, hi);
      // 3、给root节点穷举所有左右子树的组合。
      for(var left of leftTree) {
        for(var right of rightTree) {
          // 以i为root根节点
          var root = new TreeNode(i);
          root.left = left;
          root.right = right;
          res.push(root);
        }
      }
    }
    return res;
  }
  return build(1, n);
};
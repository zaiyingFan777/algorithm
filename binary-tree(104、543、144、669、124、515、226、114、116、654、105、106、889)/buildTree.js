// 105. 从前序与中序遍历序列构造二叉树
// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

// 示例 1:
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]

// 示例 2:
// 输入: preorder = [-1], inorder = [-1]
// 输出: [-1]
 
// 提示:
// 1 <= preorder.length <= 3000
// inorder.length == preorder.length
// -3000 <= preorder[i], inorder[i] <= 3000
// preorder 和 inorder 均 无重复 元素
// inorder 均出现在 preorder
// preorder 保证 为二叉树的前序遍历序列
// inorder 保证 为二叉树的中序遍历序列

// 前序遍历数组第一个为根元素。
// 我们将中序遍历的数组存到map中，key为item[i]，val为i，方便我们每次找到rootVal所在的下标
// [1, 2, 3, ...]，假设rootVal为3，那么他的左子树的范围为 2(3的下标) - 0 = 2，正好为左子树(0,2)的个数2
// [3, 1, 2, ...]，假设3为root节点，上面计算的左子节点的个数为2，我们计算左子树个数的右边界为：0(根节点下标) + 2(左子树) = 2，这时候左子树的右边界为2，
// 所以左子树从下标1，到下标2，共两个元素

var buildTree = function(preorder, inorder) {
  // 优化，不用每次通过prorder[preStart]的rootVal在inorder里遍历寻找
  var valToIndex = new Map();
  for(var i = 0; i < inorder.length; i++) {
    valToIndex.set(inorder[i], i);
  }
  // 构建函数
  var build = function(preorder, preStart, preEnd, inorder, inStart, inEnd) {
    // base case
    if (preEnd < preStart) return null;
    // 在preorder中找到rootVal
    var rootVal = preorder[preStart];
    // 根据rootVal在inorder中找到rootVal的下标
    var index = valToIndex.get(rootVal);
    // 找到LeftSize
    var leftSize = index - inStart;
    // 建立根节点
    var root = new TreeNode(rootVal);
    // 分别递归创建左右节点
    root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
    root.right = build(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
    return root;
  }
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}
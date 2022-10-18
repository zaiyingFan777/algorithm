// 652. 寻找重复的子树
// 给你一棵二叉树的根节点 root ，返回所有 重复的子树 。
// 对于同一类的重复子树，你只需要返回其中任意 一棵 的根结点即可。
// 如果两棵树具有 相同的结构 和 相同的结点值 ，则认为二者是 重复 的。

// 示例 1：
// 输入：root = [1,2,3,4,null,2,4,null,null,4]
// 输出：[[2,4],[4]]

// 示例 2：
// 输入：root = [2,1,1]
// 输出：[[1]]

// 示例 3：
// 输入：root = [2,2,2,3,null,3,null]
// 输出：[[2,3],[3]]

// 提示：
// 树中的结点数在 [1, 5000] 范围内。
// -200 <= Node.val <= 200

// 思路
// 1.首先需要知道自己长什么样子 后序遍历得到自己的字符串
// 2.以其他节点为根的子树都长啥样 借助一个外部数据结构(set或者map)，让每个节点把自己子树的序列化结果存进去，这样，对于每个节点，不就可以知道有没有其他节点的子树和自己重复了么

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
 * @return {TreeNode[]}
 */

// 错误解法：因为重复的子树是对象形式，如果不是一个变量指向的同一个变量，哪怕都是{a:1}这是不是同一个，所以用set结构也无法解决会放置重复的子树
// 1.利用set结构  js的set是有序的，java的set是无序的  但是两门语言的set都是不重复的
var findDuplicateSubtrees = function(root) {
  // 用来存储所有的无重复的子树
  var memo = new Set();
  // 结果set，如果有重复的就直接过滤
  var res = new Set();
  // 遍历root生成字符串子树
  var traverse = function (root) {
    if (!root) return "#";
    var left = traverse(root.left);
    var right = traverse(root.right);
    // 后序位置，将left、right、root.val得到root的子树字符串
    var subTree = `${left},${right},${root.val}`;
    if (memo.has(subTree)) {
      // 如果memo里已经有subTree了，我们将root放到res里，因为有可能有多个root重复，但是set结构我们只会放一次
      // 这里依然会放进去重复的，因为
      res.add(root);
    } else {
      // 如果memo里没有subTree，我们则将subTree存到memo中
      memo.add(subTree);
    }
    // 返回字符串子树
    return subTree;
  }
  traverse(root);
  // 将res变为数组
  // 将set变为数组的两种形式：1.[...set] 2.Array.from()
  return [...res];
};

// 2.用map结构存储subTree字符串出现的次数，第一次出现的时候我们将subTree作为key存到map里，当出现第2次的时候我们将root放到res里，当出现3、4...等更多次数的时候就不需要放了，防止重复
var findDuplicateSubtrees = function(root) {
  var memo = new Map();
  var res = [];
  // 遍历root生成字符串子树
  var traverse = function (root) {
    if (!root) return "#";
    var left = traverse(root.left);
    var right = traverse(root.right);
    // 后序位置，将left、right、root.val得到root的子树字符串
    var subTree = `${left},${right},${root.val}`;
    // 获取subTree在memo中出现的次数，如果没出现则为0次
    var freq = memo.get(subTree) || 0;
    // 如果freq为0次，说明没出现过，我们需要将其存入到memo中，
    // 如果freq为1次，说明我们仅仅存放过一次，这次是第一次碰到重复的subTree，我们将subTree对应的root放到res里
    // 如果freq > 1，说明我们已经将root存入到res中了，再存就重复了
    if (freq === 1) {
      res.push(root);
    }
    // 将freq的次数+1
    memo.set(subTree, freq + 1);
    return subTree;
  }
  traverse(root);
  return res;
}
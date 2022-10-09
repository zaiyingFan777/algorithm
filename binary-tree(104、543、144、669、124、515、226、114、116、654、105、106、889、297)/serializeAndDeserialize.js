// 297. 二叉树的序列化与反序列化

// 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

// 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

// 提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

// 示例 1：
// 输入：root = [1,2,3,null,null,4,5]
// 输出：[1,2,3,null,null,4,5]

// 示例 2：
// 输入：root = []
// 输出：[]

// 示例 3：
// 输入：root = [1]
// 输出：[1]

// 示例 4：
// 输入：root = [1,2]
// 输出：[1,2]
//  
// 提示：
// 树中结点数在范围 [0, 104] 内
// -1000 <= Node.val <= 1000

// 1.前序遍历，将树转为字符串
var SEP = ",";
var NULL = "#";

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  var sb = "";
  var traverse = function (root) {
    if (!root) {
      sb += `${NULL}${SEP}`;
      return;
    }
    // 前序位置 根左右
    sb += `${root.val}${SEP}`;
    // 递归遍历左右子树
    traverse(root.left);
    traverse(root.right);
  }
  traverse(root);
  return sb;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // 截取字符串最后一位
  data = data.slice(0, data.length - 1);
  // 将字符串转换为数组
  var nodes = data.split(SEP);
  var deTraverse = function () {
    if (nodes.length === 0) return null;
    // 取出数组的第一个元素
    var first = nodes.shift();
    // 如果first为#，则返回null
    if (first === NULL) return null;
    // 构建TreeNode
    var root = new TreeNode(first);
    // 递归构建左右子树
    root.left = deTraverse();
    root.right = deTraverse();
    return root;
  }
  return deTraverse();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// 2.后序遍历
// 后序遍历数组[左子树，左子树根，右子树，右子树根，根]
var SEP = ",";
var NULL = "#";

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  var sb = "";
  var traverse = function (root) {
    if (!root) {
      sb += `${NULL}${SEP}`;
      return;
    }
    // 递归遍历左右子树
    traverse(root.left);
    traverse(root.right);
    // 后序位置 左右根
    sb += `${root.val}${SEP}`;
  }
  traverse(root);
  return sb;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // 截取字符串最后一位
  data = data.slice(0, data.length - 1);
  // 将字符串转换为数组
  var nodes = data.split(SEP);
  var deTraverse = function () {
    if (nodes.length === 0) return null;
    // 取出数组的第一个元素
    var last = nodes.pop();
    // 如果first为#，则返回null
    if (last === NULL) return null;
    // 构建TreeNode
    var root = new TreeNode(last);
    // 先构造右子树，后构造左子树
    root.right = deTraverse();
    root.left = deTraverse();
    return root;
  }
  return deTraverse();
};


// 3.层级遍历
var SEP = ",";
var NULL = "#";

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  // 特殊情况特殊处理
  if (!root) return "";
  var sb = "";
  // 初始化队列，将root加入队列
  var q = [root];
  while(q.length) {
    // 先入先出取出第一个
    var cur = q.shift();

    /* 层级遍历代码位置 */
    // 判断是否为null
    if (cur === null) {
      sb += `${NULL}${SEP}`;
      // 跳出本轮循环
      continue;
    }
    // 如果cur不为null
    sb += `${cur.val}${SEP}`;
    /*****************/

    // 这里不检查cur的左右子树是否为null，因为取出的时候会检查
    q.push(cur.left);
    q.push(cur.right);
  }
  return sb;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // 我们序列化的时候如果data为null，则序列化为""
  if (data === "") return null;
  // 截取字符串最后一位
  data = data.slice(0, data.length - 1);
  // 将字符串转换为数组
  var nodes = data.split(SEP);
  // nodes数组的第一个元素为根元素
  var root = new TreeNode(nodes[0]);
  // 创建队列，将未处理的节点放进去从root开始，如果是null就没必要处理，只处理非null的
  var q = [root];
  // 循环nodes从1开始，直至结尾，处理未处理的元素
  // for(var i = 1; i < nodes.length;) {
  var i = 1;
  while (i < nodes.length) {
    // 队列中存在的都是父节点
    var parent = q.shift();
    // 左子节点对应的val
    var left = nodes[i++];
    if (left !== NULL) {
      // 如果left不为#，说明parent的left不为null，我们需要将起放到队列里，因为他需要被处理
      parent.left = new TreeNode(left);
      q.push(parent.left);
    } else {
      // 如果left为null，则说明parent的left为null，不需要再继续处理了
      parent.left = null;
    }
    // 右子节点对应的val
    var right = nodes[i++];
    if (right !== NULL) {
      // 如果right不为#，说明parent的right不为null，我们需要将起放到队列里，因为他需要被处理
      parent.right = new TreeNode(right);
      q.push(parent.right);
    } else {
      // 如果right为null，则说明parent的right为null，不需要再继续处理了
      parent.right = null;
    }
  }
  return root;
};
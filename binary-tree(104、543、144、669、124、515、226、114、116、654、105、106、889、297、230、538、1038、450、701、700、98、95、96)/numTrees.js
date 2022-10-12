// 96. 不同的二叉搜索树
// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。

// 示例 1：

// 输入：n = 3
// 输出：5

// 示例 2：

// 输入：n = 1
// 输出：1


// 提示：
// 1 <= n <= 19

// 其实就是一个全排列问题
// 1.先不用memo进行优化，这样会超出时间限制
// 1.思路，[1,n]每个数字i作为根节点的情况，我们将i为根节点，将数组划分为两半 left = [lo..i-1] right = [i+1..hi] 然后 left * right的组合  所有的i的left*right相加就是全排列
// 比如[1,2,3,4,5]，我们遍历到3，left = [1,2] right = [4,5] 然后 [1,2] [4,5]继续递归

// 1 2，有几种情况，当I等于1的时候，切分为left 等 count(1,0) right等于count(2,2) 这其实就是当1为根节点，左边为null 右边为2
// 当i等2的时候，切分为l = 11 right = 32，其实就是当root为2的时候，左边为1右边为null

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  var count = function (lo, hi) {
    // base case 
    // 当lo > hi闭区间[lo, hi]肯定是个空区间，也就对应着空节点 null，虽然是空节点，但是也是一种情况，所以要返回 1 而不能返回 0。
    if (lo > hi) return 1;
    var res = 0;
    for (var i = lo; i <= hi; i++) {
      // 左子树
      var left = count(lo, i - 1);
      // 右子树
      var right = count(i + 1, hi);
      res += left * right;
    }
    return res;
  }
  // 计算闭区间[1,n]组成的BST个数
  return count(1, n);
};

// 有备忘录优化
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  // 备忘录
  // 我们分为lo、hi，所以创建备忘录的时候需要能访问到lo hi 那就建长度为n+1的数组，比如n = 5，lo hi 最大为5，[0,1,2,3,4,5]数组为6可以访问到下标5
  // 初始默认值都为0
  var memo = new Array(n+1).fill().map(item => new Array(n+1).fill(0));
  // 计算闭区间 [lo, hi] 组成的 BST 个数
  var count = function (lo, hi) {
    // base case 
    if (lo > hi) return 1;
    if (memo[lo][hi] !== 0) return memo[lo][hi];
    var res = 0;
    for(var mid = lo; mid <= hi; mid++) {
      var left = count(lo, mid - 1);
      var right = count(mid + 1, hi);
      res += left * right;
    }
    // 计入备忘录
    memo[lo][hi] = res;
    return res;
  }
  // 计算闭区间[1,n]组成的BST个数
  return count(1, n);
}
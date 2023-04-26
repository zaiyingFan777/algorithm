// 5.深度优先遍历和广度优先遍历
// 根据搜索方式的不同，搜索算法大致可以分为深度优先遍历（Depth First Search，DFS）和广度优先遍历（Breadth FirstSearch，BFS）。以树为例，DFS的思路是沿着子树尽可能深地搜索树
// 的分支，到达叶子节点后通过回溯重复上述过程，直到所有的节点都被访问。BFS的思路则是一层一层地访问节点，直到完成遍历。

// 由于DFS和BFS的这种差异，!!![BFS一般用来求解最短问题（dijkstra算法的特例）]，而DFS书写起来比较简单，因此对于不是最短问题的情况，我们优先考虑使用DFS。然而事无绝对，DFS 也可以解决最短问
// 题，但是要注意栈溢出的问题。在很多情况下，两者可以交替使用，比如本章要讲的岛屿问题。

// 不管是DFS还是BFS，本质上都是搜索，而这样的搜索通常来说都是暴力搜索，因此当需要对问题的所有可能情况进行穷举时，我们就应该想到DFS和BFS。而第16章要讲解的回溯法，也是DFS的一种，即也
// 是一种暴力搜索方法，只不过回溯法会涉及前进和回溯的过程。

// 5.1 深度优先遍历
// 使用DFS进行解题的大概思路是定义起始节点和结束节点，从起点开始不断深入其他节点，在搜索的过程中判断是否满足特定条件，伪代码如下。
// var visited = {};
// function dfs(i) {
//   if (满足特定条件) {
//     // 返回结果或退出搜索空间
//   } 
//   visited[i] = true // 将当前状态标为已搜索
//   for 根据i能到达的下一个状态j {
//     if (!visited[j]) {
//       // 如果状态j没有被搜索过
//       dfs(j)
//     }
//   }
// }
// 上面的visited是为了防止由于环的存在而造成死循环的，不管是BFS还是DFS，如果是在二维矩阵或图上进行搜索，通常都需要visited来记录节点访问状态。也可以使用原地标记，比如后面要讲的岛屿问
// 题就使用了这个技巧。
// 如果在树的题目中使用DFS，由于树是不存在环的，因此有关树的题目大多数不需要visited，但是如果对树的结构做了修改，使之出现了环，那就仍然需要 visited。例如第138题复制带随机指针的链表，
// 这道题需要记录已经复制的节点。因此一个树的DFS代码在更多情况下应该是下面这样的
// function dfs(root) {
//   if (满足特定条件) {
//     // 返回结果或退出搜索空间
//   }
//   for(var child of root.children) {
//     dfs(child);
//   }
// }
// 而几乎所有有关树的题目都是二叉树，因此下面这样的代码更常见
// function dfs(root) {
//   if (满足特定条件) {
//     // 返回结果或退出搜索空间
//   }
//   dfs(root.left);
//   dfs(root.right);
// }

// 对于二叉树的题目，除了递归出口的条件，还会写一些其他的逻辑，这些逻辑由于位置的不同，产生的效果也截然不同。根据DFS逻辑位置的不同，我们将其分为三种类型，一种是自顶向下（前序遍历）
// 的，一种是自底向上（后序遍历）的，最后一种是中序遍历。

// ----------------------------------------------------------
// 前序遍历：根左右
// 中序遍历：左根右
// 后序遍历：左右根
// ----------------------------------------------------------

// 前序遍历就是在每个递归层级上首先访问节点来计算一些值，并在递归调用函数时将这些值传递到子节点，一般是通过参数传到子树中。
// 伪代码如下
// function dfs(root, 父节点传递过来的参数信息) {
//   if (满足特定条件) {
//     返回结果或退出搜索空间
//   }
//   // 主逻辑
//   bfs(root.left, 可以传递一些参数到子节点)
//   bfs(root.right, 可以传递一些参数到子节点)
// }

// 后序遍历是另一种常见的递归方法，首先对所有子节点递归地调用函数，然后根据返回值和根节点本身的值得到答案。
// function dfs(root) {
//   if (满足特定条件) {
//     返回结果或退出搜索空间
//   }
//   l = dfs(root.left);
//   r = dfs(root.right);
//   // 主逻辑
//   // 通常会对l和r进行一些操作并返回
// }

// ----------------------------------------------------------
// 经验总结如下
// 1.大多数有关树的题目使用后序遍历会比较简单，并且大多需要依赖左/右子树的返回值。例如第1448题统计二叉树中好节点的数目
// 2.也有一部分有关树的题目需要前序遍历，而前序遍历通常要结合参数扩展技巧。例如第1022题从根到叶的二进制数之和。
// 3.如果能使用参数和节点本身的值来决定应该传递给它的子节点的参数，那么就用前序遍历。
// 4.对于树中的任意一个节点，如果知道它子节点的答案，就能计算出当前节点的答案，那么就用后序遍历。
// 5.如果遇到二叉搜索树，则考虑使用中序遍历。
// 二叉搜索树  2
//          1   3  用中序遍历可以得到 123这样顺序的排序
// ----------------------------------------------------------

// 5.2 广度优先遍历(层级搜索、队列)
// 相对于DFS来说，BFS的变种比较少，能解决的问题种类比较单一。
// BFS比较适合用来找最短距离，因此如果题目中提到了[最短距离]，首先应该想到使用[BFS]。
// 使用BFS进行解题的思路同样是定义起始节点和结束节点，从起点开始不断深入其他节点，在搜索的过程中判断是否满足特定条件。
// [BFS和DFS只是遍历的方向不同，即上面提到的DFS是尽可能深地搜索树的分支，而BFS则是一层一层地访问节点。]
// 队列可以帮我们实现“一层一层地访问节点”的效果。其本质就是不断访问邻居，把邻居逐个加入队列，根据队列先进先出的特点，把每一层节点访问完后，会继续访问下一层节点。
// 伪代码如下：
// 计算从起点 start 到终点 target 的最近距离
// int BFS(Node start, Node target) {
//   Queue<Node> q; // 核心数据结构
//   Set<Node> visited; // 避免走回头路

//   q.offer(start); // 将起点加入队列
//   visited.add(start);
//   int step = 0; // 记录扩散的步数

//   while (q not empty) {
//       int sz = q.size();
//       /* 将当前队列中的所有节点向四周扩散 */
//       for (int i = 0; i < sz; i++) {
//           Node cur = q.poll();
//           /* 划重点：这里判断是否到达终点 */
//           if (cur is target)
//               return step;
//           /* 将 cur 的相邻节点加入队列 */
//           for (Node x : cur.adj())
//               if (x not in visited) {
//                   q.offer(x);
//                   visited.add(x);
//               }
//       }
//       /* 划重点：更新步数在这里 */
//       step++;
//   }
// }
// !!!小提示：如果是在带权图上进行BFS，则可以考虑使用优先队列来完成
// 接下来，我们通过力扣（LeetCode）中的路径和问题、岛屿和问题来详细讲解DFS和BFS的思路。

// 5.3 路径和系列问题
// 力扣（LeetCode）中的路径和系列问题是典型的可以用DFS来解决的题目。

// ------------------------------------------------------------------------------------------------------------
// 5.3.1 路径总和
// 112-hasPathSum
// 解法1：dfs递归
// 题目要求找到一条根节点到叶子节点的路径，并且路径上所有节点的值之和等于给定的目标值。也就是说，需要搜索这个二叉树的不同路径（根节点到叶子节点）。
// 如果找到一条符合条件的路径，则返回True；如果所有的路径都不符合要求，则返回False。因为题目要求只需要找到一条符合要求的路径，所以可以使用DFS来处理。

// 一种直观的思路是自顶向下，使用[前序遍历+参数扩展]，在向下递归的同时更新参数，当到达叶子节点或空节点时判断是否满足条件。
// 在这里，我们可以将目标和sum通过参数扩展的形式向下传递，在叶子节点上判断当前节点的val是否等于传递下来的参数sum。
// 这是一种非常常见的DFS解题思路，除了前序遍历，还有一种常见的二叉树的深度遍历法是后序遍历，即在递归函数返回时对问题进行求解, 使用子树的返回值来计算当前节点的返回值。

// 通常来讲，[DFS有递归和迭代两种实现方式]。因为树结构天然具有递归的特性（子树性质和整个树性质一致），使用递归可以很容易地将整个树问题转换成子树问题。
// 当我们层层递归到最小的子树时，这个最小子树的解（也被称为递归出口）往往很容易就能够得到，再一步步回溯就能得到原问题的解。

// 小提示：树的题目，优先考虑使用DFS递归解决。

// 当我们处理递归问题时，如何定义递归出口是非常重要的一步（递归出口指的是递归函数可以直接处理的最简单子问题）。对于本题，递归出口是当当前子树只有一个节点时（该节点是整个树的叶子
// 节点），需要在递归出口判断当前路径是否符合要求。

// 一般这种有关树的DFS题目，递归出口都是叶子节点或空节点
// 见图片./05-images/05-hasPathSum.jpg

// 复杂度分析
// 时间复杂度：在最坏情况下，我们会访问每个节点各一次，因此时间复杂度为O(n)，其中n是节点个数。
// 空间复杂度：所需额外的空间和树的高度呈线性关系。在最坏情况下，整个树是非平衡的，每个节点都只有一个子节点，完全变为单链表的形态，此时树的高度是n，因此栈的空间开销是O(n)，但在
// 最好情况下，树是完全平衡的，高度为logn，在这种情况下空间复杂度只有O(logn)。

// 代码
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
 * @param {number} targetSum
 * @return {boolean}
 */
// 本题难点：如何判断到叶子节点
// 从0开始计数，每到一层让preSum + root.val带入下一层去计算
var hasPathSum = function(root, targetSum) {
  var dfs = function(root, preSum) {
    if (root === null) {
      // 由于树是空的，所以不存在根节点到叶子节点的路径。
      return false;
    }
    // 叶子节点
    if (root.left === null && root.right === null) {
      return root.val + preSum === targetSum;
    }
    return dfs(root.left, preSum + root.val) || dfs(root.right, preSum + root.val);
  }
  return dfs(root, 0);
};
// 将targetSum传进去，并做差，直到叶子节点是否与计算的值相等
var hasPathSum = function(root, targetSum) {
  // 非叶子节点或者root根节点本身就为Null返回false
  if (!root) return false;
  // 叶子节点
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}
// ------------------------------------------------------------------------------------------------------------

// 解法2 DFS迭代
// 思路
// 对于上面递归的写法，我们可以使用辅助栈将其改写成迭代的形式。改写起来也不难，只需要在函数开始执行时压栈（下图左边部分的向下箭头），函数返回时出栈(下图左边部分的向上箭头)即可。下
// 图右边部分对应的是不同阶段栈的情况，读者可以据此来编写基于栈的迭代写法。
// 见图片./05-images/05-hasPathSum-02.jpg

// 复杂度分析
// 时间复杂度：在最坏情况下，我们会访问每个节点各一次，时间复杂度为O(n)，其中n是节点个数，但是使用辅助栈来模拟函数调用栈，通常来讲速度是更快的，因为函数调用栈会有一些其他的时间开销，
// 也就是说模拟栈会使时间复杂度的常数系数更小。
// 空间复杂度：空间复杂度和解法一一致。

// 代码 迭代的方式通过栈来实现
// !!!本题难点是如何记录剩余的计算结果，并左右子树之间因为先计算左子树，后计算右子树 而不影响remain的独立性
var hasPathSum = function(root, targetSum) {
  if (!root) return false;
  // 用栈来模拟函数递归调用
  // 后入先出
  var stack = [[root, targetSum - root.val]];
  while(stack.length) {
    // 拿到栈顶的元素 node是节点，remain是计算剩下来的数
    var [node, remain] = stack.pop();
    // 需要判断node是否为叶子节点以及remain为0
    if (!node.left && !node.right && remain === 0) {
      // 找到了符合提议的路径
      return true;
    }
    // 栈 先进后出 先放右子树，再放左子树
    if (node.right) {
      stack.push([node.right, remain - node.right.val]);
    }
    if (node.left) {
      stack.push([node.left, remain - node.left.val]);
    }
  }
  return false;
}

// 5.3.2 路径总和II
// 113-pathSum
// 解法1 dfs递归
// 思路
// 如何在DFS过程中记录符合条件的路径呢？
// 可以在DFS过程中多传入一个额外的数组来保存搜索的路径。回溯时有一个需要注意的细节，那就是对路径数组进行撤销的操作，这里可以使用一个小技巧来解决，即在递归调用时使用值传递的方式传递
// 路径数组（而不是直接修改路径数组本身）。
// 另外，我们需要在递归出口加上保存符合条件路径的操作。

// 复杂度分析
//   时间复杂度：在最坏情况下，我们会访问每个节点各一次，时间复杂度为O(n)，其中n是节点个数。
//   空间复杂度：所需额外的空间和树的高度呈线性关系。在最坏情况下，整个树是非平衡的，每个节点都只有一个子节点，完全变为单链表的形态，此时树的高度是n，因此栈的空间开销是O(n)，但在
// 最好情况下，树是完全平衡的，高度为logn，在这种情况下空间复杂度只有O(logn)

// 代码
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
  var dfs = function(root, targetSum, path) {
    if (!root) return;
    var clonePath = JSON.parse(JSON.stringify(path));
    clonePath.push(root.val);
    // 叶子节点
    if (!root.left && !root.right && targetSum === root.val) {
      res.push(clonePath);
      return;
    }
    // 左子树
    dfs(root.left, targetSum - root.val, clonePath);
    // 右子树
    dfs(root.right, targetSum - root.val, clonePath);
  }
  var res = [];
  dfs(root, targetSum, []);
  return res;
};

// 改为传递字符串
var pathSum = function(root, targetSum) {
  var dfs = function(root, targetSum, path) {
    if (!root) return;
    path += `${root.val},`;
    // 叶子节点
    if (!root.left && !root.right && targetSum === root.val) {
      res.push(path.split(",").filter(s => s));
      return;
    }
    // 左子树
    dfs(root.left, targetSum - root.val, path);
    // 右子树
    dfs(root.right, targetSum - root.val, path);
  }
  var res = [];
  dfs(root, targetSum, "");
  return res;
};

// 解法2 dfs迭代 (栈的方式)
// 复杂度分析
// 　时间复杂度：在最坏情况下，会访问每个节点各一次，时间复杂度为O(n)，其中n是节点个数。
// 　空间复杂度：所需额外的空间和树的高度呈线性关系。在最坏情况下，整个树是非平衡的，每个节点都只有一个子节点，完全变为单链表的形态，此时树的高度是n，因此栈的空间开销是O(n)，但在
// 最好情况下，树是完全平衡的，高度为logn，在这种情况下空间复杂度只有O(logn)。
var pathSum = function(root, targetSum) {
  var res = [];
  if (!root) return res;
  // 将root进栈
  var stack = [[root, targetSum - root.val, [root.val]]];
  while(stack.length) {
    // 从栈头取出来一个节点
    var [node, remain, path] = stack.pop();
    var clonePath = JSON.parse(JSON.stringify(path));
    // 如果是子节点
    if (!node.left && !node.right && remain === 0) {
      res.push(clonePath);
    }
    // 先右后左，出栈：先左后右
    if (node.right) {
      stack.push([node.right, remain - node.right.val, [...clonePath, node.right.val]]);
    }
    if (node.left) {
      stack.push([node.left, remain - node.left.val, [...clonePath, node.left.val]]);
    }
  }
  return res;
}

// 5.3.3 二叉树中的最大路径和
// 124-maxPathSum
// 思路：递归（后序遍历）
// 首先考虑实现一个简化的maxGain(node)，该函数计算二叉树中的一个节点的最大贡献值，具体来说，就是以该节点为根节点的子树中寻找以该节点
// 为起点的一条路径，使得路径上的节点值之和最大。
//    1
//  2  3 以1为例，既然是贡献那肯定不能 213都带上，只能说 1->2->xxx  1->3->xxx 两条子树只能选一条，不然1上面的就通不上面的了
// 具体而言，该函数的计算如下。
// ·空节点的最大贡献值等于0。
// ·非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和（对于叶子节点而言，最大贡献值等于节点值）。

// 因此，对根节点调用函数 maxGain，即可得到每个节点的最大贡献值。
// 根据函数 maxGain 得到每个节点的最大贡献值之后，如何得到二叉树的最大路径和？对于二叉树中的一个节点，该节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值，
// 如果子节点的最大贡献值为正，则计入该节点的最大路径和，否则不计入该节点的最大路径和。
// 维护一个全局变量 maxSum 存储最大路径和，在递归过程中更新 maxSum 的值，最后得到的 maxSum 的值即为二叉树中的最大路径和。

// 复杂度分析
// 时间复杂度：因为寻找的是最大路径和，所以我们会访问每个节点各一次，因此时间复杂度为O(n)，其中n是节点个数
// 空间复杂度：所需额外的空间和树的高度呈线性关系。在最坏情况下，整个树是非平衡的，每个节点都只有一个子节点，完全变为单链表的形态，此时树的高度是n，因此栈的空间开销是O(n)，但在
//   最好情况下，树是完全平衡的，高度为logn，在这种情况下空间复杂度只有O(logn)。
// mG: 最大贡献值，mV: 以当前节点为根节点的最大路径和（如果左右子树的最大贡献值为正数，肯定是 node.val+maxGleft+maxGright）
// 下面例子处理顺序 9->15->7->20->(-10)
//                   -10(25,42)
//    9(mG:9,mV:9)         20(35,42)
//                 15(15,15)      7(7,15)   

// 代码
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
 * @return {number}
 */
// 个人思路：采用后序遍历，左右根，
// 后序遍历：postOrderTraversal
// 前序遍历: preOrderTraversal
// 中序遍历：inOrderTraversal
var maxPathSum = function(root) {
  // 后序遍历函数，贡献值函数
  var maxGain = function(node) {
    // 空节点返回0
    if (!node) return 0;
    // 获取左右子树的最大贡献值
    var leftGain = Math.max(maxGain(node.left), 0);
    var rightGain = Math.max(maxGain(node.right), 0);
    //  1
    // 2 3 以1为根节点为例子，我们计算最大路径，从2->1->3是可以组成最大路径的，是以1为根节点当前的最大路径和，然后每个节点都可以这样计算然后计算谁最大Math.max(cur, old)。
    // 如果1是其他的子树，可以将以1为根节点的贡献值传上去（贡献值：1+Math.max(2,3)，如果1+2+3那么路径就只能是2->1->3，1上面的是走不上去的）
    var priceNewPath = node.val + leftGain + rightGain;
    maxPath = Math.max(maxPath, priceNewPath);
    console.log(node.val, node.val + Math.max(leftGain, rightGain), maxPath);
    return node.val + Math.max(leftGain, rightGain);
  }
  // 定义maxPath初始值为负无穷大，因为root的节点可能有负数
  var maxPath = -Infinity;
  maxGain(root);
  return maxPath;
};

// 5.4
// 岛屿问题(解决方式dfs、bfs、并查集)
// 力扣（LeetCode）中有几道题目都带着“岛屿”字眼，并且解题思路相似，因此我们将其简称为岛屿问题，这类题目同样是典型的可以用DFS和BFS来解决的题目。从数学层面来讲，本节的题目都可以转
// 化为无向图的连通分量问题，也就是等价类问题。连通分量可以简单地理解为该分量内部任意点之间都是可以相互连通的（如果想要详细了解等价类问题，可以自行搜索）。

// 5.4.1 岛屿数量
// 200-numIslands
// 分析
// 题目要求计算岛屿的数量。岛的定义告诉我们岛的内部点与点之间都是相互连通的，因此，一个岛其实就是一个由点构成的无向连通子图。而求岛屿的数量，就是求整个无向图（这里将二维网格当成一
// 个大的无向图）中的连通分量个数。当我们遇到图论中求连通分量的个数时，基本都可以使用DFS、BFS或并查集（union-find）方法来解决。下面就让我们来慢慢熟悉这一类题目的“套路”吧。

// 解法一 DFS递归
// 思路
// 线性扫描整个二维网格，找到第一个1，然后以该节点为开始节点来启动深度优先遍历。在深度优先遍历的过程中，将每个访问过的节点标记为0。那么，在整个线性扫描过程当中，启动深度优先遍历方法
// 的次数就是岛屿的数量。深度优先遍历的思路是沿着一个方向一直走，直到走到尽头，再尝试往其他方向搜索。对于本题而言，有4个方向：上、下、左、右。如果被访问节点的各个方向都搜索过了，则回
// 溯到上一个节点。
// 向4个方向延伸的代码如下。
// r: 行，c: 列
// function dfs(r, c) {
//   // 原地标记已经访问过了，防止重复访问
//   grid[r][c] = '0';
//   // 向下延伸
//   if (r - 1 >= 0 && grid[r - 1][c] === '1') {
//     dfs(r - 1, c);
//   }
//   // 向上延伸
//   if (r + 1 < m && grid[r + 1][c] === '1') {
//     dfs(r + 1, c);
//   }
//   // 向左延伸
//   if (c - 1 >= 0 && grid[r][c - 1] === '1') {
//     dfs(r, c - 1);
//   }
//   // 向右延伸
//   if (c + 1 < n && grid[r][c + 1] === '1') {
//     dfs(r, c + 1);
//   }
// }
// 理解了上面的内容，最终代码就不难写出来了，如下所示。
// 复杂度分析
// 时间复杂度：在任何情况下，算法都会搜索整个二维网格，因此时间复杂度为O(mn)。
// 空间复杂度：在最坏情况下，整个网格均为陆地，此时深度优先遍历的深度达到mn，也就对应着最坏空间复杂度为O(mn)。
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  var ans = 0;
  // 找到总行、列
  var m = grid.length, n = grid[0].length;
  // 深度优先函数
  var dfs = function(r, c) {
    // 原地标记已经访问过了，防止重复访问
    grid[r][c] = '0';
    // 向下延伸
    if (r - 1 >= 0 && grid[r - 1][c] === '1') {
      dfs(r - 1, c);
    }
    // 向上延伸
    if (r + 1 < m && grid[r + 1][c] === '1') {
      dfs(r + 1, c);
    }
    // 向左延伸
    if (c - 1 >= 0 && grid[r][c - 1] === '1') {
      dfs(r, c - 1);
    }
    // 向右延伸
    if (c + 1 < n && grid[r][c + 1] === '1') {
      dfs(r, c + 1);
    }
  }
  // 遍历二维数组的所有元素，当遇到有1的将他原地改为0，防止重复判断，
  // 然后对这个1进行深度优先遍历 找他的上下左右四个方向的为1的继续进行深度优先遍历
  // 最后进行回溯，回溯完 再次从循环体内发现有1的说明又遇到了一次岛屿
  for(var i = 0; i < m; i++) {
    for(var j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        // 遇到一个陆地说明岛屿数+1
        ans += 1;
        // 将陆地的上、下、左、右是1的变为0，然后再进行dfs，回溯，dfs
        dfs(i, j);
      }
    }
  }
  return ans;
};

// 解法二 DFS迭代
// 同样地，可以使用辅助栈将递归修改成迭代的形式。
// 复杂度分析
// 时间复杂度：在任何情况下，算法都会搜索整个二维网格，因此时间复杂度为O(mn)。
// 空间复杂度：在最坏情况下，整个网格均为陆地，此时深度优先遍历的深度达到mn，也就对应着最坏空间复杂度为O(mn)，但是相对于解法一来讲，会稍微好一些，因为模拟调用栈比函数调用栈的代
// 价更小一些。
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  var ans = 0;
  var m = grid.length, n = grid[0].length;
  // 用迭代替代递归
  var dfs = function(r, c) {
    // 辅助栈
    var stack = [[r, c]];
    while(stack.length) {
      // 从栈顶取出元素，
      var [row, col] = stack.pop();
      // 有可能被修改过
      if (grid[row][col] = '1') {
        // 将node原地标记为水
        grid[row][col] = '0';
      }
      // 右、左、上、下的顺序入栈，下上左右的顺序出栈
      // 但是这个栈的顺序并不是很重要在这个问题里
      if (col + 1 < n && grid[row][col + 1] === '1') {
        stack.push([row, col + 1]);
      }
      // 左
      if (col - 1 >= 0 && grid[row][col - 1] === '1') {
        stack.push([row, col - 1]);
      }
      // 上
      if (row + 1 < m && grid[row + 1][col] === '1') {
        stack.push([row + 1, col]);
      }
      // 下
      if (row - 1 >= 0 && grid[row - 1][col] === '1') {
        stack.push([row - 1, col]);
      }
    }
  }
  // 对每个元素进行dfs
  for(var i = 0; i < m; i++) {
    for(var j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        ans += 1;
        dfs(i, j);
      }
    }
  }
  return ans;
}

// 解法三 BFS迭代
// 思路
// 同样地，我们可以使用广度优先遍历来解决该题，广度优先遍历通常需要辅助的队列。思路是线性扫描整个二维网格，如果一个节点
// 中包含1，则以该节点为开始节点启动广度优先遍历。而启动广度优先遍历的次数就是岛屿的数量。
// 具体算法如下。
// 1.首先，将开始节点放入该队列中，然后迭代搜索队列中的每个节点。
// 2.在迭代过程中，将当前节点符合要求的子节点放入队列中，访问完当前节点后，将该节点从队列中抛出。
// 3.重复上述过程直到队列为空时结束。这里同样通过将1设为0来标记已访问过该节点。
// 复杂度分析
// 时间复杂度：在任何情况下，算法都会搜索整个二维网格，因此时间复杂度为O(mn)。
// 空间复杂度：在最坏情况下，整个网格均为陆地，此时队列的大小可以达到min(m,n)，也就对应着最坏空间复杂度为O(min(m,n))。
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  // 行、列
  var m = grid.length, n = grid[0].length;
  var ans = 0;
  var queue = [];
  for(var i = 0; i < m; i++) {
    for(var j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        // 每一次进来岛屿数量+1
        ans += 1;
        // 遇到大陆，将大陆放到队列里，然后检查大陆上下左右是否有大陆，有就放入到队列里
        queue.push([i, j]);
        while(queue.length) { 
          // 取出队列里的元素，将陆地变为海洋
          var [r, c] = queue.pop();
          grid[r][c] = '0';
          // 下
          if (r - 1 >= 0 && grid[r - 1][c] === '1') {
            queue.push([r - 1, c]);
          }
          // 上
          if (r + 1 < m && grid[r + 1][c] === '1') {
            queue.push([r + 1, c]);
          }
          // 左
          if (c - 1 >= 0 && grid[r][c - 1] === '1') {
            queue.push([r, c - 1]);
          }
          // 右
          if (c + 1 < n && grid[r][c + 1] === '1') {
            queue.push([r, c + 1]);
          }
        }
      }
    }
  }
  return ans;
}

// 解法四 并查集
// 思路
// 同样地，我们也可以使用并查集代替搜索。
// 为了求出岛屿的数量，我们可以扫描整个二维网格。如果一个位置为 1，则将其与相邻四个方向上的 1 在并查集中进行合并。
// 最终岛屿的数量就是并查集中连通分量的数目。
// 复杂度分析
// 时间复杂度：在任何情况下，算法都会搜索整个二维网格，因此时间复杂度为O(mn)。
// 空间复杂度：O(mn)，这是并查集数据结构需要的空间。
class UF {
  constructor(n) {
    // n: 5 => [0,1,2,3,4]
    this.parent = new Array(n).fill(0).map((_, i) => i);
    // 数的个数
    this.count = n;
  }

  // 将节点 p 和节点 q 连通
  union(p, q) {
    const { find, parent, count } = this;
    const rootP = find(p);
    const rootQ = fin(q);
    // 已经是连通状态
    if (rootP === rootQ) return;
    // 将p挂在q下，但无所谓，下次find的时候会拍平整个树
    parent[rootP] = rootQ;
    // 两个连通分量合并成一个连通分量
    count--;
  }

  // 判断节点 p 和节点 q 是否连通
  connected(p, q) {
    const { find } = this;
    const rootP = find(p);
    const rootQ = find(q);
    return rootP === rootQ;
  }

  // 常规思维、需要将小的树接到大的数下面，这里不再过多阐述
  /* 返回某个节点 x 的根节点 */
  // find(x) {
  //   // 根节点的 parent[x] == x
  //   while (parent[x] != x)
  //     x = parent[x];
  //   return x;
  // }
  // 不完全拍平
  // 0->1->2->3->4 => 
  // 0->2 1->2 3->4 2->4
  // find(x) {
  //   while (parent[x] != x) {
  //     // 这行代码进行路径压缩
  //     parent[x] = parent[parent[x]];
  //     x = parent[x];
  //   }
  //   return x;
  // }
  // find利用此种递归会将一颗树完全拍平
  find(x) {
    const { find, parent } = this;
    if (x !== parent[x]) {
      // 每一次都将parent[x]赋值为最终的结果，拍平的核心
      // 0->1->2->3 => 0->3 1->3 2->3
      parent[x] = find(parent[x]);
    }
    return parent[x]
  }

  // 返回图中的连通分量个数
  _count() {
    return this.count;
  }
}

// 二维数组的uf
class UF2 {
  // grid为二维数组
  constructor(grid) {
    // m行、n列
    const m = grid.length, n = grid[0].length;
    this.count = 0;
    this.parent = new Array(m * n).fill(0);
    for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
        // 比如
        // 1 1 1
        // 0 1 0
        // 1 0 0
        // 1 0 1
        // => parent: [0, 1, 2, 0, 4, 0, 6, 0, 0, 9, 0, 11]
        // 将是陆地(1)的 通过i*n+j映射到1维数组里，
        // 关键：正常我们的并查集为n, parent数组为[0,1,2,..., n-1]，这里会将陆地通过 i*n+j得出来的数字映射到parent的i*n+j下标里，看上面的例子
        // 但是[0,0]为陆地的时候，没办法只能让他变为0(i*n+j: 0 * 3 + 0)
        if (grid[i][j] === '1') {
          this.parent[i * n + j] = i * n + j;
          this.count++;
        }
      }
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // union(p, q) {
  //   const rootP = this.find(p);
  //   const rootQ = this.find(q);
  //   // if (rootP !== rootQ) {
  //   //   // 这段代码：将小树放到大树下面
  //   //   if (rank[rootx] > rank[rooty]) {
  //   //     parent[rooty] = rootx;
  //   //   } else if (rank[rootx] < rank[rooty]) {
  //   //       parent[rootx] = rooty;
  //   //   } else {
  //   //       parent[rooty] = rootx;
  //   //       rank[rootx] += 1;
  //   //   }
  //   // }
  //   // 已经是连通状态
  //   if (rootP === rootQ) return;
  //   // 将p挂在q下，但无所谓，下次find的时候会拍平整个树
  //   this.parent[rootP] = rootQ;
  //   // 两个连通分量合并成一个连通分量
  //   this.count--;
  // }
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP == rootQ)
      return;

    this.parent[rootQ] = rootP;
    // 两个连通分量合并成一个连通分量
    this.count--;
  }
}

var numIslands = function(grid) {
  const m = grid.length, n = grid[0].length;
  // 将grid二维数组变为一维度数组的并查集
  const uf = new UF2(grid);
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        // 为了保持连通性，不能在下面的四种判断中修改grid[x][y] = '0'，否则到时候会断了连通性
        // 原地修改grid[i][j]为海洋
        grid[i][j] = '0';
        // 如果i,j为陆地，检查上下左右是否有陆地的，有就连通
        if (i - 1 >= 0 && grid[i - 1][j] === '1') {
          // 将i,j i-1,j连通
          uf.union(i * n + j, (i - 1) * n + j);
        }
        if (i + 1 < m && grid[i + 1][j] === '1') {
          // 将i,j i-1,j连通
          uf.union(i * n + j, (i + 1) * n + j);
        }
        if (j - 1 >= 0 && grid[i][j - 1] === '1') {
          // 将i,j i-1,j连通
          uf.union(i * n + j, i * n + (j - 1));
        }
        if (j + 1 < n && grid[i][j + 1] === '1') {
          // 将i,j i-1,j连通
          uf.union(i * n + j, i * n + (j + 1));
        }
      }
    }
  }
  return uf.count;
}
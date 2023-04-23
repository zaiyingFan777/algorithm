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
// 岛屿问题
// 
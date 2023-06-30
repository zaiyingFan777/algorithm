// 10.动态规划
// lengthOfLIS-最长递增子序列 https://leetcode.cn/problems/longest-increasing-subsequence/
// 思路1：动态规划
// 状态：dp[i]代表以nums[i]为结尾的最长递增子序列的长度
// 转移方程：既然是递增子序列，我们只需要找到比nums[i]小的子序列，然后将nums[i]添加到子序列末尾，就可以形成一个新的递增子序列，
// 而且这个新的子序列长度加1。
// 复杂度分析
// 时间复杂度：(n^2)，其中 n 为数组 nums 的长度。动态规划的状态数为 n，计算状态 dp[i] 时，需要 O(n) 的时间遍历 dp[0…i−1] 的所有状态，所以总时间复杂度为 O(n^2)。
// 空间复杂度：O(n)，需要额外使用长度为 n 的 dp 数组。
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  var n = nums.length;
  // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
  // base case，定义dp数组，默认都为1，因为至少包含自身长度为1
  var dp = new Array(n).fill(1);
  // 结果值
  var res = 1;
  // 外层循环：给dp[i]赋值
  for (var i = 0; i < n; i++) {
    // 内层循环：找出比nums[i]小的子序列
    for (var j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 找到比nums[i]小的子序列，然后将nums[i]添加到子序列末尾，就可以形成一个新的递增子序列，
        // 而且这个新的子序列长度加1。
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(dp[i], res);
  }
  return res;
}


// 动态规划与回溯法
/**
 * !!!动态规划往往用来处理最优解问题，而回溯法往往用来计算所有的可能组合。和回溯法类似，动态规划的基础也是穷举所有可能，难点在于如何尽可能地减少重叠子问题的计算。
 * 
 * 例如背包问题。给定N个不同重量的物品，每一个物品的重量用一个数组weight维护，其中weight[i]表示第i个物品的重量，profit[i]表示第i个物品的价值，
 * 我们需要在不分割物品的情况下将其装入一个容量为V的背包里。求背包可以装的物品的最大值。
 * 
 * 如果用回溯法的话，会是什么样的呢？这里用伪代码让大家来感受一下。
 */

// function f(i, remain) {
//   // 装满了
//   if (i === n || remain === 0) return;
//   if (V - remain > ans) ans = V - remain;
//   // 不装
//   f(i + 1, remain);
//   // 还有空位
//   if (weight[i] <= remain) {
//     // 装
//     f(i + 1, remain - weight[i]);
//   }
// }
// f(0, V);

// 这种回溯的方法在穷举过程中会有很多重复情况，时间复杂度是指数级别的。
// 说明：回溯法的优化点往往在于剪枝，可以避免走进根本不可能为结果的分支。

// 那么上面的问题使用动态规划求解的话，该如何穷举所有可能呢？伪代码如下。
// for i in 0 to N:
//   for j in 1 to V + 1:
//     # 装满了
//     if j < weight[i]:
//       dp[i][j] = dp[i-1][j]
//     # 还有空位
//     else:
//       dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + weight[i])

// 可以看出，动态规划相比较而言显得更“聪明”一些，它可以巧妙地利用之前计算的结果集动态推导当前解，求解的时间复杂度是O(NV)。

// 与回溯法的暴力枚举不同，这种枚举法是没有重复的，即上面代码产生的所有(i,j)的组合没有相重复的。这种不重复建立在巧妙地利
// 用之前计算过的结果集上，然而想用之前计算过的结果集，就需要对问题进行分解，因此动态规划都会涉及对原问题进行分解的过程。大
// 致上，若要解决一个给定问题，我们需要解决其各个部分（即子问题），再根据子问题的解得出原问题的解。

// !!!动态规划的核心

// 解决动态规划问题的核心在于找到状态转移方程和处理边界条件。这两者中更为困难的当然是状态转移方程了，看出了状态转移方程，解题就是水到渠成的事情了。对于某一道动态规划题目来说，状
// 态转移方程可能不止一种，不同的状态转移方程对应不同的解法，而不同的转移方程的性能差别可能是巨大的，比如经典的第887题的鸡蛋掉落问题。
// 那么如何找到状态转移方程呢？我们从画表格开始讲起。有经验的读者可能知道，很多动态规划问题都可以通过画表格来理解。这是为什么呢？

// 所谓的表格就是记录状态的数组，我们称之为dp数组，它可能是一维的，可能是二维的，也可能是三维的，但更高维度就很少见了。而表格就是dp数组的形象化表示。有的人不知道为什么动态规划要画
// 表格，就觉得这个是必需的，必须要画表格才是动态规划，这是不对的。实际上爬楼梯问题就可以不用画表格来实现，而是需要借助两个额外的变量。但前提是你要对画表格很熟悉，并掌握了一定的优化技
// 巧，而这个技巧在这里指的是滚动数组，后面还会详细介绍。

// 其实正如前面所说，动态规划本质上是将大问题转化为小问题，并且大问题的解和小问题是有关联的，换句话说大问题的解可以由小问题的解计算得到。

// 从根本上说，画表格的目的是不断推导，完成状态转移，表格中的每一个格子都是一个小问题，填表的过程其实就是解决小问题的过程。先解决寻常规模的情况，然后根据这个结果逐步推导，在通常情
// 况下，表格的右下角是问题的最大的规模，也就是我们想要求解的规模，但这并不是绝对的，有时候是右上角，有时候也会是所有格子中的某一个。

// 还是以上面的背包问题为例，其实就是不断在状态之间做选择（装还是不装），选择的标准就是看哪种选择带来的价值更大，因此我们要做的就是对于选择和不选择两种情况分别求值，然后取最大
// 者，最后更新格子即可。

// 其实大部分的动态规划问题都是“选择”和“不选择”的问题，也就是一个选择题。并且大多数动态规划题目还伴随着空间上的优化，这是动态规划优于传统的记忆化递归的地方。除了这点，动态规
// 划还可以减少递归产生的函数调用栈，因此在性能上也更好。

// 理论往往比较抽象，下面通过几道具体的题目来消化一下上面的知识。

/**
 * 10.0  0-1 背包问题
 * 题目描述: 
 * 给你一个可装载重量为W的背包和N个物品，每个物品有重量和价值两个属性。其中第i个物品的重量为wt[i]，价值为val[i]，现在让你用这个背包装物品，最多能装的价值是多少？
 * 举个简单的例子，输入如下：
 * N = 3, W = 4
 * wt = [2, 1, 3]
 * val = [4, 2, 3]
 * 算法返回 6，选择前两件物品装进背包，总重量 3 小于W，可以获得最大价值 6。
 * 题目就是这么简单，一个典型的动态规划问题。这个题目中的物品不可以分割，要么装进包里，要么不装，不能说切成两块装一半。这也许就是 0-1 背包这个名词的来历。
 */

/**
 * 思路
 * 对于动态规划，我们首先要考虑的是状态与选择
 * 状态：有两个，1.可选择的物品2.背包的容量
 * 选择：将物品装入背包/不装入背包
 * dp[n][w]含义：对于前n个物品，容量为w的情况下，可以装的最大价值
 * base case: dp[0][...] = 0，当物品可选择的为0时，价值为0，dp[...][0]当容量为0时，价值为0
 */
function knapsack(W, N, wt, val) {
  // 初始化dp以及base case
  var dp = new Array(N+1).fill(null).map(_ => new Array(W+1).fill(0));
  for(var n = 1; n <= N; n++) {
    for(var w = 1; w <= W; w++) {
      // 需要判断能否装下去
      // 这里n是从1开始的，我们需要减去1
      if (w - wt[n-1] < 0) { // wt[n-1] > w
        // 装不下去
        dp[n][w] = dp[n-1][w];
      } else {
        // 能装下去，做选择，装还是不装
        // dp[n-1][w]代表不装
        // dp[n-1][w-wt[n-1]] + val[n-1] 代表装(寻求剩余重量w-wt[n-1]限制下能装的最大价值，加上第i个物品的价值val[i-1])
        dp[n][w] = Math.max(dp[n-1][w], dp[n-1][w-wt[n-1]] + val[n-1]);
      }
    }
  }
  return dp[N][W];
}

/**
 * 10.1 爬楼梯(https://leetcode.cn/problems/climbing-stairs/)
 * 解法一 动态规划
 * 对初学者来说，较为抽象、无法直接描述的算法一般是学习的难点，需要更长的时间去消化和理解，例如初次接触递归，以及更难的动态规划。
 * 针对这些算法的学习，简单且经典的题目将是不可多得的宝贵资料。爬楼梯就是一道经典的题目。
 * 思路(labuladong)
 * 状态：表示为上第 n 层台阶时所需要的跳法
 * 选择：你可以从dp[n-1]或者dp[n-2]跳上来，所以取和
 * dp[n]：代表上第n个台阶有多少种跳法
 * base case: dp[0] = 1，dp[1] = 1，因为到第0层也就是不动这种方法，到第一层就是需要跳1层就这一种方法
 * 
 * 复杂度分析
 * 时间复杂度：O(n)，n为台阶数。
 * 空间复杂度：O(n)，n为台阶数。
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  var dp = new Array(n+1).fill(0);
  dp[0] = dp[1] = 1;
  for(var i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
};

/**
 * 解法二 动态规划优化
 * 这里优化的是空间上的优化
 * 复杂度分析
 * 时间复杂度：O(n)，n为台阶数
 * 空间复杂度：O(1)
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  var dp_i_1 = 1, dp_i_2 = 1;
  for(var i = 2; i <= n; i++) {
    var sum = dp_i_1 + dp_i_2;
    dp_i_1 = dp_i_2;
    dp_i_2 = sum;
  }
  return dp_i_2;
}

// 10.2 打家劫舍系列
// 打家劫舍系列在力扣（LeetCode）中总共有3道题，分别如下。
// 1.第198题打家劫舍，难度级别为中等。
// 2.第213题打家劫舍II，难度级别为中等。
// 3.第337题打家劫舍III，难度级别为中等。

// 10.2.1 打家劫舍(198: https://leetcode.cn/problems/house-robber/)

/**
 * 思路 动态规划：解决动态规划问题就是找「状态」和「选择」
 * 状态：你面前房子的索引就是状态
 * 选择：从左到右走过这一排房子，在每间房子前都有两种选择，抢或者不抢
 * 分析：1.如果你抢了这间房子，那么肯定不能抢相邻的下一间房子了，只能从下下间房子开始做选择，2.如果你不抢这间房子，那么你可以走到下一间房子前，继续做选择
 * base case: 当你走过了最后一间房子后，你就没得抢了，能抢到的钱显然是0
 *                1.这间房子不抢，到下一间房子前继续做选择 rob(nums[3..])
 * rob(nums[2..])
 *                2.这间房子抢，到下下间房子继续做选择，nums[2] + rob(nums[4..])
 */

// 代码1 自顶向下的动态规划（超时）
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var dp = function(nums, i) {
    // base case，走过最后一间房子了能抢到的钱为0 这里还是写大于等于0把，因为如果当前房间为最后一个房间，
    // 然后i+1已经是i===num.length，i+2就>nums.length了
    if (i >= nums.length) return 0;
    // 1.当前的不抢，从下间开始做选择
    // 2.当前的抢，然后下下间再去做选择
    return Math.max(dp(nums, i+1), nums[i] + dp(nums, i+2));
  }
  return dp(nums, 0);
};

// 明确了状态转移，就可以发现对于同一start位置，是存在重叠子问题的，比如下图
// 代码2 用备忘录消除重叠子问题
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var dp = function(nums, i) {
    // base case，走过最后一间房子了能抢到的钱为0 这里还是写大于等于0把，因为如果当前房间为最后一个房间，
    // 然后i+1已经是i===num.length，i+2就>nums.length了
    if (i >= nums.length) return 0;

    // 检查备忘录
    if (memo[i] !== -1) return memo[i];

    // 1.当前的不抢，从下间开始做选择
    // 2.当前的抢，然后下下间再去做选择
    var res = Math.max(dp(nums, i+1), nums[i] + dp(nums, i+2));
    memo[i] = res;
    return memo[i];
  }
  // 创建备忘录
  var memo = new Array(nums.length).fill(-1);
  return dp(nums, 0);
};

// 代码3
// 自底向上的解法，定义dp数组，因为base case为i >= nums.length能抢的钱为0，
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var n = nums.length;
  // dp数组，dp[i]代表从第i间房子到最后一间房能抢的最多的钱是多少(从第 i 间房子开始抢劫，最多能抢到的钱为 x)
  // 这里dp数组的长度为何为n+2，如果是在最后一间房子，面临两种选择1.抢这间房子然后n不能抢，只能去n+1 2.不抢这间去n再去做决定
  // base case i >= nums.length能抢的钱为0
  var dp = new Array(n + 2).fill(0);
  for(var i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(
      nums[i] + dp[i + 2], // 这间房子抢，然后去下下间做决策
      dp[i + 1], // 这间房子不抢，去下间房子做决策
    );
  }
  return dp[0];
}

// 代码4
// 从代码3可以看出，我们的状态只跟dp_i+1与dp_i+2有关系，所以我们可以省去空间上的开销，将时间复杂度降低到O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var n = nums.length;
  // 记录dp[i+1], dp[i+2]
  var dp_i_1 = 0, dp_i_2 = 0;
  for(var i = n - 1; i >= 0; i--) {
    var dp_i = Math.max(
      nums[i] + dp_i_2, // 抢这间
      dp_i_1, // 不抢这间
    ) 
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i;
  }
  return dp_i_1;
}

// 10.2.2 打家劫舍II (213: https://leetcode.cn/problems/house-robber-ii/)
/**
 * 这道题目和第一道描述基本一样，强盗依然不能抢劫相邻的房子，输入依然是一个数组，但是告诉你这些房子不是一排，而是围成了一个圈。
 * 也就是说，现在第一间房子和最后一间房子也相当于是相邻的，不能同时抢。比如说输入数组nums=[2,3,2]，算法返回的结果应该是 3 而不是 4，因为开头和结尾不能同时被抢。
 * 这个约束条件看起来应该不难解决，我们 单调栈 Monotonic Stack 的使用 说过一种解决环形数组的方案，那么在这个问题上怎么处理呢？
 * 首先，首尾房间不能同时被抢，那么只可能有三种不同情况：要么都不被抢；要么第一间房子被抢最后一间不抢；要么最后一间房子被抢第一间不抢。
 * 
 * 见图片 ./10-images/10-2-2-rob-1.jpg
 * 
 * 那就简单了啊，这三种情况，哪种的结果最大，就是最终答案呗！不过，其实我们不需要比较三种情况，只要比较情况二和情况三就行了，因为这两种情况对于房子的选择余地比情况一大呀，
 * 房子里的钱数都是非负数，所以选择余地大，最优决策结果肯定不会小。
 * 
 * 所以只需对之前的解法稍作修改即可：
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  var n = nums.length;
  if (n === 1) return nums[0];
  var helper = function(nums, start, end) {
    var dp_i_1 = 0, dp_i_2 = 0;
    var dp_i = 0;
    for(var i = end; i >= start; i--) {
      dp_i = Math.max(
        nums[i] + dp_i_2, // 抢这一间，从下下间再做决策
        dp_i_1, // 不抢这一间，从下间做决策
      );
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
    }
    return dp_i;
  }
  // 三种情况：1.含头不包含尾 2.含尾不包含头 3.不包含头不包含尾
  // 1 2 是包含3的，因此我们只需要比较1 2 情况即可
  return Math.max(
    helper(nums, 0, n - 2), // 含头不包含尾
    helper(nums, 1, n - 1), // 含尾不包含头
  )
};

// 10.2.3 打家劫舍III (337: https://leetcode.cn/problems/house-robber-iii/)
// 337. 打家劫舍 III
// 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
// 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。
// 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
// 示例 1:
//      3(偷)
//      /  \
//     2   3
//      \   \
//     3(偷) 1(偷)
// 输入: root = [3,2,3,null,3,null,1]
// 输出: 7 
// 解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7

// 示例 2:
//       3
//     /  \
//  4(偷)  5(偷)
//  / \     \ 
// 1  3      1
// 输入: root = [3,4,5,1,3,null,1]
// 输出: 9
// 解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9


// 第三题又想法设法地变花样了，此强盗发现现在面对的房子不是一排，不是一圈，而是一棵二叉树！房子在二叉树的节点上，相连的两个房子不能同时被抢劫：
// 整体的思路完全没变，还是做抢或者不抢的选择，取收益较大的选择。甚至我们可以直接按这个套路写出代码：

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
var rob = function(root) {
  // 初始化备忘录
  var memo = new Map();
  // dp(node)代表从Node到子节点能抢的最大钱数
  var dp = function(node) {
    // base case 空节点返回0
    if (node === null) {
      return 0;
    }
    // 检查备忘录
    if (memo.has(node)) {
      return memo.get(node);
    }
    // 偷这一层，然后去下下层
    var doIt = node.val 
      + (node.left === null ? 0 : (dp(node.left.left) + dp(node.left.right)))
      + (node.right === null ? 0 : (dp(node.right.left) + dp(node.right.right)));
    // 不偷这一层，然后去下层做决定
    var notDo = dp(node.left) + dp(node.right);
    // 选择偷与不偷这层的最大值
    var res = Math.max(doIt, notDo);
    // 设置备忘录
    memo.set(node, res);
    return res;
  }
  return dp(root);
};

// 这道题就解决了，时间复杂度 O(N)，N为数的节点数。
// 但是这道题让我觉得巧妙的点在于，还有更漂亮的解法。
// 时间复杂度 O(N)，空间复杂度只有递归函数堆栈所需的空间，不需要备忘录的额外空间。
// 你看他和我们的思路不一样，修改了递归函数的定义，略微修改了思路，使得逻辑自洽，依然得到了正确的答案，而且代码更漂亮。这就是我们前文 动态规划：不同的定义产生不同的解法 所说过的动态规划问题的一个特性。
// 实际上，这个解法比我们的解法运行时间要快得多，虽然算法分析层面时间复杂度是相同的。原因在于此解法没有使用额外的备忘录，减少了数据操作的复杂性，所以实际运行效率会快。
// 这样，打家劫舍系列问题就全部解决了，其实也没多难吧？
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
var rob = function(root) {
  // 返回值为一个数组arr，arr[0]为不抢当前节点的最大值，arr[1]为抢当前节点的最大值。
  var dp = function(node) {
    // base case
    if (node === null) return [0, 0];
    // 左右子树的能抢的最大值
    var left = dp(node.left);
    var right = dp(node.right);
    // 抢本层，下一层就不抢 因此选择arr[0]
    var doIt = node.val + left[0] + right[0];
    // 不抢本层，下层可能会抢，可能不会被抢，所以选择其中较大的值
    var notDo = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return [notDo, doIt];
  }
  var res = dp(root);
  return Math.max(res[0], res[1]);  
} 

// 10.3 不同路径(62. 不同路径 https://leetcode.cn/problems/unique-paths/)
/**
 * 解法1：动态规划
 * 状态：dp[i][j]代表从开头到(i,j)有多少种路径
 * 选择：你可以从dp[i-1][j](上到下)或者dp[i][j-1](左到右)这两种方式到可以到，所以选择这两个方式的总和
 * dp[i][j]: dp[i][j]代表从开头到(i,j)有多少种路径
 * base case dp[1][1]为何为1？初始条件为 f(0,0)=1，即从左上角走到左上角有一种方法
 * dp[0][..]为0，dp[..][0]为0，因为不存在这样的路径，这些路径都在网格外了
 */

// 复杂度分析
// 时间复杂度：O(mn)。
// 空间复杂度：O(mn)。

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  var dp = new Array(m+1).fill(null).map(_ => new Array(n+1).fill(0));
  // base case：dp[1][1]为1，
  dp[1][1] = 1;
  for(var i = 1; i <= m; i++) {
    for(var j = 1; j <= n; j++) {
      if (i == 1 && j === 1) continue;
      // 你可以从dp[i-1][j](上到下)或者dp[i][j-1](左到右)这两种方式到可以到，所以选择这两个方式的总和
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  return dp[m][n];
};

// base case: dp[1][..]都为1，dp[..][1]都为1，因为：从本格到本格只有1中路径可走
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
  var dp = new Array(m+1).fill(null).map(_ => new Array(n+1).fill(0));
  // base case：dp[1][..]都为1，dp[..][1]都为1
  // 因为从satrt横向跳跟纵想跳 都只有一种跳法
  // dp[1][..]
  for(var i = 1; i <= n; i++) {
    dp[1][i] = 1;
  }
  // dp[..][1]
  for(var j = 1; j <= m; j++) {
    dp[j][1] = 1;
  }
  for(var i = 2; i <= m; i++) {
    for(var j = 2; j <= n; j++) {
      // 你可以从dp[i-1][j](上到下)或者dp[i][j-1](左到右)这两种方式到可以到，所以选择这两个方式的总和
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  return dp[m][n];
};

/**
 * 解法2：优化动态规划空间
 * 状态：dp[i]从开头到(i)有多少种路径
 * 选择：你可以从dp[i-1](上到下)或者dp[i](左到右)这两种方式到可以到，所以选择这两个方式的总和
 * 复杂度分析
 * 时间复杂度：O(mn)。
 * 空间复杂度：O(n)。
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  // base case: dp[0]为0，dp[1..n]都为1，因为从start横向跳到本格只有1中跳法
  var dp = new Array(n+1).fill(1);
  // dp[0]为m * n宫格外 所以为0
  dp[0] = 0;
  // 这里循环两层，我们用一维数组压缩两维数组，因此，正常仍然是循环两层，每一层的每一格去计算，
  // 然后从上往下计算不断更新每一行每一格。
  // 因为我们计算dp[i]需要左边dp[i-1]与dp[i](上面到下面)，正好之前的dp[i]是上次计算的，然后本次dp[i] = dp[i-1]+dp[i]去更新dp[i]
  // 从2开始即可，因为每行的第1格总为1
  for(var i = 2; i <= m; i++) {
    for(var j = 2; j <= n; j++) {
      dp[j] = dp[j-1] + dp[j];
    }
  }
  return dp[n];
}

// 10.4零钱兑换
// 10.4.1 （322：https://leetcode.cn/problems/coin-change/）
/**
 * 解法1：动态规划
 * 状态：由于硬币个数是无限的，所以唯一可以改变的状态就是amount金额的变化
 * 选择：⽆论当的⽬标⾦额是多少，选择就是从⾯额列表 coins 中选择⼀个硬币，然后⽬标⾦额就会减少
 * dp[i] = x：代表当金额为i的时候，使用的最小硬币数为x
 * 
 * 复杂度分析
 * 时间复杂度：使用了双层循环求解，因此时间复杂度为O(mn)，其中n是amount的值，m为coins的种类数。
 * 空间复杂度：O(n)，其中n是amount的值。
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  // 定义dp，假设面值为1，那么需要amount个硬币，这里amount+1跟无穷大都可以，
  var dp = new Array(amount+1).fill(amount+1);
  // base case
  dp[0] = 0;
  for(var i = 1; i <= amount; i++) {
    // 遍历所有硬币
    for(var coin of coins) {
      // 当前的金额小于coin 不满足条件
      if ((i - coin) < 0) continue;
      // 满足当前金额 - 当前面值coin >= 0，选择当前的面值coin，那么dp[i]应该为1+dp[i-coin](比如当前金额i为3，当前金币为1，3-1>=0满足条件，所以dp[3]=Math.min(dp[3], 1 + dp[2]))
      // 因为选择了当前金币1，所以按数学归纳法 dp[3]的取值应为 1+dp[2]，1代表选择了当前金币1，dp[2]为金额为2的最小金币数，金币1+金额为2的最小金币数就是金额3的最小金币数
      dp[i] = Math.min(dp[i], 1 + dp[i-coin]);
    }
  }
  return (dp[amount] === amount + 1) ? -1 : dp[amount]; 
};

// 10.4.2 零钱兑换II (518: https://leetcode.cn/problems/coin-change-ii/)
// 也可以理解为完全背包问题
/**
 * 解法一：动态规划dp
 * 状态：金币、amount
 * 选择：选择当前的金币面额 或者 不选择当前的金币面额，所以为两者的和
 * dp[i][j] = x，代表若只使用前i个金币，当金额为j时，有dp[i][j]种方法可以凑够金额j
 * 若只使用coins中的前i个硬币的面值，若想凑出金额j，有dp[i][j]种凑法。
 * base case: dp[0][..]=0，当可选金币为0，无法凑出金额j，dp[..][0] = 1 当金额为0，无为而至就是唯一的凑法(不用凑也是一种方法，让我相当了跳台阶，不跳dp[0]从0层到0层不跳就是唯一的一种跳法)
 */

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  var n = coins.length;
  // 定义dp数组
  var dp = new Array(n + 1).fill(null).map(_ => new Array(amount + 1).fill(0));
  for(var i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }
  for(var i = 1; i<= n; i++) {
    for(var j = 1; j <= amount; j++) {
      // 当前面额的金币是否满足要凑的金额
      if ((j - coins[i-1]) < 0) {
        // 当前面额的j < coins[i-1]说明我们只能不使用当前的面额
        dp[i][j] = dp[i-1][j];
      } else {
        // 当前面额的金币满足需求
        // 选择：装与不装的和
        // 如果不把第i物品装进背包，不适用coins[i]这个面值的硬币，那么凑出面额j的方法为dp[i-1][j]，继承之前的结果
        // 如果把第i物品装进背包，说明你使用coins[i]这个面值的硬币，那么凑出面额j的方法为dp[i][j-coins[i-1]]
        // 这里如何去理解每个金币是无穷的呢，因为我们定义了两个状态，一个是前i个金币，一个是凑的金额j，那如何理解某个面额是可以重复选的
        // 比如dp[1][1] dp[1][2] dp[1][3] 其实这就说明当使用第一个面额去凑出金额1、2、3，
        dp[i][j] = dp[i-1][j] + dp[i][j-coins[i-1]];
      }
    }
  }
  return dp[n][amount];
};

// 备注：0-1背包变体 分割等和子集
// 416 https://leetcode.cn/problems/partition-equal-subset-sum/
/**
 * 解法：动态规划
 * 将背包问题转为分割等和子集问题，给一个可装载重量为sum/2的背包和N个物品，每个物品的重量为num[i]，现让你装物品，是否存在一种装法，能够恰好
 * 装满背包？
 * 状态：两个 物品重量 背包容量
 * 选择：装还是不装
 * dp[i][j] = boolean；对于前i个物品，容量为j时，若x为true，则说明可以恰好将背包装满，若x为false，则说明不能恰好将背包装满。
 * 比如说，如果dp[4][9] = true，其含义为：对于容量为 9 的背包，若只是用前 4 个物品，可以有一种方法把背包恰好装满。
 * base case: dp[0][..] = false，没有物品可以选择肯定装不满，dp[..][0] = true，空背包相当于装满了
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  // 将分割等和子集问题转为背包问题，对于N个物品，载重为sum/2的背包，是否存在一种装法，能够恰好装满背包
  var sum = nums.reduce((a, b) => a + b, 0);
  // 我们需要判断sum是偶数还是奇数，奇数就不能被均分
  if (sum % 2 !== 0) return false;
  // 定义dp数组
  var amount = Math.floor(sum / 2);
  var n = nums.length;
  var dp = new Array(n + 1).fill(null).map(_ => new Array(amount + 1).fill(false));
  // base case dp[0][..]没有物品可以选择肯定装不满，dp[..][0] = true 当空背包的时候肯定是可以装满的
  for(var i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  for(var i = 1; i <= n; i++) {
    for(var j = 1; j <= amount; j++) {
      // 先判断nums[i-1]是否能被j(amount)装进去
      if (j - nums[i-1] < 0) {
        // 装不进去，继承之前的结果
        dp[i][j] = dp[i-1][j];
      } else {
        // 选择：装还是不装，如果不装继承之前的结果为true，那就不装，如果装nums[i-1]为false那就没必要装
        dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]];
      }
    }
  }
  return dp[n][amount];
}
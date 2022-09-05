// 416. 分割等和子集
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

// 示例 1：
// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。

// 示例 2：
// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。
 
// 提示：

// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

// 将nums各个元素求和，得到总和sum，sum/2 然后将nums元素找到相加为sum/2的就转换为了背包问题，是否能装满sum/2
// 状态：背包的容量、可选择的物品
// 选择：装进背包还是不装进背包
// dp[i][j] = x 表示，对于前i个物品，当前背包的容量为j时，若x为true，则说明可以恰好将背包装满，若x为false，则说明不能恰好将背包装满。
// 比如说，如果dp[4][9] = true，其含义为：对于容量为 9 的背包，若只是用前 4 个物品，可以有一种方法把背包恰好装满。
// base case: 就是dp[..][0] = true和dp[0][..] = false，因为背包没有空间的时候，就相当于装满了，而当没有物品可选择的时候，肯定没办法装满背包。
// 状态转移：装还是不装，如果不把nums[i]算入子集，**或者说你不把这第i个物品装入背包**，那么是否能够恰好装满背包，取决于上一个状态dp[i-1][j]，继承之前的结果。
// 如果把nums[i]算入子集，**或者说你把这第i个物品装入了背包**，那么是否能够恰好装满背包，取决于状态dp[i - 1][j-nums[i-1]]。
// dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]];  如果不装就可以满了那就是不装，然后装了是否可以满
// 就比如 dp[i][2]的时候为true，这时候dp[i-1][5] nums[i-1]为3，我们用dp[i-1][5-3] = dp[i-1][2] 因为2的时候满了，这时候容量为5，恰好要装3的所以这时候也能装满

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  // 求和
  var sum = nums.reduce((a, b) => a + b, 0);
  // 如果sum为奇数，就不可能划分为两个和相等的集合
  if (sum % 2 !== 0) return false;
  // 将sum / 2就是要装的背包容量总数
  sum = sum / 2;
  // 定义dp数组 dp[i][j]代表对于前i个物品，当前背包的容量为j时，若x为true，则说明可以恰好将背包装满，若x为false，则说明不能恰好将背包装满。
  // base case: dp[..][0] = true当容量为0意味着已经满了，dp[0][..] = false意味着没有可以选择的物品了，肯定没有办法装满背包了
  var n = nums.length;
  var dp = new Array(n+1).fill(null).map(() => new Array(sum+1).fill(false));
  for(var i = 0; i < n+1; i++) {
    dp[i][0] = true;
  }
  for(var i = 1; i < n+1; i++) {
    for(var j = 1; j < sum+1; j++) {
      // 判断j-nums[i-1]是否小于0
      if (j - nums[i-1] < 0) {
        // 小于0说明无法再装了
        dp[i][j] = dp[i-1][j];
      } else {
        // 大于0说明装入或者不装入
        // 如果不装就可以满了那就是不装，然后装了是否可以满
        // 就比如 dp[i][2]的时候为true，这时候dp[i-1][5] nums[i-1]为3，我们用dp[i-1][5-3] = dp[i-1][2] 因为2的时候满了，这时候容量为5，恰好要装3的所以这时候也能装满
        dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i-1]]; // 因为i是从1开始的，所以要i-1
      }
    }
  }
  return dp[n][sum];
};

// 优化：dp[i][j]都是通过上一行dp[i-1][..]转移过来的，之前的数据都不会再使用了。
// 我们可以进行状态压缩，将二维dp数组压缩为一维，节约空间复杂度：
var canPartition = function(nums) {
  // 求和
  var sum = nums.reduce((a, b) => a + b, 0);
  // 如果sum为奇数，就不可能划分为两个和相等的集合
  if (sum % 2 !== 0) return false;
  // 将sum / 2就是要装的背包容量总数
  sum = sum / 2;
  var n = nums.length;
  var dp = new Array(sum+1).fill(false);
  dp[0] = true;
  for(var i = 0; i < n; i++) {
    // 为什么要从后往前遍历，因为每次i循环完毕，代表了上一层的计算结果，如果我们从前往后会修改上次的计算结果，毕竟只有一维数组
    // 所以我们从后往前遍历，这样不会修改上次的结果
    for(var j = sum; j >= 0; j--) {
      if (j - nums[i] >= 0) {
        dp[j] = dp[j] || dp[j-nums[i]]
      } else {
        dp[j] = dp[j];
      }
    }
  }
  return dp[sum];
};
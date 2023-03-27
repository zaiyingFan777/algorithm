// 01-twoSum
// 思路：空间换时间O(n)，传统思维双层循环O(n^2)、排序+双指针（但需要保存之前的下标，时间复杂度O(nlogn)）
// 空间换时间:
// 我们可以通过一个辅助的哈希表来降低时间复杂度，具体思路是：对数组进行遍历，遍历每一项时都判断target-nums[i](其中i是当前数组项的索引值)是否在之前
// 遍历中遇到过，如果是，则直接返回；如果不是，则将其放在哈希表中，然后继续遍历下一项。

// 时间复杂度：O(n)，其中n为数组长度。
// 空间复杂度：O(n)，其中n为数组长度。
var twoSum = function(nums, target) {
  var hashMap = new Map();
  for(var i = 0; i < nums.length; i++) {
    var diff = target - nums[i];
    if (hashMap.has(diff)) {
      return [hashMap.get(diff), i];
    } else {
      hashMap.set(nums[i], i);
    }
  }
  return [-1, -1];
}

// 15-threeSum
// 思路：由于这道题目要求的不再是返回索引值，因此先排序，然后使用双指针的思路是可行的。具体算法是先对原数组进行一次排序，然后一层循环固定一个元素，循环内部利用
// 双指针找出剩下的两个元素，这里要特别注意去重，上述算法除去排序部分的时间复杂度为O(n^2)，相比之下排序过程不会成为性能瓶颈。
// 时间复杂度：O(n^2)，里面的while循环仅仅扫描一遍数组
var threeSum = function(nums) {
  var n = nums.length;
  var res = [];
  // 对nums进行正序排序  O(nlogn)
  nums.sort((a, b) => a - b);
  // 遍历每个元素，然后从后面找到两个数，使其相加等于0
  // ps:这里i<n也可以
  for(var i = 0; i < n - 2; i++) { // i <= n-3，最后一个元素下标：n-1，能取三数之和必须三个数，n-1,n-2,n-3
    // 双指针
    var lo = i + 1, hi = n - 1;
    // 因为需要找到两个，所以lo不能等于hi
    while(lo < hi) {
      var left = nums[lo], right = nums[hi];
      var sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) {
        // 需要让sum变大，指针往左走
        // 这是去重操作，无论怎么样lo都会++
        while(lo < hi && nums[lo] === left) lo++;
      } else if (sum > 0) {
        // 需要让sum变小，指针往右走
        // 这是去重操作
        while(lo < hi && nums[hi] === right) hi--;
      } else if (sum === 0) {
        // 找到了
        res.push([nums[i], nums[lo], nums[hi]]);
        while(lo < hi && nums[lo] === left) lo++;
        while(lo < hi && nums[hi] === right) hi--;
      }
    }
    // 去除后面跟nums[i]相等的，避免重复
    // 当i为n-4的时候，i+1为n-3，也就是最后一个元素
    // ps:这里i<n-1也可以，对应上面的ps
    while(i < n - 3 && nums[i] === nums[i + 1]) i++;
  }
  return res;
}

// 18-fourSum
// 解法1：暴力法（超时）
// 这道题目在三数之和的基础上，数的个数又增加了一个，变成了4个，并且与上一题相比，本题的target不恒等于0。首先考虑使用暴力法来解决
// 思路
// 一个符合直觉的算法是暴力地将所有的四元组枚举出来，并判断其和是否等于target。唯一需要注意的是去重，比如[-1,0,0,1]和[0,0,-1,1]只能算一个四元组(这里我们先将最初的数组排序就不会出现这种问题了)。
// 在这里，使用了序列化数组作为key，四元组作为value的方法，将其保存到hashmap中来达到去重的目的
// 这里会用到回溯法，而回溯法的基本思路是，首先固定1个元素，然后固定第2元素……，直到全部元素（在这里是4个元素）确定下来，判断是否满足要求（在这里是不重复且和为target）。如果满足要求，则将其加入结果集；如果不满足要求，
// 则回退一步走其他分支。这种每次面临多个选择，选择其中一个走到头，之后回退到选择点继续其他选择的方法，被称为回溯法
// 时间复杂度：时间复杂度取决于组合数，由排列组合原理可知，组合数共有n(n-1)(n-2)(n-3)个，因此时间复杂度为O(n4)个，其中n为数组长度。
// 空间复杂度：由于使用了hashmap来存储所有访问过的组合，因此空间复杂度为O(n4)，其中n为数组长度。
var fourSum = function(nums, target) {
  var backtrack = function(nums, start, remain) {
    if (track.length > 4) return;
    if (track.length === 4 && remain === 0) {
      var jsonTrack = JSON.stringify(track);
      if (!hashMap.has(jsonTrack)) {
        // 没存在则添加进去
        res.push(JSON.parse(JSON.stringify(track)));
        hashMap.set(jsonTrack, true);
      }
      return;
    }
    for(var i = start; i < nums.length; i++) {
      // 将nums[i]放到track
      track.push(nums[i]);
      backtrack(nums, i + 1, remain - nums[i]);
      // 回退
      track.pop();
    }
  }
  var res = [];
  // 轨迹
  var track = [];
  // 将符合条件的四元组序列化为key，value为true存到hashMap中起到去重的作用
  var hashMap = new Map();
  // 将Nums排序方便后续去重的时候使用0
  nums.sort((a, b) => a - b);
  backtrack(nums, 0, target);
  return res;
}

// [-2,-1,0,0,1,2] 0
// 解法2：分治法
// 思路
// 可以将问题分解为若干子问题，对子问题求解后将解合并即可。具体来看，可以先将四数和four_sum分解为两数和，即twoSum(a,threeSum(A))，其中a是数组中的任意数，A是除a之外的其他数的集合；
// 接下来继续对三数和threeSum进行分解，将其分解为twoSum(b,twoSum(B))。这样就将四数和问题转化为了两数和问题，至此，使用前面讲过的两数和的解法即可解决。
// 时间复杂度：O(n3)。
// 空间复杂度：本算法的空间消耗主要由tubles、调用栈和排序算法这3块组成。和tubles的空间消耗相比，调用栈及排序算法产生的空间消耗更少，因此空间复杂度为O(n)，其中n为数组长度。
var fourSum = function (nums, target) {
  var nSumTarget = function (nums, n, start, target) {
    var tubles = [];
    // 至少是2sum。且nums的长度不应小于n(几数之和)
    if (n < 2 || nums.length < n) return tubles;
    if (n === 2) {
      // 等于2的时候双指针
      var lo = start,
        hi = nums.length - 1;
      while (lo < hi) {
        var left = nums[lo],
          right = nums[hi];
        var sum = left + right;
        if (sum < target) {
          while (lo < hi && left === nums[lo]) lo++;
        } else if (sum > target) {
          while (lo < hi && right === nums[hi]) hi--;
        } else {
          tubles.push([left, right]);
          while (lo < hi && left === nums[lo]) lo++;
          while (lo < hi && right === nums[hi]) hi--;
        }
      }
    } else {
      // 缩小规模
      for (var i = start; i < nums.length; i++) {
        var subTubles = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
        for (var subTuble of subTubles) {
          // 这里我们在nSumTarget中，定义一个tubles，因为i一直变所以会产生多个subTubles，这样，我们将nums[i]放到subTubles里的子数组里，这样就凑够了我们当前需要的长度的tuble
          // 然后再将拼接好的subTuble放到tubles。这样就不会少弄或者错弄
          subTuble.push(nums[i]);
          tubles.push(subTuble);
        }
        while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++;
      }
    }
    return tubles;
  };
  var res = [];
  // 对nums排序
  nums.sort((a, b) => a - b);
  res = nSumTarget(nums, 4, 0, target);
  return res;
};

// 454-fourSumCount
// 这是四数之和的第2个版本。这道题不再是1个数组，而是4个数组，并在每个数组中挑选一个数，使其相加等于0。
// 思路：
// 类似地，我们仍然可以固定两个元素，然后将所有的两两组合存起来，然后去寻找另外两个元素。这样的时间复杂度为O(n2)。如果你愿意的话，也可以固定1个元素然后寻找3个元素，但是这样的时间复杂度是O(n3)。
// leetcode官方讲解：
// 我们可以将四个数组分成两部分，A和B为一组，C和D为另外一组。
// 对于 A 和 B，我们使用二重循环对它们进行遍历，得到所有 A[i]+B[j] 的值并存入哈希映射中。对于哈希映射中的每个键值对，每个键表示一种 A[i]+B[j]，对应的值为 A[i]+B[j] 出现的次数
// 对于 C 和 D，我们同样使用二重循环对它们进行遍历。当遍历到 C[k]+D[l] 时，如果 −(C[k]+D[l]) 出现在哈希映射中，那么将 −(C[k]+D[l]) 对应的值累加进答案中。
// 最终即可得到满足 A[i]+B[j]+C[k]+D[l]=0 的四元组数目。
// 时间复杂度：O(n2)。
// 空间复杂度：我们使用mapper来存储A和B两两相加的结果，因此空间复杂度为O(n)，其中n为数组长度（题目限定了A、B、C、D 这4个数组长度是相同的）。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
  var res = 0;
  var mapper = new Map();
  // 两两一组，将nums1[i]+nums2[j]放到map中,nums1[i]+nums2[j]为key, count（出现的次数）为val
  for(var i of nums1) {
    for (var j of nums2) {
      mapper.set(i + j, (mapper.get(i + j) || 0) + 1);
    }
  }
  // 两两为一组，当遍历到nums3[j]+nums4[k]的时候，如果-(nums3[j]+nums4[k])在mapper中，则将-(nums3[j]+nums4[k])对应的count累加到答案中
  for(var j of nums3) {
    for (var k of nums4) {
      res += (mapper.get(-1 * (j + k)) || 0);
    } 
  }
  return res;
};

// 16-threeSumClosest
// 思路：和上面三数之和的题目描述几乎一样，唯一不同的是，这次数组中的3个数相加可能永远达不到target，这里要返回三数相加最接近target的和，
// 从数学角度说就是三数之和与target的差的绝对值最小。
// 和上面的思路一样，仍然先进行排序，然后固定1个元素，内部循环使用双指针即可。唯一不同的是判断逻辑有所不同，不再是三数之和等于target，
// 而是三数之和与target的差的绝对值最小。由于题目要求返回3个数之和，因此用一个变量res去记录3个数相加的和，如果该和与target的差的绝对值更小，就去更新res。
// 时间复杂度：和三数之和一样，时间复杂度为O(n2)。
// 空间复杂度：不确定，取决于内部排序算法的具体实现。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  if (nums.length < 3) return;
  var n = nums.length;
  // 给数组排序
  nums.sort((a, b) => a - b);
  // 初始化res为前三个数之和，因为我们返回的结果是最接近target的三数之和
  var res = nums[0] + nums[1] + nums[2];
  for (var i = 0; i < n - 2; i++) {
    // 固定一个值，剩下的双指针
    var lo = i + 1, hi = n - 1;
    // 我们要选择两个元素，所以lo不能等hi
    while (lo < hi) {
      var left = nums[lo], right = nums[hi];
      var sum = nums[i] + left + right;
      // 如果有sum与target相等的情况返回sum
      if (sum === target) return sum;
      // sum与target 差的绝对值
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        // 说明当前的sum小，让sum赋值给res
        res = sum;
      }
      // 双指针继续走
      if (sum < target) {
        // 如果sum小于target
        // 去重＋lo++
        while(lo < hi && nums[lo] === left) lo++;
      } else {
        // 如果sum大于target
        // 去重＋hi--
        while(lo < hi && nums[hi] === right) hi--;
      }
    }
    // 去重
    while(i < n - 3 && nums[i] === nums[i+1]) i++;
  }
  return res;
};

var threeSumClosest2 = function(nums, target) {
  if (nums.length < 3) return;
  var n = nums.length;
  // 给数组排序
  nums.sort((a, b) => a - b);
  // 初始化res为前三个数之和，因为我们返回的结果是最接近target的三数之和
  var res = nums[0] + nums[1] + nums[2];
  for (var i = 0; i < n; i++) {
    // 另一种去重方式
    if (i > 0 && nums[i] === nums[i-1]) continue;
    // 固定一个值，剩下的双指针
    var lo = i + 1, hi = n - 1;
    // 我们要选择两个元素，所以lo不能等hi
    while (lo < hi) {
      var sum = nums[i] + nums[lo] + nums[hi];
      // 如果有sum与target相等的情况返回sum
      if (sum === target) return sum;
      // sum与target 差的绝对值
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        // 说明当前的sum小，让sum赋值给res
        res = sum;
      }
      // 双指针继续走
      if (sum < target) {
        // 如果sum小于target
        lo++;
      } else {
        // 如果sum大于target
        hi--;
      }
    }
  }
  return res;
};

// 53-maxSubArray 最大子序列和
// 解法一 暴力法（超时）
// 一般情况下，可以先用暴力法进行分析，再一步步进行优化。
// 思路
// 首先来试一下最直接的方法，就是计算所有的子序列和，然后取出最大值。定义Sum[i,…,j]为数组A中第i个元素到第j个元素的和，其中0≤i≤j < n，遍历所有可能的Sum[i,…,j]即可。
// 复杂度分析
// 时间复杂度：O(n^2)，其中n为数组长度。
// 空间复杂度：O(1)
// 代码
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var n = nums.length;
  var maxSum = -Infinity;
  // 空间复杂度0(1)
  var total = 0;
  for(var i = 0; i < n; i++) {
    total = 0;
    for(var j = i; j < n; j++) {
      // 这里j从i开始，是因为每个数本身也要成为连续子序列和这个大集合的元素之一
      total += nums[j];
      maxSum = Math.max(maxSum, total);
    }
  }
  return maxSum;
};

// 解法二　分治法
// 解法一的空间复杂度非常理想，但是时间复杂度有点高，该怎么优化呢？
// 思路
// 这道题实际上是一个可以用多种方法解决的题目，如果你想到了上面的解法，我想面试官肯定不会满意，而如果你一时想不到更好的解决方法的话，有两种方法可以帮助你理清思路。
// 1.举几个简单的例子。这种方法通常适用于很复杂的问题，人们一时间难以发现其中的规律。树和链表等题目使用这种方法比较好，搭配画图来将问题进行可视化的展现效果会更好。
// 2.将大问题拆解为若干子问题，通过解决子问题，以及探寻子问题和大问题之间的关系来解决。
// 这里我们采用第2种方法。
// 假如先把数组平均分成左、右两部分，那么此时有3种情况。
//   ·最大子序列全部在数组左部分，不妨用left表示。
//   ·最大子序列全部在数组右部分，不妨用right表示。
//   ·最大子序列横跨数组左右部分，不妨用crossMaxSum表示。
// 对于前两种情况，相当于将原问题转化成了规模更小的同类问题。对于第3种情况，由于已知循环的起点（即中点），只需要向左、向右分别找出左边和右边的最大子序列，
// 那么当前最大子序列就是向左能够达到的最大子序列+nums[mid]+向右能够达到的最大子序列。因此，一个思路就是每次都将数组分成左、右两部分，
// 然后分别计算上面这3种情况的最大子序列和，最后返回最大值即可。
// 见图片 02-images/02-maxSubArray.jpg
// 复杂度分析
// 时间复杂度：从上图可以看出每层的节点在[n,2n]之间，且一共有 logn层，因此时间复杂度为O(nlogn)，其中n为数组长度。
// 空间复杂度：空间复杂度取决于函数调用栈的深度，故空间复杂度为O(logn)，其中n为数组长度，这也可以从上图直观地感受到。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  // 左右子数组的最大子序列和
  var maxSubArrayHelper = function(nums, lo, hi) {
    // 函数base出口：lo > hi，返回负无穷（因为没有要去对比的数，只能返回负无穷），lo === hi返回自身即可
    if (lo > hi) return -Infinity;
    // 找到中间值
    var mid = (lo + hi) >> 1; // Math.floor((lo + hi) / 2)
    // 分治：左侧、右侧数组最大子序列和
    var left = maxSubArrayHelper(nums, lo, mid - 1);
    var right = maxSubArrayHelper(nums, mid + 1, hi);
    // 找出nums[mid] + 从mid到左侧的最大子序列和 + 从mid到右侧的最大子序列和
    // 定义左侧数组、右侧数组的累加值
    // var leftSuffixMaxSum = 0, rightPrefixMaxSum = 0;
    // 为何要初始化为0，因为如果mid左侧的是负数都没必要再想加进去，只会越来越小
    var leftSuffixMaxSum = 0, rightPrefixMaxSum = leftSuffixMaxSum;
    // 处理累加的变量
    var total = 0;
    // 计算从lo到mid-1的最大子序列和，左侧需要反着求和
    for(var i = mid - 1; i >= lo; i--) {
      total += nums[i];
      leftSuffixMaxSum = Math.max(total, leftSuffixMaxSum);
    }
    total = 0;
    // 计算右侧从mid+1到hi
    for(var i = mid + 1; i <= hi; i++) {
      total += nums[i];
      rightPrefixMaxSum = Math.max(total, rightPrefixMaxSum);
    }
    return Math.max(left, right, leftSuffixMaxSum + nums[mid] + rightPrefixMaxSum);
  }
  return maxSubArrayHelper(nums, 0, nums.length - 1);
}

// 解法三 动态规划
// 思路
// 我们重新思考一下这个问题，观察能否将其拆解为规模更小的问题，并找出递推关系来解决？
// 不妨假设问题Q(list,i)表示[list中以索引i结尾的最大子序列和]，那么原问题就转化为Q(list,i)中的最大值，其中i =0,1,2,…,n-1。
// 继续来看一下Q(list,i)和Q(list,i-1)的关系，即如何根据Q(list,i-1)推导出Q(list,i)。
// 1.如果Q(list,i-1)>0，则表示以索引i-1结尾的最大子序列和大于0，因此nums[i]一定要和Q(list,i-1)部分结合，这样才能使结果更优，即Q(list,i)=Q(list, i-1)＋nums[i]，这是一种贪心的思想。
// 2.如果Q(list,i-1)≤0，则为了使结果更优，nums[i]应该不与Q(list,i-1)相加。ps: 因为无论正数还是负数还是0与一个负数相加只会越来越小，所以不如从nums[i]从新算
// 分析到这里，递推关系就很明朗了，即Q(list,i)=max(0,Q(list,i-1))+nums[i]。
// 见图片 ./02-images/02-maxSubArray-02.jpg
// 复杂度分析
// 时间复杂度：O(n)，其中n为数组长度。
// 空间复杂度：O(1)。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var n = nums.length;
  // maxSum最终结果，curMaxSum为每次计算的当前的最大值
  var maxSum = nums[0], curMaxSum = maxSum;
  for(var i = 1; i < n; i++) {
    // 以nums[i]为结尾的「最大子数组和」为dp[i]
    // 如果Q(list, i)以索引i结尾的最大子序列和，如果Q(list, i - 1) > 0则需要将Nums[i]与Q(list, i - 1)相结合
    // 如果Q(list, i - 1) <= 0，则为了结果更优，Nums[i]应该不与Q(list, i - 1)相加。
    curMaxSum = Math.max(curMaxSum + nums[i], nums[i]);
    // nums[0..i]中的「最大的子数组和」为dp[i]
    maxSum = Math.max(maxSum, curMaxSum);
  }
  return maxSum;
}

// 解法四 前缀和
// 思路
// 下面从数学分析的角度来看一下这个题目。定义函数S(i)，它的功能是计算从0（包括0）开始加到i（包括i）的值，即S(i)=list[0]+list[1]+…+list[i]。
// 那么S(j)-S(i-1)就等于从i开始（包括i）加到j（包括j）的值，这在数学上被称为前缀和求差，因此实际上只需要遍历一次计算出所有的S(i)，其中i等于0,1,2,…,n-1，
// 然后利用前缀和就可以计算出任意区间的和。这种算法的时间复杂度为O(n)，空间复杂度为O(1)。
// 分析：我们找到最小的前缀和，然后maxSum = Math.max(sum - minSum, maxSum)，这样就可以找到最大的子数列和
// 比如      -1 -2 -3 4
// sum      -1 -3 -6 -2
// maxSum   -1 -1 -1 4
// minSum   -1 -3 -6 -6
// 复杂度分析
// 时间复杂度：O(n)，其中n为数组长度。
// 空间复杂度：O(1)。
// 代码
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var n = nums.length;
  // 这里为何要用minSum为0，我们计算的时候从i为0开始，我们需要有初始值，只能让minSum为0，因为sum和minSum为前缀和我们需要从0开始
  // maxSum为nums[0]，这样我们第一次比较的时候需要有默认值
  var sum = 0, minSum = sum, maxSum = nums[0];
  for(var i = 0; i < n; i++) {
    sum += nums[i];
    // 用前缀和 - 最小前缀和 得到最大子序列和
    maxSum = Math.max(maxSum, sum - minSum);
    // 最小前缀和
    minSum = Math.min(minSum, sum);
  }
  return maxSum;
}

// labuladong版本
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247497299&idx=1&sn=ea5adedf25ac46a84018a6def2e284d5&scene=21#wechat_redirect
// 动态规划思路：
// 按照我们常规的动态规划思路，一般是这样定义dp数组：nums[0..i]中的「最大的子数组和」为dp[i]。
// 实际上是不行的，因为子数组一定是连续的，按照我们当前dp数组定义，并不能保证nums[0..i]中的最大子数组与nums[i+1]是相邻的，也就没办法从dp[i]推导出dp[i+1]。
// 对于这类子数组问题，我们就要重新定义dp数组的含义：以nums[i]为结尾的「最大子数组和」为dp[i]。
// 这种定义之下，想得到整个nums数组的「最大子数组和」，不能直接返回dp[n-1]，而需要遍历整个dp数组：
// int res = Integer.MIN_VALUE;
// for (int i = 0; i < n; i++) {
//   res = Math.max(res, dp[i]);
// }
// return res;
// 依然使用数学归纳法来找状态转移关系：假设我们已经算出了dp[i-1]，如何推导出dp[i]呢？
// 可以做到，dp[i]有两种「选择」，要么与前面的相邻子数组连接，形成一个和更大的子数组；要么不与前面的子数组连接，自成一派，自己作为一个子数组。
// 如何选择？既然要求「最大子数组和」，当然选择结果更大的那个啦：
// 要么自成一派，要么和前面的子数组合并
// dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
// 综上，我们已经写出了状态转移方程，就可以直接写出解法了：
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var n = nums.length;
  if (n === 0) return 0;
  // 定义：dp[i]记录以nums[i]为结尾的「最大子数组和」
  // 空间复杂度为O(N)
  var dp = new Array(n).fill(0);
  // base state
  // 第一个元素前面没有子数组
  dp[0] = nums[0];
  // 状态转移方程
  for(var i = 1; i < n; i++) {
    // 要么自称一派，要么和前面的子数组合并
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  var res = -Infinity;
  for(var i = 0; i < n; i++) {
    res = Math.max(res, dp[i]);
  }
  return res;
}
// 自我改动
// var maxSubArray = function(nums) {
//   var n = nums.length;
//   if (n === 0) return 0;
//   // 定义：dp[i]记录以nums[i]为结尾的「最大子数组和」
//   var dp = new Array(n).fill(0);
//   // base state
//   // 第一个元素前面没有子数组
//   dp[0] = nums[0];
//   // nums[0..i]中的「最大的子数组和」为res。
//   var res = nums[0];
//   // 状态转移方程
//   for(var i = 1; i < n; i++) {
//     // 要么自称一派，要么和前面的子数组合并
//     dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
//     res = Math.max(dp[i], res);
//   }
//   return res;
// }
// 上面空间复杂度
// 以上解法时间复杂度是 O(N)，空间复杂度也是 O(N)，较暴力解法已经很优秀了，不过注意到dp[i]仅仅和dp[i-1]的状态有关
var maxSubArray = function(nums) {
  var n = nums.length;
  if (n === 0) return 0;
  // base case
  var dp_0 = nums[0];
  var dp_1 = 0, res = dp_0;
  for(var i = 1; i < n; i++) {
    // 以nums[i]为结尾的「最大子数组和」为dp[i]
    dp_1 = Math.max(nums[i], dp_0 + nums[i]);
    dp_0 = dp_1;
    // 顺便计算最大的结果 也就是nums[0..i]中的最大子数组和
    res = Math.max(res, dp_1);
  }
  return res;
}

// labuladong前缀和
// 以nums[i]为结尾的最大子序列的和：preSum[i+1](sum[0..i])减去最小的preSum[i](最小的sum[0..i-1])
// 以nums[i]为结尾的最大子数组之和是多少？其实就是preSum[i+1] - min(preSum[0..i])。
var maxSubArray = function(nums) {
  var n = nums.length;
  // 我们创建前缀和,需要建立n+1的长度，这样preSum[i+1]就是sum[0..i]
  var preSum = new Array(n + 1).fill(0);
  // 循环创建前缀和
  for(var i = 1; i <= n; i++) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }
  // 声明res和minVal(最小的前缀和)
  var res = -Infinity;
  var minVal = Infinity;
  // 循环找出以nums[i]为结尾的最大子序列的和
  for(var i = 0; i < n; i++) {
    // 找到最小的前缀和
    minVal = Math.min(minVal, preSum[i]);
    // 计算sum[0..i](preSum[0..i+1])与minSum的差
    res = Math.max(res, preSum[i + 1] - minVal);
  }
  return res;
}

// 179-largestNumber
// 示例 2：输入：nums = [3,30,34,5,9] 输出："9534330"
// 思路：这道题其实是排序题目的变种，是一道披着数学外衣的排序题。
// 首先我们要知道一个数学常识。
// 1．如果两个数位数不同，那么位数大的数更大。
// 2．如果两个数位数相同，比如两个数123a456和123b456，如果a>b，那么123a456大于123b456，否则123a456小于或等于123b456。也就是说，两个相同位数的数的大小关系取决于第一个不同的数字的大小。
// 这道题由于总的位数是确定的，就是数组全部位数之和，因此我们的入手点就是上面提到的第2点，即越高位的数字越大越好，但是这里需要考虑特殊情况，题目给出的测试用例就能够很好地说明问题。
// 示例2中按降序排序得到的数是9534303，然而交换3和30的位置可以得到正确答案9534330，因此，在排序的比较过程中，我们需要自定义排序的策略，即自己决定哪个元素排在前面。一种方式是将比较元素
// （即题目中的非负整数）转化为字符串，然后用字符串的比较即可避免上述问题。比如上述例子中的3和30，按照拼接后的字符串比较'303'和'330'哪个大，从而决定谁排在前面就好了。
// ps: "3" < "30" 因此如果单纯的按照字符串比较 肯定是 303 但是 330更大，因此我们需要自定义一下比较规则
// ps: 字符串比较比如 < > 或者 a.localeCompare(b)(前面的大返回1后面的大返回-1相同返回0)，字符串比较是按顺序比较的 比如 "9" 与 "31" 先比较第一位9>3然后得到 "9" > "31"为true
// 如果是"3"与"31"比较 第一位相同比较第二位 3无第二位所以'3' < '31'
// 这就是需要自定义规则
// const arr2 = [
//   {value: 1, name: 'a'},
//   {value: 3, name: 'b'},
//   {value: 2, name: 'c'},
//   {value: -1, name: 'd'}
// ]
// // 从小到大排序
// function compareNum(a, b) {
//   if (a.value - b.value < 0) {
//     return -1
//   } else if (a.value == b.value) {
//     return 0
//   } else {
//     return 1
//   }
// }
// // 等价于
// // function compareNum(a, b) {
// //   return a.value - b.value
// // }
// arr2.sort(compareNum)
// console.log(arr2) // [-1,1,2,3] 
// 倒叙排序
// const arr2 = [
//   {value: 1, name: 'a'},
//   {value: 3, name: 'b'},
//   {value: 2, name: 'c'},
//   {value: -1, name: 'd'}
// ]
// // 从小到大排序
// function compareNum(a, b) {
//   // if (a.value - b.value < 0) {
//   //   return 1
//   // } else if (a.value == b.value) {
//   //   return 0
//   // } else {
//   //   return -1
//   // }
//   if (a.value - b.value < 0) {
//     return 1
//   } else {
//     return -1
//   }
// }
// // 等价于
// // function compareNum(a, b) {
// //   return b.value - a.value
// // }
// arr2.sort(compareNum)
// console.log(arr2) // [3,2,1,-1] 
// 复杂度分析
// 时间复杂度：这里总的时间复杂度是由排序决定的，因此这种算法的时间复杂度为O(nlogn)，其中n为数组长度。排序算法导致
// 空间复杂度：由于我们将输入转化成了字符串数组，因此这里的空间复杂度为O(n)，其中n为数组长度。
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
  // var compareNum = function(a, b) {
  //   var strA = a.toString(), strB = b.toString();
  //   // 避免直接字符串比较导致'3' < '30', 从而导致'303'而不是'330'
  //   // 因此自定义规则 让 strA + strB 与 strB + strA 这样 就是比较'330'与'303'了
  //   if (strA + strB < strB + strA) {
  //     // 倒序排序排列，正常如果a<b我们返回-1就是正序排序，如果是返回1那就是倒序排序
  //     return 1;
  //   } else {
  //     // 将相等的情况合并到 这里 效果一样
  //     return -1;
  //   }
  // }
  // var compareNum = function(a, b) {
  //   var strA = a.toString(), strB = b.toString();
  //   // 避免直接字符串比较导致'3' < '30', 从而导致'303'而不是'330'
  //   // 因此自定义规则 让 strA + strB 与 strB + strA 这样 就是比较'330'与'303'了
  //   // 正常的情况 '4'与'5'比较 '45' < '54'这是满足比较条件的
  //   // 因此不能单独的直接比较字符串
  //   if (strA + strB < strB + strA) {
  //     // 倒序排序排列，正常如果a<b我们返回-1就是正序排序，如果是返回1那就是倒序排序
  //     return 1;
  //   } else if (strA + strB > strB + strA) {
  //     return -1;
  //   } else if (strA + strB === strB + strA) {
  //     return 0;
  //   }
  // }
  var compareNum = function(a, b) {
    // 我们可以先将数字数组转化为字符串数组，然后排序，这个过程需要定制比较逻辑
    var strA = a.toString(), strB = b.toString();
    // 正序排序就是(strA + strB) - (strB + strA)
    // 倒序排序
    return (strB + strA) - (strA + strB); 
  }
  // 对nums进行倒序排序
  nums.sort(compareNum);
  // 如果数组第一位是0，排除[0,0]这样的情况直接返回0
  if (nums[0] === 0) return '0';
  return nums.join(''); // 这样['1','2']返回'12'如果是nums.join()返回'1,2'
};

// 166-fractionToDecimal
// 长除法
// 思路：
// 将分数转成整数或小数，做法是计算分子和分母相除的结果。可能的结果有三种：整数、有限小数、无限循环小数。
// 首先需要明确的一点是，只要是能够被分数表示的数都是有理数。还有一点需要了解，有理数只能是有限数或无限循环小数，因此
// 题目中不可能出现无限不循环的情况，也就是说问题是可解的。这道题目的难点是找出循环节，一旦找到循环节，剩下要做的就是简单地
// 将商的整数部分和循环节（如果存在）进行拼接。

// 计算长除法时，首先计算结果的整数部分，将以下部分依次拼接到结果中：
// 1.如果结果是负数则将负号拼接到结果中，如果结果是正数则跳过这一步；
// 2.将整数部分拼接到结果中；
// 3.将小数点拼接到结果中。
// 完成上述拼接之后，根据余数计算小数部分。
// 计算小数部分时，每次将余数乘以 10，然后计算小数的下一位数字，并得到新的余数。重复上述操作直到余数变成 0 或者找到循环节。
// 为了厘清思路，不妨从几个寻常的例子入手。既然问题的难点是找到循环节，那么我们直接来看一个有循环节的例子：numerator=2，denominator=3。
// 步骤1：让分子除以分母。
// 步骤2：如果余数是0，则直接退出，否则执行步骤3。
// 步骤3：把余数乘以10作为分子，分母不变，然后继续执行步骤1。

// 如何找到循环节？注意对于相同的余数，计算得到的小数的下一位数字一定是相同的，因此如果计算过程中发现某一位的余数在之前已经出现过，则为找到循环节。
// 为了记录每个余数是否已经出现过，需要使用哈希表存储每个余数在小数部分第一次出现的下标。

// 假设在计算小数部分的第 i 位之前，余数为 remainderi，则在计算小数部分的第 i 位之后，余数为 remainderi+1。

// 假设存在下标 j 和 k，满足 j≤k 且 remainderj = remainderk+1，则小数部分的第 k+1 位和小数部分的第 j 位相同，因此小数部分的第 j 位到第 k 位是一个循环节。
// 在计算小数部分的第 k 位之后就会发现这个循环节的存在，因此在小数部分的第 j 位之前加上左括号，在小数部分的末尾（即第 k 位之后）加上右括号。
// 见图 02-fractionToDecimal-01.jpg与02-fractionToDecimal-02.jpg

// 复杂度分析
// 时间复杂度：时间复杂度：由于fractionPart数组的长度最多为denominator-1，我们最多执行denominator-1次循环体，因此时间复杂度为O(denominator)。
// 空间复杂度：由于fractionPart数组的长度最多为denominator-1，因此空间复杂度为(denominator)。

var fractionToDecimal = function(numerator, denominator) {
  // 我们先判断是否能整除，如果可以整除直接返回结果
  if (numerator % denominator === 0) {
    // return '' + numerator / denominator;
    return '' + Math.floor(numerator / denominator);
  }

  // 不能整除，将整数部分、小数点、括号、循环体等放到sb数组里
  var sb = [];
  // 1.最终符号
  // 判断两个数的商的符号 用下面这样
  if (numerator < 0 ^ denominator < 0) {
    // var a = 1, b = 2; a < 0 ^ b < 0 => 0 (false)
    // var a = 1, b = -2; a < 0 ^ b < 0 => 1 (true)
    // var a = -1, b = -2; a < 0 ^ b < 0 => 0 (false)
    // var a = 0, b = 0; a < 0 ^ b < 0 => 0 (false)
    // 当结果为负数
    sb.push('-');
  }
  // 2.整数部分，这里我们不应该带符号
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);
  var integerPart = Math.floor(numerator / denominator);
  sb.push(integerPart);
  // 小数点
  sb.push('.');
  // 3.小数部分，这里我们用一个map来记录当前余数，当下标 j <= k，且remainderj = remainderk+1, 
  // 则小数部分的第 k+1 位和小数部分的第 j 位相同，因此小数部分的第 j 位到第 k 位是一个循环节。
  // 这里面remainder(i)：假设在计算小数部分的第i位之前，余数为remainder(i)
  // key为余数，val为余数下标
  var fractionPart = []; // fraction分数
  var remainderIndex = 0;
  var remainderIndexMap = new Map();
  let remainder = numerator % denominator;
  // 如何根据余数求小数 比如 2/3(余数=2%3第一位小数位，(余数*10,20)/3)
  while(remainder !== 0 && !remainderIndexMap.has(remainder)) {
    // 将余数存到map中
    remainderIndexMap.set(remainder, remainderIndex);
    // 余数不为0，我们需要计算小数部分，如何计算 让余数*10 / 分母
    fractionPart.push(Math.floor((remainder * 10) / denominator));
    // 重新计算remainder
    remainder = (remainder * 10) % denominator;
    remainderIndex++;
  }
  // 有循环节，添加括号
  if (remainder !== 0) {
    // 如果是2.2(189)，我们上述remainder最后一次被计算出来也是1，
    // 获取到第一个1的index
    var insertIndex = remainderIndexMap.get(remainder);
    fractionPart.splice(insertIndex, 0, '(');
    fractionPart.push(')');
  }
  sb = sb.concat(fractionPart);
  return sb.join('');
}

// ps: 数学知识 若整数b除以非零整数a，商为整数，且余数为零，我们就说b能被a整除（或说a能整除b），b为被除数，a为除数，即a|b（“|”是整除符号），读作“a整除b”或“b能被a整除”
// 368-largestDivisibleSubset最大整除子集
// 思路
// 符合直觉的想法是求出所有的子集，一共是2^n个，然后判断是否满足“整除子集”的条件，并最终取出最大的即可，但这样做的复杂度非常高，我们来思考如何优化。
// 首先明确一点：如果存在一个整除子集S及整数x，x能够被S中最大的数整除，那么将x加入S就可以组成一个更大的整除子集。这个其实就是递推公式，因此可以维护一个集合，集合的key是整除子集中最
// 大的数，value是整除子集S本身。具体算法如下。
// 1.对数组进行排序，这里不妨进行一次升序排序。
// 2.遍历元素，对于数组中的每一项x，检查x能否被S中的每一项S[d]整除，也就是检查x % d是否等于0。
// 3.如果可以，则说明最大整除子集可以+1，我们找到的新的最大整除子集为S[d]+x。如果不可以，什么都不需要做。
// 4.当S全部遍历完成时，我们找出S[d]+x中的最大者，将其写回S[x]。
// 5.最后取S集合中的长度最大值即可。

// 复杂度分析
// 时间复杂度：由于subSetMap会在循环的过程逐渐增大，最大会增大到n，因此时间复杂度为O(n^2)，其中n为数组长度。
// 空间复杂度：我们使用的额外空间有subSetMap和newMaxSubSet，其中newMaxSubSet被声明一次，而subSetMap中的key共有n+1个，value为一个set，set的平均长度为n，因此总的空间复杂度为O(n^2)，其中n为数组长度。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function(nums) {
  // 先对nums升序排序
  nums.sort((a, b) => a - b);
  // 定义Map，key为子集最大的数，val为子集
  var subSetMap = new Map();
  // 初始化subSetMap，这里取-1为默认值，因为正整数 % -1都是0
  subSetMap.set(-1, []);
  // 定义newMaxSubSet，此数组是当前nums[i]为结尾的最长的子集
  var newMaxSubSet;
  // 如果存在一个整除子集S以及整数x，x能够被S中最大的数整除，那么将x加入S就可以组成一个更大的整除子集
  for(var i = 0; i < nums.length; i++) {
    newMaxSubSet = [];
    // 遍历Nums元素x，检查是否能被subSetMap中的每一项s[D]整除，就是找到s中的最大值
    for(var j of Array.from(subSetMap.keys())) { // 如果在循环for(var j of subSetMap.keys())里 给map添加元素，这时候会把新添加的也便里出来
      if (nums[i] % j === 0) {
        // 能被整除，则扩充该子集
        var newSubSet = JSON.parse(JSON.stringify(subSetMap.get(j)));
        newSubSet.push(nums[i]);
        newMaxSubSet = newMaxSubSet.length > newSubSet.length ? newMaxSubSet : newSubSet;
      }
    }
    // 将最长的子集为val，key为Nums[i]存到Map里
    // 如果是[4,8,10,240]，当Nums[i]为240的时候，这时候mao里有-1:[]，4:[4]，8: [4, 8]，10: [10]
    // 这里类似于贪心算法，当nums[i]为240的时候，240 % (-1,4,8,10)都为0，按照顺序newMaxSubSet会得到[240][4,240][4,8,240][10,240]
    // 贪心一下，每次都获取长度最长的
    subSetMap.set(nums[i], newMaxSubSet);
  }
  var res = [];
  // 找到子集长度最大的
  for(var k of subSetMap.keys()) {
    res = res.length > subSetMap.get(k).length ? res : subSetMap.get(k);
  }
  return res;
};

// 1175-numPrimeArrangements(质数排列)
// 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数
// 1不是质数，1只有一个因数，所以它不是质数。
// 让我们一起来回顾一下质数：质数一定是大于1的，并且不能用两个小于它的正整数的乘积来表示。
// 索引从1开始，比如n=5，1,2,3,4,5这里面有2 3 5三个质数，索引也是12345中有3个质数，所以有多少种排列组合？
// 排列组合数：3 * 2 * 1(3个质数) * 2 * 1(2个非质数) = 12 
// 如何求阶乘
// function factorial(n) {
//   if (n === 1) {
//     return 1;
//   }
//   return n * factorial(n - 1);
// }

// 复杂度分析
// 时间复杂度：O(n^(3/2))。求 n 个数中质数个数的时间复杂度为 O(n^(3/2)), 阶乘的时间复杂度为 O(n)，总的时间复杂度为 O(n^(3/2))。
// 空间复杂度：O(1),只用了常数空间。
// 对于n个数每个数遍历n次，时间复杂度为n^2，但是我们判断质数的时候，大概有n个数，每次遍历n/2次，所以是 n^(3/2)
/**
 * @param {number} n
 * @return {number}
 */
var numPrimeArrangements = function(n) {
  // 判断是否为质数，从1开始
  var isPrime = function(n) {
    if (n === 1) return false;
    for(var i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  var mod = 10**9 + 7;
  // 我们需要找到从1到n中有多少质数
  var primeCounts = 0;
  for(var i = 2; i <= n; i++) {
    if (isPrime(i)) {
      primeCounts++;
    }
  }
  // 这里不用质数
  var res = 1;
  var notPrimeCounts = n - primeCounts;
  // 阶乘
  while(primeCounts > 0) {
    // 为了避免数过大
    res %= mod;
    res *= primeCounts;
    primeCounts--;
  }
  while(notPrimeCounts > 0) {
    // 为了避免数过大
    res %= mod;
    res *= notPrimeCounts;
    notPrimeCounts--;
  }
  return res;
};
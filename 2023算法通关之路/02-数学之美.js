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


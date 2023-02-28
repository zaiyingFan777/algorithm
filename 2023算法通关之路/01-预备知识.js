// 并归排序
// 并归排序是一个典型的分治算法，其基本过程分成两个阶段：分与合。其中分的过程采用自顶向下的方式，每次将问题规模缩小一半，直到问题规模缩小到寻常情况，
// 即可以被直观解决的情况。合的过程恰好相反，采用自底向上的方式，将问题一步步解决，直到还原到原问题规模。

// 如果你将这两个过程化成递归树的化，就会发现这两个过程递归树的深度都是logn。而每一层的节点数都是n，也就是说总节点数是nlogn，而节点的基本操作数是常数，
// 因此总的算法时间复杂度为O(nlogn)。n为数据规模，O(nlogn)为量级。表示它需要“通过nlogn量级的操作去处理一个规模为n的数据结构”

// 找中间值：left = 0，right = nums.length - 1; mid = (left + right) >> 1
// 从中间切割数组：mid = (0 + nums.length) >> 1; left = nums.slice(0, mid); right = nums.slice(mid);

// 自己思路去写
// 会产生很多数组，空间复杂度不是很优秀
function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  // 先分，有点不够简单
  // var left = 0;
  // var right = nums.length;
  // var mid = (left + right) >> 1;
  // var leftArray = nums.slice(left, mid);
  // var rightArray = nums.slice(mid, right);
  var mid = nums.length >> 1;
  var leftArray = nums.slice(0, mid);
  var rightArray = nums.slice(mid);
  // 后归
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

// 比较大小并合并
function merge(nums1, nums2) {
  var res = [];
  while(nums1.length && nums2.length) {
    // 比较大小
    if (nums1[0] > nums2[0]) {
      // right小的话先切割right放到result里面
      result.push(nums2.shift());
    } else {
      result.push(nums1.shift());
    }
  }
  return res.concat(nums1, nums2);
}

// 归并排序的过程可以在逻辑上抽象成一棵二叉树，树上的每个节点的值可以认为是 nums[lo..hi]，叶子节点的值就是数组中的单个元素
// 归并排序类似于二叉树搜索的后序遍历，左右根
// 原地并归
// 对元素组下标进行操作，不会产生新数组
// 时间复杂度O(nlogn)、空间复杂度O(1)
function mergeSort(nums) {
  var merge = function(nums, lo, mid, hi) {
    // 将nums保存到temp中 [lo..hi]即将合并的区间
    for(var i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }
    // 数组双指针技巧
    // i指向lo区间[lo..mid]
    // j指向hi区间[mid+1..hi]
    var i = lo, j = mid + 1;
    // 开始左侧与右侧区间的排序，从左侧头跟右侧头开始比较
    // 比较的是temp[i]、temp[j]将结果从lo到hi遍历并赋值到nums[k]
    for(var k = lo; k <= hi; k++) {
      if (i === mid + 1) {
        // 说明左侧区间遍历完了，直接将右侧区间按顺序赋值过来
        nums[k] = temp[j++];
      } else if (j === hi + 1) {
        // 说明右侧区间遍历完了，直接将左侧区间按顺序赋值过来
        nums[k] = temp[i++];
      } else if (temp[i] > temp[j]) {
        // 比较temp i、j，从左侧右侧区间头部开始比较
        nums[k] = temp[j++];
      } else {
        nums[k] = temp[i++];
      }
    }
  }
  var sort = function(nums, lo, hi) {
    // 递归出口
    // 单个元素不用排序
    if (lo === hi) return;
    // 找到中间下标
    var mid = (lo + hi) >> 1;
    // sort [lo..mid]
    sort(nums, lo, mid);
    // sort [mid+1..hi]
    sort(nums, mid + 1, hi);
    // merge [lo..hi]
    merge(nums, lo, mid, hi);
  }
  // 用于辅助合并有序数组
  var temp = new Array(nums.length).fill(0);
  // 排序nums[0..nums.length-1]
  sort(nums, 0, nums.length - 1);
}

// leetcode 46
// 全排列模板
// 思路：全排列，无重复无可复选的全排列，我们采用回溯的算法，我们用used数组标记已经在路径上的元素避免重复选择，
// 然后收集所有叶子节点上的值，就是所有全排列的结果：
// 全排列添加used数组后，每次从i=0开始循环即可
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  // 存放结果的数组
  var res = [];
  // 用于存放轨迹的数组
  var track = [];
  // 定义used数组标记已经在路径上的元素避免重复选择
  var used = new Array(nums.length).fill(false); 
  // 回溯核心算法函数
  var backtrack = function(nums) {
    if (track.length === nums.length) {
      // 说明遍历到了叶子节点，需保存到res数组里
      var newTrack = JSON.parse(JSON.stringify(track));
      res.push(newTrack);
      return;
    }
    for(var i = 0; i < nums.length; i++) {
      // 如果当前已经在used标记了继续循环
      if (used[i]) continue;
      // 标记nums[i]已经在路径上了
      used[i] = true;
      // 将当前的Nums[i]放到轨迹中
      track.push(nums[i]);
      // 继续往下一层
      backtrack(nums);
      // 撤销选择
      used[i] = false;
      track.pop();
    }
  }
  backtrack(nums);
  return res;
}

// 快速排序
// 先选择元素，再排序，类似于二叉树的前序遍历
// 并归排序
// 快速排序，先处理数组再递归，类似于二叉树的后序遍历
// 思路：快速排序是先将一个元素排好序，然后再将剩下的元素排好序
// 快速排序的核心无疑是 partition 函数， partition 函数的作用是在 nums[lo..hi] 中寻找一个分界点 p，通过交换元素使得 nums[lo..p-1] 都小于等于 nums[p]，且 nums[p+1..hi] 都大于 nums[p]：
// 一个元素左边的元素都比它小，右边的元素都比它大，啥意思？不就是它自己已经被放到正确的位置上了吗？
// 所以 partition 函数干的事情，其实就是把 nums[p] 这个元素排好序了。
// 一个元素被排好序了，然后呢？你再把剩下的元素排好序不就得了。
// 剩下的元素有哪些？左边一坨，右边一坨，去吧，对子数组进行递归，用 partition 函数把剩下的元素也排好序。
function quickSork(nums) {
  sort(nums, 0, nums.length - 1);
  return nums;
}

function sort(nums, lo, hi) {
  // 出口
  if (lo >= hi) return;
  // 先找一个分界点P，使得nums[lo..p-1]小于等于nums[p]，且nums[p+1..hi]都大于nums[p]
  var p = partition(nums, lo, hi);
  // 小于nums[p]的排序
  sort(nums, lo, p - 1);
  // 大于nums[p]的排序
  sort(nums, p + 1, hi);
}

function partition(nums, lo, hi) {
  console.log(lo, hi)
  // 双指针的形式
  var i = lo, j = hi + 1;
  var v = nums[lo];
  // 一直遍历，如果i < j，我们则将比v小的，与比v大的换位置，
  // 如果i >= j，则退出此轮循环
  while(true) {
    // v的左边区间: nums[i] < v，如果nums[i] >= v，则退出循环，找到了v右边数组的元素
    while(nums[++i] < v) {
      if (i === hi) {
        break;
      }
    }
    // v的右边区间: v < nums[i]，如果v >= nums[i]，则退出循环，找到了v左边数组的元素
    while(nums[--j] > v) {
      if (j === lo) {
        break;
      }
    }
    // 如果i >= j ，说明右侧区间与左侧区间重复了，j为左边界的最右边的值
    // 比如[12,1,2];i=0;j=3;v=12; 第一轮i=2;j=2;如果不跳出循环=>nums:[12,1,2],++i变为了3(undefined<v=>false),--j(j=1)(1>12=>false), 3>1，然后退出循环,交换=>[1,12,2]这样肯定不对，
    // 我们期望12左边都小于12，12右侧都大于12
    if (i >= j) {
      break;
    }
    // 如果i < j，则交换两边区间的值
    var temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  // lo与j(左边界的最右边的值)交换
  var temp = nums[lo];
  nums[lo] = nums[j];
  nums[j] = temp;
  return j;
}
// 第九章 双指针

/**
 * 双指针，顾名思义，是指有两个游标指针指向不同的位置。双指针不是一种具体的算法思想，而是一种解题技巧。在力扣（LeetCode）中有许多题目可以使用该技巧来优化解法。
 * 注意，此处的指针与C/C++语言中的指针并不完全相同。
 * 如果说迭代一个数组，并输出数组的每一项，需要一个指针来记录当前遍历的项，我们把这个过程叫单指针。
 * 这里的“指针”指的是数组的索引。
 * for(var i = 0; i < nums.length; i++) {
 *   console.log(i, nums[i]);
 * }
 * 那么双指针实际上就是有两个这样的指针，最为经典的就是左/右双指针。
 * var l = 0, r = nums.length - 1;
 * while(l < r) {
 *   if (一定条件) return 合适的值，一般是l和r的中点;
 *   if (一定条件) l++;
 *   if (一定条件) r--;
 * }
 * 因为l == r，因此返回l或r都是一样的
 * return l;
 * 
 * ⬇     ⬇
 * 1 2 3 4
 * 
 * 读到这里，读者应该可以发现双指针是一个很宽泛的概念，就像数组、链表一样，其类型有很多。
 * 比如二分法经常用到左/右端点双指针，滑动窗口会用到快/慢指针和固定间距指针，因此双指针其实是一种综合性很强的类型，类似于数组、栈等，
 * 但是这里所讲述的双指针，往往指的是某几种类型的双指针，而不是只要有两个指针就是双指针。
 * 
 * 有了这样一个算法框架或者算法思维，有很大的好处。它能帮助你厘清思路，当你碰到新的问题，在脑海里进行搜索时，双指针这个词就会在你脑海里闪过，
 * 你可以根据双指针的所有“套路”和这道题进行穷举匹配，这个思考解题的过程就像算法一样，是不是很有趣呢？
 * 
 * 本章主要讨论“头/尾双指针”和“快/慢双指针”两种类型。
 * 1.头/尾指针是指游标同时指向数组、字符串的第一个元素和最后一个元素，典型应用是求数组元素或子串是否满足特定条件。
 * 2.快/慢指针是指两个指针的移动速度不同（比如有的移动步长为2，有的移动步长为1），典型的应用是判断链表是否有环。
 * 
 * 此外还有一种特殊的双指针问题，被称为滑动窗口问题，这部分内容在滑动窗口部分会单独介绍。
 */


// 9.1 头/尾指针
// 9.1.1 两数相加II（https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/）
/**
 * 1.暴力法（两层for循环）忽略
 * 2.解法2：双指针法
 * 思路：
 * 上面提到的暴力法，因为遍历了数组中所有可能的元素组合形式，适用于任意类型的数组。
 * 题目中给出的有序数组是按照升序排序的，这一条件在暴力法中没有用到。思考一下，如果两个加数的和大于目标数，则对于给定的升序数组，只能减小右边加数的下标，从而减小两数的和；
 * 相反，如果两个加数的和小于目标数，则只能增大左边加数的下标，从而增大两数的和。
 * 利用数组是有序数组的特性，开始时使用头/尾双指针（left和right指针）分别指向数组的首元素（numbers[0]）和尾元素（numbers[n-1]）。
 * 1.如果两数（即numbers[0]+numbers[n-1]）之和比目标数大，则对于数组中的元素numbers[i]（其中i属于(left,right]）来说，numbers[i]+numbers[right]>target一定成立，因此若存在两数和等
 * 于目标数，则只能是[left,right-1]中的两个数，此时可以向左移动尾指针缩小数组范围（本质是剪枝操作，将所有与numbers[right]的组合去掉，不再检测）。
 * 2.反之，只能向右移动left指针。如果两指针相遇后，仍然未找到两数和等于目标数，则解为空。
 * 下面以数组[2,3,5,9,11,17]和目标数14为例，给出双指针算法的具体步骤。
 * 1.首先定义left和right两个指针，分别指向数组的第0个元素2和第6个元素17。
 * 2.因为2+17>14，所以任何其他元素与17的和都会大于14，因此如果存在两个加数的和等于目标数14，那么加数一定在数值17的左边（即需要向左移动right指针）。
 * 3.接下来只要看数组的前5个元素即可，即问题转化为从数组[2,3,5,9,11]中找到两个元素之和等于目标数14。此时仍然可以认为left和right指针分别指向了这个子数组的首位元素2和尾元素11。
 * 4.此时2+11<14，所以数组中的任何其他元素与2的和都会小于14，因此如果存在两个加数的和等于目标数14，那么加数一定在数值2的右边（即需要向右移动left指针）。
 * 5.依次按照上面的步骤推理，直到两指针重叠，如果仍然未找到两数和等于目标数，则返回空；否则返回两个加数的下标。
 */

// 复杂度分析
// 1.时间复杂度：O(n)。其中，n为数组中元素的个数。进行了单循环，只需要遍历数组中的元素即可。
// 2.空间复杂度：O(1)。

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  var n = numbers.length;
  var l = 0, r = n - 1;
  while(l < r) {
    var sum = numbers[l] + numbers[r];
    if (sum === target) {
      return [l + 1, r + 1];
    } else if (sum < target) {
      // 移动左指针
      l++;
    } else {
      // 移动右指针
      r--;
    }
  }
  return [];
};

// 9.1.2 盛水问题 （https://leetcode.cn/problems/container-with-most-water/）
/**
 * 1.忽略暴力法
 * 2.双指针法
 * 思路
 * 如下图所示，任意两个数组元素(a[i+n]和a[i-j])的最大储水能力为：
 * area = min(a[i+n], a[i-j])*(i + n - (i - j))
 * 图片见：./09-images/01-maxArea.jpg
 * 分析上面的计算公式，假设a[i+n]比a[i-j]小，如果构成水池的两根线不是a[i+n]和a[i-j]，那么只可能是数组中在索引i-j与 i+n-1之间的值（包括两个值本身），而不可能是类似i-j+1和i+n这样的组
 * 合，因为a[i+n]与其他任意柱子的储水能力都不会超过其与a[i-j]的结合。
 * 
 * 因此可以选取数组的开始和末尾元素作为头/尾双指针的起始位置，计算两个指针可容纳的储水面积，之后移动数值较小的指针向中间靠拢，重新计算两个指针可容纳的储水面积，并与之前的最大面积
 * 做比较，以此类推，直至两个指针相遇的位置，即可得到最大面积。
 * 下面给出这种计算步骤和合理性说明，以下图为例。
 * 图片见: ./09-images/02-maxArea.jpg
 * 1．在选取第一个和最后一个元素时，假设a[0]是较小者，两元素的最大储水能力为(area = min(a[0], a[size])*(size) = a[0]*size)。则a[0]与其他任一元素的储水能力都不可能超过area，因为
 * min(a[0], a[i]) <= a[0]，而 [i < size]，所以min(a[0], a[i]) * i < min(a[0], a[size]) * size。
 * 2．移动左指针指向元素a[1]，计算面积的大小，并与步骤1计算的面积做比较，取较大者。按照同样的原则，移动a[1]和a[size]中的较小者，向中间靠拢。
 * 3．重复步骤2直至两指针指向同一元素，返回最大值。
*/

// 复杂度分析
// 时间复杂度：O(n)，n为给定非负整数的个数。
// 空间复杂度：O(1)，使用恒定空间。

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  var n = height.length;
  var area = -Infinity;
  var l = 0, r = n - 1;
  while(l < r) {
    // 当前区域：取两端的最小值 * (r - l) 即长×宽
    var curArea = Math.min(height[l], height[r]) * (r - l);
    // 1.(假设挪动较大边)情况：a[0] < a[n-1]，area = Min(a[0], a[n-1])*size，如果挪动大的一边，可能会造成，Min(a[0], a[n-1]) <= a[0]，而且size - 1 < size，这就意味着算出来的面积更小
    // 2.因此，我们需要挪动较小的那一边，才可能构造更大的area，如果挪动大边，可能会造成上述1的描述
    area = Math.max(area, curArea);
    if (height[l] < height[r]) { // <=也可以
      l++;
    } else {
      r--;
    }
  }
  return area;
}

// 9.2 快慢指针
// 9.2.1 环形链表(141 https://leetcode.cn/problems/linked-list-cycle/)

/**
 * 解法：双指针
 * 思路
 * 类似于两个不同速度的人跑步，如果是围着操场跑，快的总能在多跑一圈后追上慢的；如果是直线跑，除起点外，两人就永远不会相遇了。同样的道理，从链表的起始点开始给出两个快/慢指针，如果有环，则快指针总能追上慢指针；
 * 如果没有环，则快指针提前到链表尾部，结束。
 * 假设给出快/慢指针两个指针，起始位置都指向链表的头节点，两指针的步长分别为 1和2，“链表是否有环”和“快/慢指针能否在除初始化时相遇外，还能再次相遇”两者之间的关系如下。
 * 1.如果快/慢指针除在初始化时相遇外，能够再次相遇，则链表一定有环。因为两指针在某一节点相遇，则证明快指针一定是不止一次经过该节点，而能够多次经过该节点，则一定有环存在。
 * 2.链表有环，则快/慢指针一定能够除在初始化时相遇外，再次相遇。因为快指针比慢指针步长多1，只要进入环内，快指针最多需要移动环的长度R次，即可再次追上慢指针，两者相遇。
 * 3.链表无环，则快指针会提前到达链表的尾部，除初始位置外，两指针不再相遇。反之，链表有环。
 * 通过以上分析可以看出，“链表有/无环”和“快/慢指针除在初始化时相遇外，还能否再次相遇”，两者是等价命题，互为充分必要条件。
 * 所以，如果在链表的头部初始化快/慢两指针，设置它们的移动步长一个为 2、一个为1，如果两指针能够再次相遇，则证明链表有环；否则链表无环。
 * 见下图：./09-images/03-hasCycle.jpg 
 * 如上图所示，下面给出图示例子的算法步骤。
 * 1.将快/慢指针同时初始化为指向第1个节点，如上图中①所示。
 * 2.快指针每次移动步长为2，慢指针每次移动步长为1。慢指针到达值为2的节点时，进入环内，此时快指针指向值为0的节点。如上图中②所示。
 * 3.继续移动，快指针第2次指向值为2的节点，慢指针指向值为0 的节点，如上图中③所示。
 * 4.最后，快/慢指针在值为4的节点处再次相遇，证明有环，如上图中④所示。如果无环，则快指针会提前到达链表终点。
 */

// 复杂度分析
// 1.时间复杂度：O(n)。n为链表中节点的个数。为了分析时间复杂度，考虑两种情况。
// 2.　空间复杂度：O(1)。因为使用了两个节点，所以空间复杂度为O(1)。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var hasCycle = function(head) {
  // 初始化快慢指针
  var fast = head, slow = head;
  // 循环结束条件：因为快指针一次走两格，所以我们仅仅需要判断快指针当前是否为链表尾部，或者快指针的next是否为链表尾部即可
  // 因为1.如果fast为null，说明到了链表结尾，不应该再进入循环，如果fast不为null，但是fast.next为null，fast一次走两格，fast = fast.next.next，那么fast.next.next是不存在的，
  // 所以我们也不能再进入循环(ps: 如果fast.next不为null，fast.next.next为null，那么fast = fast.next.next说明走到尽头了)
  // 1->2->null fast第一次走到了null, 
  // 1->null 这时候就进不去循环
  while(fast !== null && fast.next !== null) {
    // 快指针一次两格，慢指针一次一格
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};

// 9.2.2 无重复字符串的最长子串 (3.https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/)
/**
 * 该问题主要包含两个子问题。
 * 1.从字符串中找到子串。
 * 2.针对子串，查看其中是否有重复的字符。
 * 
 * 一、暴力法省略
 * 二、双指针法I
 * 思路
 * 暴力法需要构造所有的子串，并对其进行检测。字符串"bcdc"已经包含了重复字符，就无须再检测"bcdcc"字符串了。
 * 下面就针对暴力法的两点（构造字符子串和检测字符串是否重复）进行优化。
 * 1.针对判断子串是否含有重复字符的优化。
 * 1.1 在解法一的allUnique函数中使用set对子串进行处理，可以使时间复杂度降低到O(n^2)。
 * 2.针对子串选择的优化。
 * 
 * 对于固定left的情况，只要[left,right)中存在与 right 指针所指字符相同的字符，[left,right+i]中就一定含有重复字符，因此此时可以跳出子循环。
 * 继续查看left+1为起始的子串情况。如下图所示，当right指向第2个c字符时，right继续增加，子串一定包含重复字符c，因此可以跳出子循环。该优化方案相对于解法一，少了上图中的第5、6两步，去了很多字符串的检测。
 * 见图片./09-images/04-lengthOfLongestSubstring.jpg
 */

// 复杂度分析
// 时间复杂度：O(n^2)，其中n是字符串的长度。(两层while循环)
// 空间复杂度：O(min(n,m))，其中n是字符串的长度，m是字符集的大小。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var n = s.length;
  // 初始化结果、左右双指针
  var res = 0, left = 0, right = 0;
  // 用来存储并去重的set，将right划过的每个元素放到set，如果有重复的，则跳出循环
  var settings = new Set();
  while(left < n) {
    // 固定左指针、移动右指针
    right = left;
    rightMove: while(right < n) {
      // 检查s[right]是否在settings中
      if (settings.has(s[right])) {
        // 如果在，则退出循环，让left++重新开始寻找新的字串
        break rightMove;
      } else {
        // 将s[right]放到set里
        settings.add(s[right]);
        // 重新赋值res
        res = Math.max(res, right - left + 1);
        // 如果s[right]没有在set中出现，移动right指针
        right++;
      }
    }
    left++;
    // 清空set，每次重新清空settings
    settings.clear();
  }
  return res;
};

/**
 * 三、双指针法II
 * 思路(下面描述用的例子:abcdccbb)
 * 解法二使检测的子串的个数减少，但是仍然包含了很多不必要的计算，比如对于"abcdc"子串，我们已经判断里面包含了重复字符，此时无须再检测"bcdc"字符串，而只需检测"dc"后面的子串即可，
 * 因此本解法继续对字符串的选择进行进一步筛选。
 * 如下图所示，当right指针指向的字符与[left,right)之间的i字符相同时，只需要找到重复字符的位置i，从该字符处往后查找即可；因为[left,i)的任一字符作为起始字符，与后面组合成无重复字符的字符串长度一定小于[left,right)。
 * 见图片./09-images/04-lengthOfLongestSubstring.jpg
 * 
 * 总结：上面描述的意思就是对于abcdccbb，第一次检测到有重复的字串为abcdc，这时候left为0，right为4，如果像解法2那样从left变为1然后right也从1开始这样bcdc已经被重复检测了，因此，我们找到重复的c，然后让left从d(3)、right
 * (4)开始检测，这样减少了很多重复字串的查询
 */

//  复杂度分析
//  ●　时间复杂度：O(n)，即O(n)，其中n是字符串的长度。
//  ●　空间复杂度：O(min(n,m))，其中n是字符串的长度，m是字符集的大小。

// abcdccbb
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var n = s.length;
  var res = 0, left = 0, right = 0;
  var settings = new Set();
  while(right < n) {
    if (settings.has(s[right])) {
      // 已经含有该字母，说明有重复的
      // 这时候我们移动左指针找到重复的
      moveLeft: while(left < right) {
        if (s[left] === s[right]) {
          // 相等 找到了重复的
          settings.delete(s[left]);
          left++;
          break moveLeft;
        } else {
          // s[left]与s[right]不相等，set中移除s[left]，然后移动左指针
          settings.delete(s[left]);
          left++;
        }
      }
    } 
    // 如果settings没有包含s[right]
    settings.add(s[right]);
    res = Math.max(res, right - left + 1);
    right++;
  }
  return res;
}

/**
 * 解法4.1：滑动窗口法(labuladong)
 * 
 */

// abcdccbb
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var n = s.length;
  // 初始化窗口、左指针、右指针
  var res = 0, left = 0, right = 0;
  // 初始化window窗口，窗口中记录了途径的每个元素的个数。
  var window = new Map();
  // 移动右指针
  while(right < n) {
    var curR = s[right];
    // 将s[right]放到window中（无论重复不重复）
    window.set(curR, (window.get(curR) || 0) + 1);
    right++;
    // 是否缩小窗口：如果s[right]在map中的值大于1那就说明有重复的，需要紧缩窗口
    while(window.get(curR) > 1) {
      var curL = s[left];
      // 挪动左指针，直到s[right]出现的个数为1
      window.set(curL, window.get(curL) - 1);
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
}










// todo 跟上面很类似 滑动窗口法
// var lengthOfLongestSubstring = function(s) {
//   // 初始化window
//   var window = new Map();
//   // 初始化左右指针
//   var left = right = 0;
//   var res = 0;
//   // 循环
//   while(right < s.length) {
//     var curR = s[right];
//     right++;
//     // 进行窗口内数据的一系列更新
//     window.set(curR, (window.get(curR) || 0) + 1);
//     // 判断左侧窗口是否要收缩
//     while(window.get(curR) > 1) {
//       var curL = s[left];
//       left++;
//       window.set(curL, window.get(curL) - 1);
//     }
//     // 这里更新答案
//     // 这里和之前不一样，要在收缩窗口完成后更新res，因为窗口收缩的 while 条件是存在重复元素，换句话说收缩完成后一定保证窗口中没有重复嘛。
//     res = Math.max(res, right - left);
//   }
//   return res;
// };

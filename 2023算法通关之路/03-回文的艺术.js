// 回文，是指正读反读结果都一样的句子，是一种修辞方法和文字游戏。回文又是很多算法教材中经常被提到的一类题目，并且在这些
// 教材中其通常作为栈的一道练习题出现。力扣（LeetCode）中有关回文的题目也很多，单从数据结构这一层面上看就有字符串、数字和链表等相关的回文题。
// 3.1 验证回文串 II
// 680-validPalindrome
// 从数据结构上讲，字符串或许是最简单的回文类型了，我们就先从回文字符串讲起。
// 思路：
// 回文是正读反读结果都一样的句子，因此一种直接的思路是建立两个指针，分别指向头和尾，然后同步地“读”。
// 如果发现不一致，那么说明不是回文，如果两个指针相遇了都没有发现不一致，就说明是一个回文字符串。
// 具体算法如下。
// 1．建立头/尾双指针l和r，分别指向字符串的第一个元素和最后一个元素。
// 2．比较两个指针对应的字符。
// 　如果两个字符相同，则更新双指针，即l+=1，r-=1。
//   如果两个字符不同，则直接返回False。
// 3．重复步骤2。如果l和r交会，则表示该字符串是回文字符串，直接返回True即可
// 代码如下所示。
function isPalindrome(s, n) {
  // 定义双指针
  var l = 0, r = n - 1;
  // 这里可以用l < r，比如是单数012第一轮0与2，第二轮就没必要比较了因为l==r，就一个字母肯定是相同的
  // 比如偶数0123，第一轮03第二轮12，第三轮21就结束了
  while(l < r) {
    if (s[i] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}
// 基于此，我们继续考虑“最多删除一个字符，然后判断其能否成为回文字符串”。对上述回文字符串算法稍加改造，然后加上一些额外的逻辑来解决本题。我们仍然采用头/尾双指针的方法，并且更新指
// 针的逻辑和上面也是一样的，不同之处如下。
// 1．如果头/尾指针对应的字符相同，那么没有必要删除任何字符。
// 2．如果头/尾指针对应的字符不同，那么必须删除一个字符才可能使之回文，并且由于只能删除一次，接下来[只需要判断剩下的字符串是否能够构成回文即可。]
// 具体算法如下。
// 1．建立头/尾双指针l和r，分别指向字符串的第一个元素和最后一个元素。
// 2．如果l和r没有交会，则比较两个指针对应的字符。
//   如果两个字符相同，则更新双指针，即l+=1，r-=1，重复执行步骤2。
//   如果两个字符不同，考虑删除左指针对应的字符或删除右指针对应的字符，并观察删除之后是否可以构成回文字符串。如果可以，则直接返回True；如果不可以，则直接返回False。
// 3．表示该字符串不需要删除字符就已经是回文字符串，直接返回True。
// 代码
var validPalindrome = function(s) {
  // 观察删除一个元素是否还是回文串
  var isPalindrome = function(s, i, n) {
    // 定义双指针
    var l = 0, r = n - 1;
    while(l < r) {
      // 跳过某个元素继续比较，因为能进来此函数说明已经是存在不相等的字串了，如果再出现不相等的 那肯定就不对了
      if (l === i) {
        l += 1;
      } else if (r === i) {
        r -= 1;
      }
      if (s[l] !== s[r]) {
        return false;
      }
      l += 1;
      r -= 1;
    }
    return true;
  }
  var n = s.length;
  var l = 0, r = n - 1;
  while(l < r) {
    if (s[l] !== s[r]) {
      // 如果不相等，需要删除左指针或者右指针对应的字符，并观察删除后是否可以构成回文串
      return isPalindrome(s, l, n) || isPalindrome(s, r, n);
    }
    l += 1;
    r -= 1;
  }
  // 如果没问题，返回true
  return true;
}

// 复杂度分析
// 时间复杂度：虽然使用了一层循环，且循环内部调用了isPalindrome，但由于每次循环isPalindrome最多只会执行两次，因此总的时间复杂度仍然是O(n)，其中n为字符串的长度。
// 空间复杂度：O(1)。

// 3.2 回文链表 快慢指针 (包含206反转链表)
// 链表相对于字符串来说难度会增加一点，但其实二者都属于线性数据结构，因此难度也只表现在写法上，在思路上并没有增加太大的难度
// 234-isPalindrome
// 链表不同于数组（字符串本质上是字符数组），不支持随机访问。对于单链表来说，只有一个指向下一个节点的指针。如果不考虑复杂度，可以将链表进行一次遍历，遍历的同时将值放到一个数组中，然后可
// 以采用字符串的思路去解决。
// 这种算法需要额外的数组存储链表的值，因此这种算法的空间复杂度是O(n)。空间上可以进一步优化。下面介绍一种空间复杂度为O(1)的解法。
// 思路：判断一个字符串是否是回文串可以通过双指针，一个指向字符串开头，一个指向字符串尾部，l++ r--，但是单向链表无法从后往前遍历
// 1.1 我们要做的就是先用快慢指针找到中间节点（区分奇数偶数）然后反转后面的链表，再一起往后移动并对比看是否为回文链表
// 下面看奇数偶数的链表，我们用快慢指针fast快指针走2步，慢指针走1步，然后如果是奇数，走到中间的3，然后再让slow指针走到2 如果为偶数则不需要会走到第二个2
// 1->2->3->2->1->null  slow: 2->1
// 1->2->2->1->null     slow: 2->1
// var reverseList = function(head) { // 1->2->null
//   var pre = head, cur = null;
//   while(pre !== null) {
//     // 找到当前node
//     var temp = pre;
//     pre = pre.next;
//     temp.next = cur;
//     cur = temp;
//   }
//   return cur;
// }
// 我们用Pre记录前面的，然后cur记录当前的，再用temp保存pre.next，然后pre就是当前的，然后pre.next = cur，然后cur变为pre（当前的）
// pre赋值为pre.next
var reverseList = function(head) { // 1->2->null
  var pre = head, cur = null;
  while(pre !== null) {
    // 找到下一个node
    var temp = pre.next;
    pre.next = cur;
    cur = pre;
    pre = temp;
  }
  return cur;
}
// 代码
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) { // 1->2->1->null
  var reverseList = function(head) { // 1->2->null
    var pre = head, cur = null;
    while(pre !== null) {
      // 找到下一个node
      var temp = pre.next;
      pre.next = cur;
      cur = pre;
      pre = temp;
    }
    return cur;
  }
  // 定义快慢指针，慢指针一次走1格，快指针一次走2格
  var slow = fast = head;
  // 1.找到中间位置  fast !== null 对应 1->2->null，fast.next !== null 对应1->2->1->null
  while(fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 偶数：1->2->2->1->null 找到中间的点：2->1->null(slow)
  // 奇数: 1->2->1->null    找到中间的点：2->1->null(slow)
  // 处理奇数的情况，偶数fast为null
  if (fast !== null) {
    // 奇数情况让slow前进一下，上面情况变为1->null
    slow = slow.next;
  }
  // 2.从中间开始反转
  // left从前
  var left = head;
  // right从中间到最后反转，
  // 从slow到最后开始反转
  var right = reverseList(slow);
  // 开始比较
  while(right !== null) {
    if (left.val !== right.val) {
      return false;
    }
    // 前进
    left = left.next;
    right = right.next;
  }
  return true;
};
// 时间复杂度：算法由两部分组成。第1部分是找到中点，这部分的时间复杂度为O(n)；第2部分是从中点分别向左和向右移动，这部
// 分的时间复杂度同样是O(n)，因此总的时间复杂度为O(n)，其中n为节点数
// 空间复杂度：O(1)。

// 数组的快慢指针
// 287-findDuplicate 寻找重复数
// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
// 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
// 示例 1：
// 输入：nums = [1,3,4,2,2]
// 输出：2
// 思路：在线性时间、固定空间复杂度解决这个问题需要佛洛依德的龟兔算法(快慢指针)
// 将数组堪称链表，数组的值为链表的指针。如果存在重复，则表示两个指针指向相同的位置，因此链表存在环，找到重复元素就是找到环开始的地方
// 代码
// 复杂度分析
// 时间复杂度：O(n)。「Floyd 判圈算法」时间复杂度为线性的时间复杂度。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  // 1.先找到环开始地方
  // 初始化快慢指针
  var slow = fast = 0;
  // 进入循环的条件是slow 不等于 fast，或者slow等于0（第一次进入）
  while(slow !== fast || slow === 0) {
    // [1,3,4,2,2]
    // slow 0 1 3 2 4
    // fast 0 3 4 4 4 
    // 找到了下标4，为相遇的位置
    // 慢指针一次走一格
    slow = nums[slow];
    // 快指针一次走两格
    fast = nums[nums[fast]];
  }
  // 2.快指针走向环起点=新的指针走向环起点
  var beginer = 0;
  while(fast !== beginer) {
    // 每次快、begin都走一步
    // 接着上面[1,3,4,2,2]
    // fast    4 2 4 2
    // beginer 0 1 3 2
    fast = nums[fast];
    beginer = nums[beginer];
  }
  return beginer;
};
// 二分查找解决287题
// 思路和算法
// 我们定义 cnt[i] 表示 nums 数组中小于等于 i 的数有多少个，假设我们重复的数是 target，那么 [1,target−1]里的所有数满足 cnt[i]≤i，[target,n] 里的所有数满足 cnt[i]>i，具有单调性。以示例 1 为例，我们列出每个数字的 cnt 值：
// nums  1  2  3  4
// cnt   1  3  4  5
// 示例中重复的整数是2，我们可以看到[1,1]中满足cnt[i]<=i，[2,4]中的数满足cnt[i]>i。
// 如果知道 cnt[] 数组随数字 i 逐渐增大具有单调性（即 target 前 cnt[i]≤i，target 后 cnt[i]>i），那么我们就可以直接利用二分查找来找到重复的数。

// 但这个性质一定是正确的吗？考虑 nums 数组一共有 n+1 个位置，我们填入的数字都在 [1,n] 间，有且只有一个数重复放了两次以上。对于所有测试用例，考虑以下两种情况：
//  1.如果测试用例的数组中 target 出现了两次，其余的数各出现了一次，这个时候肯定满足上文提及的性质，因为小于 target 的数 i 满足 cnt[i]=i，大于等于 target 的数 j 满足 cnt[j]=j+1。
//  2.如果测试用例的数组中 target 出现了三次及以上，那么必然有一些数不在 nums 数组中了，这个时候相当于我们用 target 去替换了这些数，我们考虑替换的时候对 cnt[] 数组的影响。
//  如果替换的数 i 小于 target ，那么 [i,target−1] 的 cnt 值均减一，其他不变，满足条件。如果替换的数 j 大于等于 target，那么 [target,j−1] 的 cnt 值均加一，其他不变，亦满足条件。
// 总结!!!
// 无论元素缺失不缺失，在cnt[i] <= i就说明，i之前包含i都没有重复的
// 然后从cnt[i] > i就说明开始存在重复的了
// 情况2中的被替换的数1小于target
// 2 2 2 3 4 [1-4]
// 1 2 3 4
// 0 3 4 5
// 情况2中的被替换的数5大于target
// 1 2 3 3 3 4 6 [1-6]
// 1 2 3 4 5 6 
// 1 2 5 6 6 7
// 因此我们生成的数组一定具有上述性质的。
var findDuplicate = function(nums) {
  // 二分查找
  var n = nums.length;
  // 初始化左、右指针 [l r] 以及结果ans
  var l = 0, r = n - 1, ans = -1;
  while(l <= r) { // [l, r] 中断条件l > r
    // 因为我们的数组长度为n+1，存储的数为[1-n]，比如[1,3,4,2,2]，n为4，然后我们找中间值就是mid = (0+4) >> 1 = 2，这时候我们的2就是中间值，正常二分查找都是
    // 将数组排序，找mid = (nums[l] + nums[r]) >> 1，然后我们这已经确认了 数组长度n+1，数组最大值为n，数组元素为[1-n]然后我们求中间值就是mid = (l+r)>>1
    var mid = (l + r) >> 1;
    // 统计<=i的值
    var cnt = 0;
    for(var i = 0; i < n; i++) {
      // var a = 0; a += true; a => 1; a += false => a => 1
      // 数字+=true === 数字++，如果数字+=false，数字不变
      // 计算小于mid的值
      cnt += nums[i] <= mid;
    }
    // 无论元素缺失不缺失，在cnt[i] <= i就说明，i之前包含i都没有重复的
    // 然后从cnt[i] > i就说明开始存在重复的了, 不断地收缩有边界
    if (cnt <= mid) {
      // 说明没有重复的，我们移动左指针
      l = mid + 1;
    } else {
      // 出现重复的了，我们需要
      r = mid - 1;
      ans = mid;
    }
  }
  return ans;
}

// 3.3回文数
// 9-isPalindrome
// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
// 这道题可以将数字转换为字符串、但是进阶：要求不让将整数变为字符串
// 1.将整数变为字符串
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  var s = x.toString();
  var n = s.length;
  var left = 0, right = n - 1;
  // 双指针
  while(left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
};
// 2.不将整数变为字符串
// 思路
// 在计算机程序中，整数中的各位数字不能像数组那样被随机访问，因此采用头/尾指针的方法行不通。
// 如果我们能够得到原数的倒序，那么只需要和原数进行比较，观察是否相同就可以了。一个简单的做法是将其转化为字符串然后让字符串逆序，但是这种做法还不如转化为字符串之后直接使用双指针，
// 并且题目进阶中要求不将整数转化为字符串来解决这个问题，问题的关键在于得到原数的倒序。一个思路是从高位到低位依次得到整数每一位上的值，然后从低位到高位构建新的值。
// 不妨假设要判断的整数为x，我们可以通过x%10（取余操作）获取x的最后一位，然后将x整除10得到的商更新到x。这样不断循环直到x等于0为止。最后只要判断从后往前取的数和原来的数是否相同即可。
// 简单来说，检验一个整数是否为回文数，对于正数只需要检查它是否等于它的倒序即可，而构造一个整数的倒序，可以按位处理（这里假设倒序的整数不会越界）。
// 复杂度分析
// 时间复杂度：O(n)，其中n为整数的位数。
// 空间复杂度：O(1)。
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  // 特殊情况：
  // 如上所述，当 x < 0 时，x 不是回文数。
  // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
  // 则其第一位数字也应该是 0
  // 只有 0 满足这一属性
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }
  // 我们不能循环数字，也不能转换字符串，我们如何拿到每个数字
  // 比如191，我们用191 % 10得到个位数1，然后用Math.floor(191 / 10) = 19，然后再用19 % 10得到十位数9，继续Math.floor(19 / 10) = 1,然后用1 % 10得到百位1，然后Math.floor(1 / 10)为0，就结束了
  var originalNumber = x;
  var reverseNumber = 0;
  while(x !== 0) {
    // x % 10得到从个位数开始的数
    var num = x % 10;
    // 去除个位、十位等
    x = Math.floor(x / 10);
    // 重新拼数
    // 初始化为0，然后每次*10 + num
    reverseNumber = reverseNumber * 10 + num;
  }
  return originalNumber === reverseNumber;
}
// 上面算法的改进：对于偶数1221 我们只需要计算出来一半就可以判断，对于奇数我们也是算一半 比如121 我们只需要拿到两边的1即可
// 复杂度分析
// 时间复杂度：O(logn)，对于每次迭代，我们会将输入除以 10，因此时间复杂度为 O(logn)。
// 空间复杂度：O(1)。我们只需要常数空间存放若干变量。
var isPalindrome = function(x) {
  // 边界判断
  // x < 0或者以0为结尾的数字只能是0
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  var reversedNumber = 0;
  // 偶数：1221 
  // x 1221      0   reversedNumber
  // x  122      1   reversedNumber
  // x   12      12  reversedNumber
  // 奇数：12321
  // x 12321      0   reversedNumber
  // x  1232      1   reversedNumber
  // x   123      12  reversedNumber
  // x    12      123  reversedNumber
  // 这时候我们就会发现无论奇数还是偶数 我们只需要执行一半就可以，然后循环条件就是x > reversedNumber 相等的时候偶数
  // 跳出循环，奇数时 x < reversedNumber
  while(x > reversedNumber) {
    reversedNumber = reversedNumber * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  // 偶数：x === reversedNumber 奇数：x === Math.floor(reversedNumber/10) 12 与 123
  return x === reversedNumber || x === Math.floor(reversedNumber/10);
}

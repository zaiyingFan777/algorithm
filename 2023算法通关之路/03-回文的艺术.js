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

// 3.4最长回文子串(中心扩散法+双指针判断是否为回文串)
// 5-longestPalindrome
// 前面讲的是不同数据结构下的回文判断，并且都是难度级别为简单的题目。这一节来讲一道力扣（LeetCode）中难度级别为中等的题目
// 思路：
// 暴力法是直接枚举出所有的子串，然后判断是否回文，用一个变量记录最大回文字符串即可。找出所有子串的时间复杂度为O(n2)，判断回文的时间复杂度为O(n)，因此这种算法的时间复杂度是O(n3)，下
// 面考虑优化。
// --可以使用一种叫作“中心扩展法”的算法。由回文的性质可以知道，回文一定有一个中心点，从中心点向左和向右所形成的字符序列是一样的，并且如果字符串的长度为偶数的话，中心点在中间的两个
// 字符的中间位置（不对应具体字符）；如果是奇数的话，则中心点会在中间的字符上。
// --明白了这一点之后，我们进行一次遍历，然后对于每一个点，我们都认为它或它和它的下一个字符是中心点，然后我们从中心不断扩展即可。毫无疑问，这种算法是完备且正确的。
// 复杂度分析
// 　时间复杂度：枚举所有中心点的时间复杂度为O(n)，检测子串是否为回文子串的函数的时间复杂度仍然是O(n)，因此总的时间复杂度为O(n2)，其中n为字符串的长度。
//   空间复杂度：O(1)。
// 代码
var longestPalindrome = function(s) {
  // 找到以i j为中心的最长回文子串
  var longestSubPalindrome = function(s, i, j) {
    while(i >= 0 && j <= s.length - 1 && s[i] === s[j]) {
      i--;
      j++;
    }
    // 返回最大子回文串 substr(start, length) substring(start, end)(含头不含尾)
    return s.substr(i + 1, j - i - 1);
  }
  var res = '';
  for(var i = 0; i < s.length; i++) {
    // 因为有奇数、偶数所以对于每一个点，我们都认为它和它的下一个字符都是中心点，然后不断扩展
    var oddSubPalindrome = longestSubPalindrome(s, i, i);
    var evenSubPalindrome = longestSubPalindrome(s, i, i + 1);
    res = res.length > oddSubPalindrome.length ? res : oddSubPalindrome;
    res = res.length > evenSubPalindrome.length ? res : evenSubPalindrome;
  }
  return res;
}

// 3.5 最长回文子序列(动态规划)
// 516-longestPalindromeSubseq
// 如果还是采取最长回文子串的思路，问题会比较复杂，因为子序列的数量会很多，我们考虑换一种思路。绝大多数字符串子序列的题目都可以使用动态规划来解决，从而避免让算法达到指数级复杂度。

// 假设字符串中间部分的最长回文子序列长度已经算出，下面比较两侧的字符。
// 1.如果两侧字符相同，那么新的最长回文子序列就加2。
// 2.如果两侧字符不同，那么新的最长回文子序列不变。
// 具体如下。
// 1.初始化一个n行n列的dp数组，其中n表示字符串的长度，dp[i][j]表示子字符串s[i:j]中的最长回文子序列的长度。
// 2.使用两层循环找出所有的子串。
// 3.对每一个子串，我们考虑如下3种情况。
// 3.1 如果子串长度为1，那么dp[i][j]=1。
// 3.2 如果s[i]==s[j]，那么可以进行扩展 dp[i+1][j-1]+2。
// 3.3 如果s[i]!=s[j]，则无法进行扩展，我们取dp[i+1][j]和dp[i][j-1]较大者即可。
// 4.最后返回dp[0][n-1]即可。
// 由于dp[i][…]依赖于dp[i+1][…]，因此外层循环需要从后往前进行遍历。

// 对于一个子序列而言，如果它是回文子序列，并且长度大于2，那么将它首尾的两个字符去除之后，他仍是个回文子序列。因此可以用动态规划的方法计算给定字符串的最长回文子序列。
// 复杂度分析
// 时间复杂度：O(n2)，其中n为字符串长度。
// 空间复杂度：这里使用了O(n2)的二维dp数组来存储中间状态，因此空间复杂度为O(n2)，其中n为字符串长度。
// 代码
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
  var n = s.length;
  // base case 
  // 初始化二维数组dp
  var dp = new Array(n).fill(null).map(() => new Array(n).fill(0));
  // dp[i][i]为单一的串，因此默认值都为1
  for(var i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  // 斜着遍历: 根据已知值斜线45°得到求dp[i][j]，需要dp[i][j-1]和dp[i+1][j]才能得到dp[i][j]
  // dp[0][1] dp[1][2] dp[2][3]
  //   0 1 2 3
  // 0 1
  // 1   1
  // 2     1
  // 3       1
  // for(var l = 2; l <= n; l++) {
  //   for(var i = 0; i <= n - l; i++) {
  //     var j = l + i - 1;
  //     if (s[i] === s[j]) {
  //       // 如果i与j相等，那么i+1、j-1也应该是回文子串
  //       // 因为两边的相等，所以需要加两个字符
  //       dp[i][j] = dp[i+1][j-1] + 2;
  //     } else {
  //       // 不相等，则无法扩展，我们取dp[i][j-1], dp[i+1][j]较大者
  //       dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j]);
  //       }
  //     }
  // }
    
  // 倒着遍历: 根据知道dp[2][2]和dp[3][3]可以得出dp[2][3] 然后再得到dp[1][2]、dp[1][3]
  //   0 1 2 3
  // 0 1
  // 1   1
  // 2     1
  // 3       1
  // 注意：像dp[3][2]这样的其实为0，因为s[3..2]是不存在这样的字符串的
  for(var i = n - 1; i >= 0; i--) {
    for(var j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        // 如果i与j相等，那么i+1、j-1也应该是回文子串
        // 因为两边的相等，所以需要加两个字符
        dp[i][j] = dp[i+1][j-1] + 2;
      } else {
        // 不相等，则无法扩展，我们取dp[i][j-1], dp[i+1][j]较大者
        // 如果它俩不相等，说明它俩不可能同时出现在s[i..j]的最长回文子序列中，那么把它俩分别加入s[i+1..j-1]中，看看哪个子串产生的回文子序列更长即可
        dp[i][j] = Math.max(dp[i][j-1], dp[i+1][j]);
      }
    }
  }
  // 返回从s[0..n-1]从头到尾的最大值
  return dp[0][n-1];
};

// 3.6 超级回文数(1.主动构建回文数，减少判断回文数的时间复杂度2.剪枝)
// 906-superpalindromesInRange
// 如果一个正整数自身是回文数，而且它也是另一个回文数的平方，那么我们称这个数为超级回文数。
// 思路：暴力地对math.floor(Math.sqrt(L))到math.ceil(Math.sqrt(R))范围内的数进行遍历，并逐个判断其是否为回文数，如果是，则继续判断其平方是否是回文即可
// 暴力解法显示时间复杂度已经大于O(Math.sqrt(R)-Math.sqrt(L)),首先是O(Math.sqrt(R)-Math.sqrt(L))遍历一边数字，然后对每个数以及每个数的平方判断其是否为回文，
// 大概也是O(n)，这样时间复杂度应该为O(n * (Math.sqrt(R)-Math.sqrt(L))))。代入题目给出的数据范围大概率会超时，需要考虑[剪枝]
// 剪枝是一种非常重要的思想，常用map存储已经计算过的，减少计算量
// 为什么不直接构造一个回文数Q呢？这样就省去了判断Q是否是一个回文数的过程，直接判断Q的平方即可。
// 这样的话，问题被转化为如何构造回文数，其核心代码如下。
// -------------------------------------------------------------
// 123 => 12321
// i = 1;
// ps: 这里为何要i < 10^5，因为我们题目要求L 和 R 是表示 [1, 10^18) 范围的整数的字符串。并且L和R也是一个回文数的平方，因此999999999为999999999^2小于10^18次方可构建成回文数的最大数
// 因此让i < 10**5, 99999构建出来的回文数为999999999
// while(i < 10**5) { 
//   // 求以10为底的i的对数，比如Math.log10(100) = 2
//   var power = Math.floor(Math.log10(i));
//   var x = i;
//   // r是倒序的i
//   var r = 0;
//   // 求倒叙的x === r
//   while(x > 0) {
//     r = r * 10 + x % 10;
//     x = Math.floor(x / 10);
//   }
//   // **的运算优先级大于*
//   var Q = i * 10 ** power + (r % 10 ** power);
//   // 我们构建了一个回文数Q
//   i += 1;
// }
// -------------------------------------------------------------
// 如果i是123，那么r就应该为321，Q就应该为123×100+321 %100，即12300+21，即12321。
// 回文中心有两种，一种是回文中心为单个字符，一种是回文中心为两个字符，因此上面的算法并不完备，我们还需要考虑回文中心为两个字符的情况。拿上面的例子来说，就少考虑了123321这种情况。
// 我们只需要补充这种情况即可。
// 代码如下所示。
// Q = i * 10 ** (power + 1) + r
// 这种算法的时间复杂度会比上面的稍微好一点，可以通过力扣（LeetCode）所有的测试用例
// 复杂度分析
// 时间复杂度：O((4^√W * logW)，其中W为R的上限，在这道题中就是10^18，而18的1/4是4.5，因此代码中循环到105是足够的。
// 空间复杂度：用seen来存储所有出现过的超级质数，因此空间复杂度为(O(cnt))，其中cnt为[L,R]间的超级回文数的个数，也就是问题的解
// 代码
/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
// 解题思路： 1、如果一个回文数开平方是回文数 那么这个回文数是超级回文数，换句话说 一个数是回文数，同时它的平方是回文数，那么它的平方是超级回文数 
// 2、 回文数是轴对称的 所以取其中一半自增，循环体中就只有回文数，减少不必要循环
var superpalindromesInRange = function(left, right) {
  // 判断是否为回文数
  var isPalindrome = function(s) {
    var l = 0, r = s.length - 1;
    while(l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  // 结果
  var cnt = 0;
  // 剪枝备份，减少重复计算
  var seen = new Map();
  // 1.我们转换思路，创造出回文数，这样就减少一部分判断是否是回文数的时间复杂度
  // 因为我们的L、R范围是[1, 10^18)，然后这个数开平方也是一个回文数，那么开平方的数应该[1, 999999999]，因此我们
  // 为了构建最大为999999999的回文数，有个范围就是[1, 10^5)最大为99999，99999可构建的最大的数为999999999
  var i = 1;
  while(i < 10 ** 5) {
    // log10(100) => 2
    var power = Math.floor(Math.log10(i));
    // 保存要变为回文的数
    var x = i;
    // 倒序i的数
    var r = 0;
    while(x > 0) {
      r = r * 10 + x % 10;
      x = Math.floor(x / 10);
    }
    // 以个位数为中心的回文数
    // 将i转换成回文数 123 => 12321，然后计算Q的平方
    // **的计算优先级大于*
    // 防止整形溢出
    // js超过Number.MAX_SAFE_INTEGER（9007199254740991）显示的时候会出现失去精度的问题，所以如果超过16位我们用BigInt
    // 如果是两个数相乘>17位可以采用下面这种方式计算,
    // var Q = (i * 10 ** power + r % 10 ** power) ** 2;
    // var Q = BigInt(i * 10 ** power + r % 10 ** power) * BigInt(i * 10 ** power + r % 10 ** power);
    var Q = BigInt((i * 10 ** power + r % 10 ** power).toString()) * BigInt((i * 10 ** power + r % 10 ** power).toString());
    // 如果计算出来的Q > right
    if (Q > right) {
      // 当计算的Q超出R了，直接返回cnt
      return cnt;
    }
    if (Q >= left && isPalindrome(Q.toString())) {
      if (!seen.has(Q)) {
        cnt++;
        seen.set(Q, true);
      }
    }
    // 以个位个位为中心的回文数 123321 并计算他的平方看是否再L和R范围内
    // Q = (i * 10 ** (power + 1) + r) ** 2;
    Q = BigInt((i * 10 ** (power + 1) + r).toString()) * BigInt((i * 10 ** (power + 1) + r).toString());
    if (Q >= left && Q <= right && isPalindrome(Q.toString())) {
      if (!seen.has(Q)) {
        cnt++;
        seen.set(Q, true);
      }
    }
    i++;
  }
  return cnt;
};
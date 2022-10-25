// 23. 合并K个升序链表
// 给你一个链表数组，每个链表都已经按升序排列。
//
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。
//
// 示例 1：
//
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
//
// 示例 2：
// 输入：lists = []
// 输出：[]
//
// 示例 3：
// 输入：lists = [[]]
// 输出：[]
//
// 提示：
//
// k == lists.length
// 0 <= k <= 10^4
// 0 <= lists[i].length <= 500
// -10^4 <= lists[i][j] <= 10^4
// lists[i] 按 升序 排列
// lists[i].length 的总和不超过 10^4

// 思路1：将Lists的链表的所有节点放到数组里然后排序，再顺序遍历数组组成新的链表
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // 创建一个数组用来存储
  var help = [];
  for(var i = 0; i < lists.length; i++) {
    // 取出当前链表
    var curr = lists[i];
    // 循环链表，将链表的所有元素放到help里
    while(curr) {
      help.push(curr);
      curr = curr.next;
    }
  }
  // 数组排序
  help.sort((a, b) => a.val - b.val);
  // 循环help数组将help数组串起来
  var j = 1; // 是为了将变量提取出来在下面做判断，而且通过j-1可以取到help[0]
  for(; j < help.length; j++) {
    // 将j-1 与 j连起来
    help[j - 1].next = help[j];
  }
  // 处理help j也就是最后一个链表，我们需要将链表的最后一位变为Null, 如果lists为空，help[0]需要置为null
  help[j - 1] !== undefined ? (help[j - 1].next = null) : (help[0] = null);
  return help[0];
};

// 思路2：顺序合并  时间复杂度 O(k^2n) (k为次数，n为链表长度) 。空间复杂度O(1)
// 遍历lists链表数组，定义一个ans初始值为null，让ans与lists[i]分别合并，得到最后的结果
// 我们可以想到一种最朴素的方法：用一个变量 ans 来维护以及合并的链表，第 i 次循环把第 i 个链表和 ans 合并，答案保存到 ans 中。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // 合并两条链表
  // 具体逻辑参看mergeTwoLists.js
  var mergeTwoLists = function (list1, list2) {
    if (list1 === null || list2 === null) {
      // 如果有一个为null，那就返回另一个，如果都为null则直接返回null
      return list1 !== null ? list1 : list2;
    }
    // 创建一个链表初始值为1，为了方便后续操作
    var dummy = new ListNode(-1), p = dummy;
    var p1 = list1, p2 = list2;
    while(p1 !== null && p2 !== null) {
      if (p1.val > p2.val) {
        p.next = p2;
        p2 = p2.next;
      } else {
        p.next = p1;
        p1 = p1.next;
      }
      p = p.next;
    }
    // 检查p1或p2谁不为null，则直接赋值给p的next
    p.next = (p1 !== null ? p1 : p2);
    return dummy.next;
  }
  var ans = null;
  // 循环lists，将lists[i]分别与ans合并
  for(var i = 0; i < lists.length; i++) {
    ans = mergeTwoLists(ans, lists[i]);
  }
  return ans;
}

// 思路3：分治合并,就比如数组排序并归排序比冒泡的优化
// 求两个数的mid值：1.Math.floor((start+end)/2) 2.((end - start) >> 1) + start; 3.(start + end) >> 1
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // 合并两条链表
  var mergeTwoLists = function (list1, list2) {
    if (list1 === null || list2 === null) {
      // 如果有一个为null，那就返回另一个，如果都为null则直接返回null
      return list1 !== null ? list1 : list2;
    }
    // 创建一个链表初始值为1，为了方便后续操作
    var dummy = new ListNode(-1), p = dummy;
    var p1 = list1, p2 = list2;
    while(p1 !== null && p2 !== null) {
      if (p1.val > p2.val) {
        p.next = p2;
        p2 = p2.next;
      } else {
        p.next = p1;
        p1 = p1.next;
      }
      p = p.next;
    }
    // 检查p1或p2谁不为null，则直接赋值给p的next
    p.next = (p1 !== null ? p1 : p2);
    return dummy.next;
  }
  // 先分后合
  var merge = function (lists, left, right) {
    // base case
    // 相等
    if (left === right) return lists[left];
    // 越界
    if (left > right) return null;
    // 找到中间值
    var mid = (left + right) >> 1;
    // 先往下分解，再合并链表
    return mergeTwoLists(merge(lists, left, mid), merge(lists, mid + 1, right));
  }
  return merge(lists, 0, lists.length - 1);
}
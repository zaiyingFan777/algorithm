// 21. 合并两个有序链表
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
// 示例 1：
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
//
// 示例 2：
// 输入：l1 = [], l2 = []
// 输出：[]
//
// 示例 3：
// 输入：l1 = [], l2 = [0]
// 输出：[0]
//
// 提示：
//
// 两个链表的节点数目范围是 [0, 50]
// -100 <= Node.val <= 100
// l1 和 l2 均按 非递减顺序 排列

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  // 创建一个具有占位符的dummy，以及p去操作dummy(这样我们只操作p然后去修改dummy，最后只返回dummy即可)
  var dummy = new ListNode(-1), p = dummy;
  // 创建p1, p2来操作list1，list2
  var p1 = list1, p2 = list2;
  // 当两个链表有一个为null或者都为null的时候结束循环
  while(p1 !== null && p2 !== null) {
    // 比较p1与p2的大小
    // 将值较小的的节点接到 p 指针
    // 将整条链表放到p后面
    if (p1.val > p2.val) {
      p.next = p2;
      p2 = p2.next;
    } else {
      // p1 <= p2
      p.next = p1;
      p1 = p1.next;
    }
    // p 指针不断前进
    p = p.next;
  }
  // 检查p1、p2，不为Null的插到p的后面
  if (p1 !== null) {
    p.next = p1;
  }
  if (p2 !== null) {
    p.next = p2;
  }
  return dummy.next;
};

// var mergeTwoLists = function(list1, list2) {
//   // 创建一个具有占位符的dummy，以及p去操作dummy(这样我们只操作p然后去修改dummy，最后只返回dummy即可)
//   var dummy = new ListNode(-1), p = dummy;
//   // 创建p1, p2来操作list1，list2
//   var p1 = list1, p2 = list2;
//   // 当两个链表有一个为null或者都为null的时候结束循环
//   while(p1 !== null && p2 !== null) {
//     // 比较p1与p2的大小
//     // 将值较小的的节点接到 p 指针
//     // 将p1.val或p2.val生成的ListNode放到p.next上
//     if (p1.val > p2.val) {
//       p.next = new ListNode(p2.val);
//       p2 = p2.next;
//     } else {
//       // p1 <= p2
//       p.next = new ListNode(p1.val);
//       p1 = p1.next;
//     }
//     // p 指针不断前进
//     p = p.next;
//   }
//   // 检查p1、p2，不为Null的插到p的后面
//   if (p1 !== null) {
//     p.next = p1;
//   }
//   if (p2 !== null) {
//     p.next = p2;
//   }
//   return dummy.next;
// };
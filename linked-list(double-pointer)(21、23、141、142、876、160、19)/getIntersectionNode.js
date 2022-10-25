// 160

// 思路：p1一直走，p2一直走，然后走到头后p1 = p2, p2 = p1，然后p1 == p2 的时候找到相交点

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  var p1 = headA, p2 = headB;
  // 找到p1===p2结束循环
  while(p1 !== p2) {
    // p1 走一步，如果走到 A 链表末尾，转到 B 链表
    if (p1 !== null) {
      p1 = p1.next;
    } else {
      p1 = headB;
    }
    // p2 走一步，如果走到 B 链表末尾，转到 A 链表
    if (p2 !== null) {
      p2 = p2.next;
    } else {
      p2 = headA;
    }
  }
  return p1;
};
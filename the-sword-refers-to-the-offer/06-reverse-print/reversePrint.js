// 剑指 Offer 06. 从尾到头打印链表
// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

// 示例 1：
// 输入：head = [1,3,2]
// 输出：[2,3,1]

// 限制：
// 0 <= 链表长度 <= 10000

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  var res = [];
  var traverse = function(head) {
    if (head === null) return;
    traverse(head.next);
    // 后序位置，最后遍历的最先进入res.push
    res.push(head.val);
  }
  traverse(head);
  return res;
};
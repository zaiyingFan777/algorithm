// 25. K 个一组翻转链表
// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
//
// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
//
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
//
// 示例 1：
// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]
//
// 示例 2：
// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]
//
// 提示：
// 链表中的节点数目为 n
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000
//
// 进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？

// 思路：我们外层采用递归的形式，reverseKGroup，但是里面反转我们采用迭代式的

// 迭代处理 [a,b) 含左不含右
var reverse = function (a, b) {
  var cur = a, pre = null;
  while(cur !== b) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  // 如果链表是k的整数倍最后剩余一个null，不需要反转直接return
  if (head === null) return null;
  var a = b = head;
  // 1->2->3->4->5->null 比如k为2，我们循环两次每次让b = b.next，所以循环两次后a(1->...)b(3->...)
  // 反转的为1->2所以[a,b)，b这边是闭合区间
  for(var i = 0; i < k; i++) {
    // base case，如果剩余的不够k，我们直接返回即可
    if (b === null) return head;
    b = b.next;
  }
  var newHead = reverse(a, b);
  // a已经反转到最后面了 ，让a去连接后面的
  a.next = reverseKGroup(b, k);
  return newHead;
};
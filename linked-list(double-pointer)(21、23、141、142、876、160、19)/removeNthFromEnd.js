// 19. 删除链表的倒数第 N 个结点
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
//
// 示例 1：
// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]
//
// 示例 2：
// 输入：head = [1], n = 1
// 输出：[]
//
// 示例 3：
// 输入：head = [1,2], n = 1
// 输出：[1]
//
// 提示：
//
// 链表中结点的数目为 sz
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

// 思路：首先我们给head前面加一个虚拟头节点，

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  // 找到倒数第n个节点(包含虚拟头节点)
  var findFromEnd = function (head, k) {
    var p1 = head;
    // 先让p1走k步
    for(var i = 0; i < k; i++) {
      p1 = p1.next;
    }
    var p2 = head;
    // 让p1和p2同时走，让p1走到null，这时候p1总共走了n步从head虚拟头节点走到了null
    // 然后p2走了n-k步（倒数第k个元素，也就是正数从虚拟头节点走了n-k步）
    while(p1 !== null) {
      p1 = p1.next;
      p2 = p2.next;
    }
    return p2;
  }
  // 给head添加虚拟头节点
  var dummy = new ListNode(-1);
  dummy.next = head;
  // 我们要删除倒数第n个节点，需要我们找到倒数第n+1个节点
  var x = findFromEnd(dummy, n+1);
  // 删除倒数第n个节点
  x.next = x.next.next;
  return dummy.next;
};
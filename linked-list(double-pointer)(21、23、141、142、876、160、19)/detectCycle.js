// 142. 环形链表 II
// 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
// 不允许修改 链表。
//
// 示例 1：
//
// 输入：head = [3,2,0,-4], pos = 1
// 输出：返回索引为 1 的链表节点
// 解释：链表中有一个环，其尾部连接到第二个节点。
//
// 示例 2：
//
// 输入：head = [1,2], pos = 0
// 输出：返回索引为 0 的链表节点
// 解释：链表中有一个环，其尾部连接到第一个节点。
//
// 示例 3：
//
// 输入：head = [1], pos = -1
// 输出：返回 null
// 解释：链表中没有环。
//
// 提示：
//
// 链表中节点的数目范围在范围 [0, 104] 内
// -105 <= Node.val <= 105
// pos 的值为 -1 或者链表中的一个有效索引

// 思路：通过快慢指针（快2慢1）判断是否有环，如果没有环返回null，如果有环找到相交点fast == slow，这时候slow走了k步，fast走了2k步，多走了k步说明k是环的整数倍
// 然后我们定义相交点到环起点距离为m，这时候slow走了k，也就是从起点到环起点的距离为k-m，然后从相交点到环起点也为k-m所以让slow = head，然后同时slow、fast一起走就找到了起点位置

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  // 定义快慢指针指向head
  var slow = fast = head;
  // 寻找相交点以及判断是否有环
  while(fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    // 如果有相交点说明有环，退出循环
    if (slow === fast) break;
  }
  // fast遇到空指针说明没有环
  if (fast === null || fast.next === null) {
    return null;
  }
  // 让slow重新指向head
  slow = head;
  while(slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};

// 92. 反转链表 II
// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
//
// 示例 1：
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]
//
// 示例 2：
// 输入：head = [5], left = 1, right = 1
// 输出：[5]
//
// 提示：
//
// 链表中节点数目为 n
// 1 <= n <= 500
// -500 <= Node.val <= 500
// 1 <= left <= right <= n

// 思路：这里采用递归的方式，时间复杂度为O(n)，空间复杂度O（n）（递归解法需要堆栈，空间复杂度是 O(N)）

// 一、
// 递归实现反转整条链表 1->2->3->null
var reverse = function (head) {
  // base case
  // 当3->null的时候，head.next为null的时候返回head即可
  if (head.next === null) {
    return head;
  }
  // 其实我们没必要代入到递归思想中只需要 1->reverse(2->3->null)，
  var last = reverse(head.next);
  // 例如将1.next.next 1.next为2->.. 我们让2->1(head)，然后让1(head)指向null即可
  head.next.next = head;
  head.next = null;
  return last;
}

// 二、理解了纯递归反转全部链表，这时候我们考虑反转前m项链表
// 1->2->3->4->5->null n为3 结果为3->2->1->4->5->null
// 其实这个也好理解，上面的例子 我们需要一个变量来保存n+1之后的链表
// 我们定义successor变量接受4->5->null，然后反转1->2->3即可
var successor = null;
var reverseN = function (head, n) {
  // 是递归都需要有出口
  if (n === 1) {
    // 当n为1的时候，我们需要将head.next保存到successor变量上，因为n=1的时候为最后一个了
    successor = head.next;
    return head;
  }
  // 本质是反转1-n
  var last = reverseN(head.next, n - 1);
  // 这里跟反转全部链表的区别就是，我们需要将head.next指向successor
  head.next.next = head;
  head.next = successor;
  return last;
}

// 三、理解了上面reverseN,前n个，我们来思考1 <= left <= right <= n
// 1->2->3->4->5->null m = 2 n = 4，结果为1->4->3->2->5->null
// 我们可以理解为让m,n每次递归减1，直到m为1的时候其实就相当于从2（上面的链表）往后数n(此时为3)到1，每次n-1，这样的反转链表
// 如果m == 1，就相当于反转链表开头的n个元素嘛
//
var reverseBetween = function (head, left, right) {
  // base case 当left为1的时候，往后反转right个
  if (left === 1) {
    return reverseN(head, right);
  }
  // 因为m前不需要反转，只需要用.next来接受reverseBetween即可
  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {

};
// 234. 回文链表
// 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
//
// 示例 1：
// 输入：head = [1,2,2,1]
// 输出：true
//
// 示例 2：
// 输入：head = [1,2]
// 输出：false
//
// 提示：
// 链表中节点数目在范围[1, 105] 内
// 0 <= Node.val <= 9
//
// 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

// 常规思路：我们将链表反转再对比，或者将链表的节点放到数组里去对比，一次循环O(n)肯定不能解决此问题，空间O（1）也不满足

// 思路1：判断一个字符串是否是回文串可以通过双指针，一个指向字符串开头，一个指向字符串尾部，l++ r--，但是单向链表无法从后往前遍历
// 1.1 我们要做的就是先用快慢指针找到中间节点（区分奇数偶数）然后反转后面的链表，再一起往后移动并对比看是否为回文链表
// 下面看奇数偶数的链表，我们用快慢指针fast快指针走2步，慢指针走1步，然后如果是奇数，走到中间的3，然后再让slow指针走到2 如果为偶数则不需要会走到第二个2
// 1->2->3->2->1->null  slow: 2->1
// 1->2->2->1->null     slow: 2->1

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  // 1.快慢指针找到需要反转的中间往后的链表
  var fast = slow = head;
  while(fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  // 如果是奇数，fast不为null，需要让slow再往后移动一格
  if (fast !== null) {
    slow = slow.next;
  }
  // 2.反转中间到后面的链表
  var left = head;
  var right = reverse(slow);
  // 3.对比
  while(right !== null) {
    if (left.val !== right.val) {
      return false;
    }
    // 同时往后挪动
    left = left.next;
    right = right.next;
  }
  return true;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 反转链表的方法
var reverse = function (head) {
  var pre = null, cur = head;
  while(cur !== null) {
    // 用next存储cur.next
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

// 思路2 我们采用递归后序遍历的方式类似于函数的调用栈，可以让我们从后往前对比
// 这种会对比链表的全部节点
// 2.1定义一个left变量，然后不停的递归递归到链表结尾，当right === null的时候，返回true
// 2.2 然后(遍历到链表结尾后)从后序位置开始开始比较
// 比如 1->2->1->null
// left: 1->2->1->null 递归到null(返回true)，后序位置拿到了res = true(traverse(null)这时候节点为1->null)，这个时候我们判断res && (left.val(1->2->1) === right.val(1->null)) (res && 1 == 1)
// 然后让left = left.next前进一格(left为2->1->null)，并返回true, 然后进入到traverse(1->null)的时候(节点为2->1->n)，因为上一步已经算出来了true，并且left.val为2，right.val为2所以相等
// 然后left = left.next(left为1->null)，这时候回退到traverse(2->1->null)这时候的节点为1->2->1->n，这时候left.val为1，然后right.val也为1，所以Ok
//
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  // 递归遍历链表框架
  var traverse = function (right) {
    if (right === null) return true;
    var res = traverse(right.next);
    // 后序位置
    // 这里先看res，如果res为false我们也没必要去对比了
    res = res && (left.val === right.val);
    // 让left前进
    left = left.next;
    return res;
  }
  var left = head;
  return traverse(head);
};



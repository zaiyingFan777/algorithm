// 146. LRU 缓存

// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4


// 提示：

// 1 <= capacity <= 3000
// 0 <= key <= 10000
// 0 <= value <= 105
// 最多调用 2 * 105 次 get 和 put

// es6中set类型是有序的。set类型是es6中新增的有序列表集合，其中包含了一些相互独立的非重复值；
// set的遍历顺序就是插入顺序，set保存的一个函数列表调用时，就是按照指定的顺序进行调用，因此set类型是有序的。

// 哈希表查找快，但是数据无固定顺序；链表有顺序之分，插入删除快，但是查找慢。所以结合一下，形成一种新的数据结构：哈希链表 LinkedHashMap。
// 单向链表删除其中一个需要顺序查找，因为你不知道你删除的这个node的上一个，但是双向链表是可以的。

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  // key -> Node(key, val)
  this.map = new Map();
  // 存储
  // Node(k1, v1) <-> Node(k2, v2)...
  this.cache = new DoubleList();
  // 最大容量
  this.cap = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 先检查是否存在key
  if (!this.map.has(key)) {
    return -1;
  }
  // 存在
  // 将该数组提升为最近使用的
  this.makeRecently(key);
  // 返回key对应的val
  return this.map.get(key).val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 先检查是否存在
  if (this.map.has(key)) {
    // 存在
    // 删除旧的数据
    this.deleteKey(key);
    // 新插入的数据成为最近使用的数据
    this.addRecently(key, value);
    return;
  }
  // 如果不存在，如果满了，先删除最久不用的，然后添加
  // 如果cap已经满了
  if (this.cap === this.cache.size) {
    // 删除最久未使用的
    this.removeLeastRecently();
  }
  this.addRecently(key, value);
};

// 由于我们要同时维护一个双链表 cache 和一个哈希表 map，很容易漏掉一些操作，比如说删除某个 key 时，在 cache 中删除了对应的 Node，但是却忘记在 map 中删除 key。
// 解决这种问题的有效方法是：在这两种数据结构之上提供一层抽象 API

// 将某个 key 提升为最近使用的
LRUCache.prototype.makeRecently = function (key) {
  // 找到该元素
  var x = this.map.get(key);
  // 先从链表中删除
  this.cache.remove(x);
  // 再插入到对位
  this.cache.addLast(x);
};

// 添加最近使用的元素
// 为什么没有判断长度，因为我们在Put的时候是先删除，再添加的
LRUCache.prototype.addRecently = function (key, val) {
  var x = new Node(key, val);
  // 链表尾部就是最近使用的元素
  this.cache.addLast(x);
  // 别忘了在map中添加key的映射
  this.map.set(key, x);
}

// 删除某一个 key
LRUCache.prototype.deleteKey = function (key) {
  // 先拿到元素
  var x = this.map.get(key);
  // 从链表中删除
  this.cache.remove(x);
  // 从map中删除key
  this.map.delete(key);
}

// 删除最久未使用的元素
LRUCache.prototype.removeLeastRecently = function () {
  // 链表头部的第一个元素就是最久未使用的
  var deleteNode = this.cache.removeFirst();
  // 同时别忘了从mao中删除他的key
  var deleteKey = deleteNode.key;
  this.map.delete(deleteKey);
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// 双向链表所用的节点
var Node = function(k, v) {
  this.key = k;
  this.val = v;
  this.prev = null;
  this.next = null;
}

// 双向链表
// 最新的在链表末尾，时间最久没操作的放在链表前头
var DoubleList = function() {
  // 初始化双向链表的数据
  // head, tail
  this.head = new Node(0, 0);
  this.tail = new Node(0, 0);
  // 头尾相连
  this.head.next = this.tail;
  this.tail.prev = this.head;
  // size
  this.size = 0;
}

// 在链表尾部添加节点x，时间O(1)
DoubleList.prototype.addLast = function (x) {
  // 先将x的prev,next连接上
  x.prev = this.tail.prev;
  x.next = this.tail;
  // x前面的元素连接x
  this.tail.prev.next = x;
  // tail连接x
  this.tail.prev = x;
  this.size++;
};

// 删除链表中的x节点(x一定存在)
// 由于是双链表且给的是目标Node节点，时间O(1)
DoubleList.prototype.remove = function (x) {
  x.prev.next = x.next;
  x.next.prev = x.prev;
  this.size--;
}

// 删除链表中第一个节点，并返回该节点，时间 O(1)
DoubleList.prototype.removeFirst = function (x) {
  // 判断是否只有head和tail元素
  if (this.head.next == this.tail) {
    return null;
  }
  var first = this.head.next;
  this.remove(first);
  return first;
}
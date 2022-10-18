// 460. LFU 缓存
// 请你为 最不经常使用（LFU）缓存算法设计并实现数据结构。

// 实现 LFUCache 类：
// LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象
// int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1 。
// void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最近最久未使用 的键。
// 为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。使用计数最小的键是最久未使用的键。

// 当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。

// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 示例：

// 输入：
// ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
// 输出：
// [null, null, null, 1, null, -1, 3, null, -1, 3, 4]

// 解释：
// // cnt(x) = 键 x 的使用计数
// // cache=[] 将显示最后一次使用的顺序（最左边的元素是最近的）
// LFUCache lfu = new LFUCache(2);
// lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
// lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
// lfu.get(1);      // 返回 1
//                  // cache=[1,2], cnt(2)=1, cnt(1)=2
// lfu.put(3, 3);   // 去除键 2 ，因为 cnt(2)=1 ，使用计数最小
//                  // cache=[3,1], cnt(3)=1, cnt(1)=2
// lfu.get(2);      // 返回 -1（未找到）
// lfu.get(3);      // 返回 3
//                  // cache=[3,1], cnt(3)=2, cnt(1)=2
// lfu.put(4, 4);   // 去除键 1 ，1 和 3 的 cnt 相同，但 1 最久未使用
//                  // cache=[4,3], cnt(4)=1, cnt(3)=2
// lfu.get(1);      // 返回 -1（未找到）
// lfu.get(3);      // 返回 3
//                  // cache=[3,4], cnt(4)=1, cnt(3)=3
// lfu.get(4);      // 返回 4
//                  // cache=[3,4], cnt(4)=2, cnt(3)=3


// 提示：

// 0 <= capacity <= 104
// 0 <= key <= 105
// 0 <= value <= 109
// 最多调用 2 * 105 次 get 和 put 方法

// 我们这里用set，set是有序的
// java的hashset是无序的

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  // key到val的映射，我们称为KV表
  this.keyToVal = new Map();
  // key到freq的映射，我们成为KF表
  this.keyToFreq = new Map();
  // freq到key列表的映射，我们成为FK表
  this.freqToKeys = new Map();
  // 记录最小的频次
  this.minFreq = 0;
  // 记录LFU缓存的最大容量
  this.cap = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (!this.keyToVal.has(key)) {
    // 不存在返回-1
    return -1;
  }
  // 存在
  // 提升key对应的freq
  this.increaseFreq(key);
  return this.keyToVal.get(key);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.cap <= 0) return;

  // 如果存在，我们只需要更新
  if (this.keyToFreq.has(key)) {
    this.keyToVal.set(key, value);
    // key 对应的 freq 加一
    this.increaseFreq(key);
    return;
  }

  // 如果不存在
  // 先检查cap与map的size
  if (this.cap <= this.keyToFreq.size) {
    // 如果cap已满，先删除最久没有用过的那个freq最小的
    this.removeMinFreqKey();
  }
  // 如果没满
  // 插入 KV 表
  this.keyToVal.set(key, value);
  // 插入 KF 表
  this.keyToFreq.set(key, 1);
  // 插入 FK 表
  !this.freqToKeys.has(1) && this.freqToKeys.set(1, new Set());
  this.freqToKeys.get(1).add(key);
  // 插入新 key 后最小的 freq 肯定是 1
  this.minFreq = 1;
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// 提升
LFUCache.prototype.increaseFreq = function (key) {
  var freq = this.keyToFreq.get(key);
  // 更新 KF 表
  this.keyToFreq.set(key, freq + 1);
  // 将key在FK表中先删除
  this.freqToKeys.get(freq).delete(key);
  // 然后再插入freq+1中
  !this.freqToKeys.has(freq + 1) && this.freqToKeys.set(freq + 1, new Set());
  this.freqToKeys.get(freq + 1).add(key);
  // 如果freq对应的列表空了，移除这个freq
  if (this.freqToKeys.get(freq).size === 0) {
    this.freqToKeys.delete(freq);
    // 如果这个freq恰好是minFreq，更新minFreq
    if (freq === this.minFreq) {
      this.minFreq++;
    }
  }
}

// 删除最小的freq最久不用的
LFUCache.prototype.removeMinFreqKey = function () {
  // 被删除的列表
  var keyList = this.freqToKeys.get(this.minFreq);
  // 其中最先被插入的那个key就是该被淘汰的
  var deleteKey = keyList.values().next().value;
  // 更新FK表
  keyList.delete(deleteKey);
  // 如果更新完KF表，keyList变空了
  if (keyList.size === 0) {
    this.freqToKeys.delete(this.minFreq);
    // 这里没必要更新minFreq的值，因为使用removeMinFreqKey方法的时候，就会新插入一个，新插入的this.minFreq肯定为1
  }
  // 更新KV表
  this.keyToVal.delete(deleteKey);
  // 更新KF表
  this.keyToFreq.delete(deleteKey);
}
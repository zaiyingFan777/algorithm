## Union-Find 并查集算法详解及运用(参考链接：https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247497087&idx=1&sn=6d68414edf4a19e2d1fba94210851eeb&scene=21#wechat_redirect)

今天讲讲 Union-Find 算法，也就是常说的并查集（Disjoint Set）结构，主要是解决图论中「动态连通性」问题的。名词很高端，其实特别好理解，等会解释，另外这个算法的应用都非常有趣。

说起这个 Union-Find，应该算是我的「启蒙算法」了，因为《算法 4》的开头就介绍了这款算法，可是把我秀翻了，感觉好精妙啊！

后来刷了 LeetCode，并查集相关的算法题目都非常有意思，而且《算法 4》给的解法竟然还可以进一步优化，只要加一个微小的修改就可以把时间复杂度降到 O(1)。

废话不多说，直接上干货，先解释一下什么叫动态连通性吧。

### 一、问题介绍

简单说，动态连通性其实可以抽象成给一幅图连线。比如下面这幅图，总共有 10 个节点，他们互不相连，分别用 0~9 标记：

![](1.jpg)

现在我们的 Union-Find 算法主要需要实现这两个 API：

```
class UF {
  /* 将 p 和 q 连接 */
  public void union(int p, int q);
  /* 判断 p 和 q 是否连通 */
  public boolean connected(int p, int q);
  /* 返回图中有多少个联通分量 */
  public int count();
}
```

这里所说的「连通」是一种等价关系，也就是说具有如下三个性质：

1、自反性：节点 p 和 p 是连通的。

2、对称性：如果节点 p 和 q 连通，那么 q 和 p 也连通。

3、传递性：如果节点 p 和 q 连通，q 和 r 连通，那么 p 和 r 也连通。

比如说之前那幅图，0 ～ 9 任意两个不同的点都不连通，调用 connected 都会返回 false，连通分量为 10 个。

如果现在调用 union(0, 1)，那么 0 和 1 被连通，连通分量降为 9 个。

再调用 union(1, 2)，这时 0,1,2 都被连通，调用 connected(0, 2)也会返回 true，连通分量变为 8 个。

![](2.jpg)

判断这种「等价关系」非常实用，比如说编译器判断同一个变量的不同引用，比如社交网络中的朋友圈计算等等。

这样，你应该大概明白什么是动态连通性了，Union-Find 算法的关键就在于 union 和 connected 函数的效率。那么用什么模型来表示这幅图的连通状态呢？用什么数据结构来实现代码呢？

### 二、基本思路

注意我刚才把「模型」和具体的「数据结构」分开说，这么做是有原因的。因为我们使用森林（若干棵树）来表示图的动态连通性，用数组来具体实现这个森林。

怎么用森林来表示连通性呢？我们设定树的每个节点有一个指针指向其父节点，如果是根节点的话，这个指针指向自己。比如说刚才那幅 10 个节点的图，一开始的时候没有相互连通，就是这样：

![](3.jpg)

```
class UF {
  // 记录连通分量
  private int count;
  // 节点 x 的父节点是 parent[x]
  private int[] parent;

  /* 构造函数，n 为图的节点总数 */
  public UF(int n) {
    // 一开始互不连通
    this.count = n;
    // 父节点指针初始指向自己
    parent = new int[n];
    for (int i = 0; i < n; i++)
      parent[i] = i;
  }

  /* 其他函数 */
}
```

**如果某两个节点被连通，则让其中的（任意）一个节点的根节点接到另一个节点的根节点上**：

![](4.jpg)

```
public void union(int p, int q) {
  int rootP = find(p);
  int rootQ = find(q);
  if (rootP == rootQ)
    return;
  // 将两棵树合并为一颗
  parent[rootP] = rootQ;
  // parent[rootQ] = rootP 也一样
  count--; // 两个分量合二为一
}

/* 返回某个节点 x 的根节点 */
private int find(int x) {
  // 根节点的 parent[x] == x
  while (parent[x] != x) {
    x = parent[x];
  }
  return x;
}

/* 返回当前的连通分量个数 */
public int count() {
  return count;
}
```

**这样，如果节点 p 和 q 连通的话，它们一定拥有相同的根节点**：

![](5.jpg)

```
public boolean connected(int p, int q) {
  int rootP = find(p);
  int rootQ = find(q);
  return rootP == rootQ;
}
```

至此，Union-Find 算法就基本完成了。是不是很神奇？竟然可以这样使用数组来模拟出一个森林，如此巧妙的解决这个比较复杂的问题！

那么这个算法的复杂度是多少呢？我们发现，主要 APIconnected 和 union 中的复杂度都是 find 函数造成的，所以说它们的复杂度和 find 一样。

find 主要功能就是从某个节点向上遍历到树根，其时间复杂度就是树的高度。我们可能习惯性地认为树的高度就是 logN，但这并不一定。logN 的高度只存在于平衡二叉树，对于一般的树可能出现极端不平衡的情况，使得「树」几乎退化成「链表」，树的高度最坏情况下可能变成 N。

![](6.jpg)

所以说上面这种解法，find,union,connected 的时间复杂度都是 O(N)。这个复杂度很不理想的，你想图论解决的都是诸如社交网络这样数据规模巨大的问题，对于 union 和 connected 的调用非常频繁，每次调用需要线性时间完全不可忍受。

问题的关键在于，如何想办法避免树的不平衡呢？只需要略施小计即可。

### 三、平衡性优化

我们要知道哪种情况下可能出现不平衡现象，关键在于 union 过程：

```
public void union(int p, int q) {
  int rootP = find(p);
  int rootQ = find(q);
  if (rootP == rootQ) {
    return;
  }
  // 将两棵树合并为一颗
  parent[rootP] = rootQ;
  // parent[rootQ] = rootP 也可以
  count--;
}
```

我们一开始就是简单粗暴的把 p 所在的树接到 q 所在的树的根节点下面，那么这里就可能出现「头重脚轻」的不平衡状况，比如下面这种局面：

![](7.jpg)

长此以往，树可能生长得很不平衡。**我们其实是希望，小一些的树接到大一些的树下面，这样就能避免头重脚轻，更平衡一些**。解决方法是额外使用一个 size 数组，记录每棵树包含的节点数，我们不妨称为「重量」：

```
class UF {
  private int count;
  private int[] parent;
  // 新增一个数组记录树的“重量”
  private int[] size;

  public UF(int n) {
    this.count = n;
    parent = new int[n];

    // 最初每棵树只有一个节点
    // 重量应该初始化 1
    size = new int[n];
    for (int i = 0; i < n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
  }
  /* 其他函数 */
}
```

比如说 size[3] = 5 表示，以节点 3 为根的那棵树，总共有 5 个节点。这样我们可以修改一下 union 方法：

```
public void union(int p, int q) {
  int rootP = find(p);
  int rootQ = find(q);
  if (rootP == rootQ) {
    return;
  }

  // !!!小树接到大树下面，较平衡
  if (size[rootP] > size[rootQ]) {
    parent[rootQ] = rootP;
    size[rootP] += size[rootQ];
  } else {
    parent[rootP] = rootQ;
    size[rootQ] += size[rootP];
  }
  count--;
}
```

这样，通过比较树的重量，就可以保证树的生长相对平衡，树的高度大致在 logN 这个数量级，极大提升执行效率。

此时，find,union,connected 的时间复杂度都下降为 O(logN)，即便数据规模上亿，所需时间也非常少。

### 四、路径压缩

这步优化虽然代码很简单，但原理非常巧妙。

**其实我们并不在乎每棵树的结构长什么样，只在乎根节点**。

因为无论树长啥样，树上的每个节点的根节点都是相同的，所以能不能进一步压缩每棵树的高度，使树高始终保持为常数？

![](8.jpg)

这样每个节点的父节点就是整棵树的根节点，find 就能以 O(1) 的时间找到某一节点的根节点，相应的，connected 和 union 复杂度都下降为 O(1)。

要做到这一点主要是修改 find 函数逻辑，非常简单，但你可能会看到两种不同的写法。

第一种是在 find 中加一行代码：

```
private int find(int x) {
  while (parent[x] != x) {
    // 这行代码进行路径压缩
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}
```

这个操作有点匪夷所思，看个 GIF 就明白它的作用了（为清晰起见，这棵树比较极端）：

![](9.gif)

用语言描述就是，每次 while 循环都会把一对儿**父子节点**改到同一层，这样每次调用 find 函数向树根遍历的同时，顺手就将树高缩短了，最终所有树高都会是一个常数，那么所有方法的复杂度也就都是 O(1)。

> PS：读者可能会问，这个 GIF 图的 find 过程完成之后，树高确实缩短了，但是如果更高的树，压缩后高度可能依然很大呀？不能这么想。因为这个 GIF 的情景是我编出来方便大家理解路径压缩的，但是实际中，每次 find 都会进行路径压缩，所以树本来就不可能增长到这么高，这种担心是多余的。

路径压缩的第二种写法是这样：
// 8->2->1->0->4 变为 8->4 2->4 1->4 0->4

```
// 第二种路径压缩的 find 方法
public int find(int x) {
  if (parent[x] != x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}
```

我一度认为这种递归写法和第一种迭代写法做的事情一样，但实际上是我大意了，有读者指出这种写法进行路径压缩的效率是高于上一种解法的。

这个递归过程有点不好理解，你可以自己手画一下递归过程。我把这个函数做的事情翻译成迭代形式，方便你理解它进行路径压缩的原理：

```
// 这段迭代代码方便你理解递归代码所做的事情
public int find(int x) {
  // 先找到根节点
  int root = x;
  while (parent[root] != root) {
    root = parent[root];
  }
  // 然后把 x 到根节点之间的所有节点直接接到根节点下面
  int old_parent = parent[x];
  while (x != root) {
    // 将 x 直接挂到 root 节点下
    parent[x] = root;
    x = old_parent;
    old_parent = parent[old_parent];
  }
}
```

这种路径压缩的效果如下：

![](9.jpg)

比起第一种路径压缩，显然这种方法压缩得更彻底，直接把一整条树枝压平，一点意外都没有，所以从效率的角度来说，推荐你使用这种路径压缩算法。

**另外，如果路径压缩技巧将树高保持为常数了，那么 size 数组的平衡优化就不是特别必要了**。

所以你一般看到的 Union Find 算法应该是如下实现：

```
class UF {
  // 连通分量个数
  private int count;
  // 存储每个节点的父节点
  private int[] parent;

  // n 为图中节点的个数
  public UF(int n) {
    this.count = n;
    parent = new int[n];
    for (int i = 0; i < n; i++) {
      parent[i] = i;
    }
  }

  // 将节点 p 和节点 q 连通
  public void union(int p, int q) {
    int rootP = find(p);
    int rootQ = find(q);

    if (rootP == rootQ)
      return;

    parent[rootQ] = rootP;
    // 两个连通分量合并成一个连通分量
    count--;
  }

  // 判断节点 p 和节点 q 是否连通
  public boolean connected(int p, int q) {
    int rootP = find(p);
    int rootQ = find(q);
    return rootP == rootQ;
  }

  public int find(int x) {
    if (parent[x] != x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // 返回图中的连通分量个数
  public int count() {
    return count;
  }
}
```

Union-Find 算法的复杂度可以这样分析：构造函数初始化数据结构需要 O(N) 的时间和空间复杂度；连通两个节点 union、判断两个节点的连通性 connected、计算连通分量 count 所需的时间复杂度均为 O(1)。

到这里，相信你已经掌握了 Union-Find 算法的核心逻辑，总结一下我们优化算法的过程：

1、用 parent 数组记录每个节点的父节点，相当于指向父节点的指针，所以 parent 数组内实际存储着一个森林（若干棵多叉树）。

2、用 size 数组记录着每棵树的重量，目的是让 union 后树依然拥有平衡性，保证各个 API 时间复杂度为 O(logN)，而不会退化成链表影响操作效率。

3、在 find 函数中进行路径压缩，保证任意树的高度保持在常数，使得各个 API 时间复杂度为 O(1)。使用了路径压缩之后，可以不使用 size 数组的平衡优化。

下面我们看一些具体的并查集题目。

### 题目实践

力扣第 323 题「无向图中连通分量的数目」就是最基本的连通分量题目：

给你输入一个包含 n 个节点的图，用一个整数 n 和一个数组 edges 表示，其中 edges[i] = [ai, bi]表示图中节点 ai 和 bi 之间有一条边。请你计算这幅图的连通分量个数。

![](10.jpg)

函数签名如下：

```
int countComponents(int n, int[][] edges)
```

这道题我们可以直接套用 UF 类来解决：

```
public int countComponents(int n, int[][] edges) {
  UF uf = new UF(n);
  // 将每个节点进行连通
  for (int[] e : edges) {
    uf.union(e[0], e[1]);
  }
  // 返回连通分量的个数
  return uf.count();
}

class UF {
  // 见上文
}
```

**另外，一些使用 DFS 深度优先算法解决的问题，也可以用 Union-Find 算法解决**。

比如力扣第 130 题「被围绕的区域」：

给你一个 M×N 的二维矩阵，其中包含字符 X 和 O，让你找到矩阵中四面被 X 围住的 O，并且把它们替换成 X。

```
void solve(char[][] board);
```

注意哦，必须是四面被围的 O 才能被换成 X，也就是说边角上的 O 一定不会被围，进一步，与边角上的 O 相连的 O 也不会被 X 围四面，也不会被替换。

![](11.jpg)

> PS：这让我想起小时候玩的棋类游戏「黑白棋」，只要你用两个棋子把对方的棋子夹在中间，对方的子就被替换成你的子。可见，占据四角的棋子是无敌的，与其相连的边棋子也是无敌的（无法被夹掉）。

其实这个问题应该归为 岛屿系列问题 使用 DFS 算法解决：

先用 for 循环遍历棋盘的四边，用 DFS 算法把那些与边界相连的 O 换成一个特殊字符，比如#；然后再遍历整个棋盘，把剩下的 O 换成 X，把#恢复成 O。这样就能完成题目的要求，时间复杂度 O(MN)。

---

解决这个问题的传统方法就是 DFS 算法，先实现一个可复用的 dfs 函数，可以将 0 变成#:

```
/* 从board[i][j]开始DFS，将字符O替换成字符# */
void dfs(char[][] board, int i, int j) {
  int m = board.length, n = board[0].length;
  // 越界则直接返回
  if (i < 0 || i >= m || j < 0 || j >= n) {
    return;
  }
  // 如果本身就是X，直接返回
  if (board[i][j] != 'O') {
    return;
  }
  // 进行替换
  board[i][j] = '#';
  // 向四周DFS搜索
  dfs(board, i + 1, j); // 下
  dfs(board, i, j + 1); // 右
  dfs(board, i - 1, j); // 上
  dfs(board, i, j - 1); // 左
}
```

然后用 for 循环遍历棋盘的四边，用 DFS 算法把那些与边界相连的 0 换成一个特殊字符，比如#;然后再遍历整个棋盘，把剩下的 0 换成;最后把所有# 恢复成:

```
void solve(char[][] board) {
  if (board.length == 0) return;
  int m = board.length, n = board[0].length;
  // 把第一列和最后一列关联的O变成#
  for (int i = 0; i < m; i++) {
    dfs(board, i, 0);
    dfs(board, i, n - 1);
  }
  // 把第一行和最后一行关联的O变成#
  for (int j = 0; j < n; j++) {
    dfs(board, 0, j);
    dfs(board, m - 1, j);
  }
  // 剩下的O都是应该被替换掉的
  for (int i = 1; i < m - 1; i++) {
    for (int j = 1; j < n - 1; j++) {
      if (board[i][j] == 'O') {
        board[i][j] = 'X';
      }
    }
  }
  // 把所有字符#恢复成O
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
      if (board[i][j] == '#') {
        board[i][j] = 'O';
      }
    }
  }
}
```

以上使用 DFS 算法就能完成题目的要求，时间复杂度为 O(MN)，其中 M 和 N 分别为 board 的长和宽。

---

但这个问题也可以用 Union-Find 算法解决，虽然实现复杂一些，甚至效率也略低，但这是使用 Union-Find 算法的通用思想，值得一学。

**你可以把那些不需要被替换的 O 看成一个拥有独门绝技的门派，它们有一个共同「祖师爷」叫 dummy，这些 O 和 dummy 互相连通，而那些需要被替换的 O 与 dummy 不连通**。

![](12.jpg)

这就是 Union-Find 的核心思路，明白这个图，就很容易看懂代码了。

首先要解决的是，根据我们的实现，Union-Find 底层用的是一维数组，构造函数需要传入这个数组的大小，而题目给的是一个二维棋盘。

这个很简单，**二维坐标(x,y)可以转换成 x \* n + y 这个数（m 是棋盘的行数，n 是棋盘的列数），敲黑板，这是将二维坐标映射到一维的常用技巧**。

其次，我们之前描述的「祖师爷」是虚构的，需要给他老人家留个位置。索引[0.. m*n-1]都是棋盘内坐标的一维映射，那就让这个虚拟的 dummy 节点占据索引 m \* n 好了。

看解法代码：

```
void solve(char[][] board) {
  if (board.length == 0) return;

  // 行
  int m = board.length;
  // 列
  int n = board[0].length;
  // 给 dummy(假) 留一个额外位置
  UF uf = new UF(m * n + 1); // 从1到m*n下标对应其值
  int dummy = m * n;
  // 将首列和末列的 O 与 dummy 连通
  for (int i = 0; i < m; i++) {
    if (board[i][0] == 'O') {
      // 左边第一列有为'O'的，将其与dummy连通
      // (x, y) => x * n + y，因为y为0，所以为 i * n
      uf.union(i * n, dummy);
    }
    if (board[i][n - 1] == 'O') {
      // 右边最后一列有为'O'的，将其与dummy连通
      uf.union(i * n + (n - 1), dummy);
    }
  }
  // 将首行和末行的 O 与 dummy 连通
  for (int j = 0; j < n; j++) {
    if (board[0][j] == 'O') {
      // 第一行
      uf.union(j, dummy);
    }
    if (board[m-1][j] == 'O') {
      // 最后一行
      uf.union((m - 1) * n + j, dummy);
    }
  }
  // 方向数组 d 是上下左右搜索的常用手法
  // 以(0, 0)为基准的上(-1, 0) 下 (1, 0) 左 (0, -1) 右 (0, 1)
  int[][] d = new int[][]{\{1, 0}, {0, 1}, {0, -1}, {-1, 0}\};
  // 行: 排除了首末行
  for (int i = 1; i < m - 1; i++) {
    // 列：排除了最左列、最右列
    for (int j = 1; j < n - 1; j++) {
      if (board[i][j] == 'O') {
        // 将此 O 与上下左右的 O 连通
        // 得到(i, j)的上下左右四处坐标
        for (int k = 0; k < 4; k++) {
          // d: [[1, 0], [0, 1], [0, -1], [-1, 0]]
          // d[0][0]: 1, d[1][0]: 0, d[2][0]: 0，d[3][0]: -1;
          int x = i + d[k][0];
          // d[0][1]: 0, d[1][1]: 1, d[2][1]: -1，d[3][1]: 0;
          int y = j + d[k][1];
          if (board[x][y] == 'O') {
            // 将(x, y)与(i, j)连通
            uf.union(x * n + y, i * n + j);
          }
        }
      }
    }
  }
  // 所有不和 dummy 连通的 O，都要被替换
  for (int i = 1; i < m - 1; i++) {
    for (int j = 1; j < n - 1; j++) {
      if (!uf.connected(dummy, i * n + j)) {
        board[i][j] = 'X';
      }
    }
  }
}
```

这段代码很长，其实就是刚才的思路实现，只有和边界 O 相连的 O 才具有和 dummy 的连通性，他们不会被替换。

其实用 Union-Find 算法解决这个简单的问题有点杀鸡用牛刀，它可以解决更复杂，更具有技巧性的问题，**主要思路是适时增加虚拟节点，想办法让元素「分门别类」，建立动态连通关系**。

力扣第 990 题「等式方程的可满足性」用 Union-Find 算法就显得十分优美了，题目是这样：

给你一个数组 equations，装着若干字符串表示的算式。每个算式 equations[i]长度都是 4，而且只有这两种情况：a==b 或者 a!=b，其中 a,b 可以是任意小写字母。你写一个算法，如果 equations 中所有算式都不会互相冲突，返回 true，否则返回 false。

比如说，输入["a==b","b!=c","c==a"]，算法返回 false，因为这三个算式不可能同时正确。

再比如，输入["c==c","b==d","x!=z"]，算法返回 true，因为这三个算式并不会造成逻辑冲突。

我们前文说过，动态连通性其实就是一种等价关系，具有「自反性」「传递性」和「对称性」，其实==关系也是一种等价关系，具有这些性质。所以这个问题用 Union-Find 算法就很自然。

**核心思想是，将 equations 中的算式根据==和!=分成两部分，先处理==算式，使得他们通过相等关系各自勾结成门派（连通分量）；然后处理!=算式，检查不等关系是否破坏了相等关系的连通性**。

```
boolean equationsPossible(String[] equations) {
  // 26个字母
  UFa uf = new UF(26);
  // 先让相等的字母形成连通分量
  for (String eq : equations) {
    if (eq.charAt(1) == '=') {
      char x = eq.charAt(0);
      char y = eq.charAt(3);
      uf.union(x - 'a', y - 'a');
    }
  }
  // 检查不等关系是否打破相等关系的连通性
  for (String eq : equations) {
    if (eq.charAt(1) == '!') {
      char x = eq.charAt(0);
      char y = eq.charAt(3);
      // 如果相等关系成立，就是逻辑冲突
      if (uf.connected(x - 'a', y - 'a'))
        return false;
    }
  }
  return true;
}

class UF {
  // 见上文
}
```

至此，这道判断算式合法性的问题就解决了，借助 Union-Find 算法，是不是很简单呢？

最后，Union-Find 算法也会在一些其他经典图论算法中用到，比如判断「图」和「树」，以及最小生成树的计算，详情见 Kruskal 最小生成树算法(https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247492575&idx=1&sn=bf63eb391351a0dfed0d03e1ac5992e7&scene=21#wechat_redirect)。

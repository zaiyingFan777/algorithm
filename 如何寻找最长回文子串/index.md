## 如何寻找最长回文子串

回文串是面试常常遇到的问题(虽然问题本身没啥意义)，本节就告诉你回文串问题的核心思想是什么。

首先，明确一下回文串是什么: **回文串就是正着读和反着读都一样的字符串**。

比如字符串aba和abba都是回文串，因为它们对称，反过来还是和本身一样。而字符串abac就不是回文串。

可以看到，回文串的长度可能是奇数，也可能是偶数，这就添加了回文串问题的难度解决该类问题的核心是**双指针**。

题目很简单，就是给你输入一个字符串 s，请返回这个字符串中的最长回文子串。

函数签名如下:

```
string longestPalindrome(string s);
```

比如输入s= acaba，算法返回aca，或者返回aba也是正确的。

### 思考

对于这个问题，我们首先思考，给定一个字符串s，如何在s中找到一个回文子串?

有一个很有趣的思路:既然回文串是一个正着反着读都一样的字符串，那么如果把s反转，称为 s'，然后在s和s'中寻找**最长公共子串**，这样应该就能找到最长回文子串。

比如字符串 s = abacd，反过来是 dcaba，它俩的最长公共子串是 aba，应该就是最长回文子串。

但是这个思路是错误的，比如说字符串 aacxycaa，反转之后是aacyxcaa，最长公共子串是 aac，但是最长回文子串应该是 aa。

虽然这个思路不正确，但是这种把问题转化为其他形式的思考方式是非常值得提倡的下面，就来说一下正确的思路，如何使用**双指针**。

**寻找回文串的核心思想是: 从中间开始向两边扩散来判断回文串**。对于最长回文子串就是这个意思:

```
for 0 <= i <= len(s):
  找到以s[i]为中心的回文串
  根据找到的回文串长度更新答案
```

但是呢，前面也提到了，回文串的长度可能是奇数也可能是偶数，如果是abba这种情况，没有一个中心字符，上面的算法就没辙了，所以可以修改一下:

```
for 0 <= i < len(s):
  找到以s[i]为中心的回文串
  找到以s[i]和s[i+1]为中心的回文串
  更新答案
```

s[i]这里的索引可能会越界，我们在具体的代码实现中会处理

### 代码实现

按照上面的思路，先要实现一个函数来寻找最长回文串，这个函数是有点技巧的:

```
//从s[l]和s[r] 开始向两端扩散
// 返回以s[l]和s[r]为中心的最长回文串
string palindrome(string& s, int l,int r) {
  // 防止索引越界
  while(l >= 0 && r < s.size() && s[l] == s[r]) {
    l--; r++;
  }
  // string.substr(start,length)
  return s.substr(l+1, r-l-1);
}
```

为什么要传入两个索引指针l和r呢?因为这样实现可以同时处理回文串长度为奇数和偶数的情况:

```
for 0 <= i < len(s):
  # 找到以s[i]为中心的回文串
  palindrome(s, i, i);
  #找到以s[i]和s[i+1]为中心的回文串
  palindrome(s, i, i + 1);
  更新答案
```

当l和r相等时，就是在寻找长度为奇数的回文串; 反之则是在找长度为偶数的文串。

下面看下longestPalindrome的完整代码:

```
string longestPalindrome(string s) {
  string res;
  for (int i=0; i< s.size(); i++) {
    //寻找长度为奇数的回文子串
    string s1 = palindrome(s, i, i);//寻找长度为偶数的回文子串
    string s2 = palindrome(s, i, i+1);// res = longest(res，s1，s2)
    res = res.size() > s1.size() ? res : s1;
    res = res.size() > s2.size() ? res : s2;
  }
  return res;
}
```

至此，这道最长回文子串的问题就解决了，时间复杂度为 O(N)，空间复杂度为0(1)。

还有一个简单的优化，在以上解法中palindrome函数直接返回的是子串，但是构造子串这个操作是需要时间和空间的。其实可以用全局变量记录结果子串的start和end索引，palindrome函数不要直接返回子串，而是更新start和end的值，最后再通过start和end得到结果子串。不过从Big表示法来看，时间复杂度都是一样的。

值得一提的是，这个问题可以用动态规划方法解决，时间复杂度一样，但是空间复杂度至少要 O(N)来存储 DP table。这道题是少有的动态规划非最优解法的问题。

另外，这个问题还有一个巧妙的解法，时间复杂度只需要 O(N),不过该解法比较复杂我个人认为没必要掌握。该算法的名字叫 Manacher's AIgorithm(马拉车算法)，有兴趣的读者可以自行搜索一下。
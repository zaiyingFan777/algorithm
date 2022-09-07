## 剑指 Offer 03. 数组中重复的数字

> 先讲下数组nlogn的时间复杂度排序方式并归排序：并归排序，先递归再处理数组

```
// mergesort
// 分治思想
function mergeSort(nums) {
  if (nums.length < 2) {
    return nums;
  }
  // 二分数组
  var midIndex = Math.floor(nums.length / 2);
  var leftArray = nums.slice(0, midIndex);
  var rightArray = nums.slice(midIndex);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(left, right) {
  var result = [];
  // 循环结束条件：当其中一个或两个数组为空数组的时候
  while(left.length > 0 && right.length > 0) {
    // 从数组头部开始比较大小
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  // 为了防止有剩余
  return result.concat(left, right);
}
```

正文：

> 题目一：找出数组中重复的数字。
> 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是重复的数字2或者3。

解决这个问题的一个简单的方法是先把输入的数组排序。从排序的数组中找出重复的数字是一件很容易的事情，只需要从头到尾扫描排序后的数组就可以了。排序一个长度为n的数组需要O(nlogn)的时间。

还可以利用哈希表解决这个问题。从头到尾按顺序扫描数组的每个数字，每扫描到一个数字的时候，都可以用O(1)的时间来判断哈希表里是否已经包含了该数字。如果哈希表里还没有这个数字，就把它加入哈希表。
如果哈希表里已经存在该数字，就找到了一个重复的数字。这个算法的时间复杂度是O(n)，但它提高时间效率是以一个大小为O(n)的哈希表为代价的。我们再看看有没有复杂度是O(1)的算法。

我们注意到数组中的数字都在0~n-1的范围内。如果这个数组中没有重复的数字，那么当数组排序之后数字i将出现在下标为i的位置。由于数组中有重复的数字，有些位置可能存在多个数字，同时有些位置可能没有数字。

现在让我们重排这个数组。从头到尾以此扫描这个数组中的每个数字。当扫描到下标为i的数字时，首先比较这个数字(用m表示)是不是等于i。如果是，则接着扫描下一个数字：如果不是，则再拿它和第m个数字进行比较。如果他和第m个数字相等，就找到了一个重复的数字（该数字在下标为i和m的位置都出现了）；如果它和第m个数字不相等，就把第i个数字和第m个数字交换，把m放到属于它的位置。接下来再重复这个比较，交换的过程，直到我们发现一个重复的数字。

以数组{2,3,1,0,2,5,3}为例来分析找到重复数字的步骤。数组的第0个数字(从0开始计数，和数组的下标保持一致)是2，与它的下标不相等，于是把它和下标为2的数字1交换。交换之后的数组是{1,3,2,0,2,5,3}。此时第0个数字是1，仍然与它的下标不相等，继续把它和下标为1的数字3交换，得到数组{3,1,2,0,2,5,3}。接下来继续交换第0个数字3和第3个数字0，得到数组{0,1,2,3,2,5,3}。此时第0个数字的数值为0，接着扫描下一个数字。在接下来的几个数字中，下标为1、2、3的3个数字分别为1、2、3，它们的下标和数值都分别相等，因此不需要执行任何操作。接下来扫描到下标为4的数字2。由于它的数值与它的下标不相等，再比较它和下标为2的数字。注意到此时数组中下标为2的数字也是2，也就是数字2在下标为2和下标为4的两个位置都出现了，因此找到一个重复的数字。

```
bool duplicate(int numbers],int length, int* duplication)
{
  if(numbers === nullptr || length <= 0)
  {
    return false;
  }
  for(int i=0; i < length; ++i)
  {
    if(numbers[i] < 0 || numbers[i] > length-1)
      return false:
  }

  for(int i=0; i < length; ++i){
    while(numbers[i] != i)
    {
      if(numbers[i] == numbers[numbers[i]])
      {
        *duplication = numbers[i] 
        return true;
      }
      // swap numbers[i] and numbers[numbers[i]]
      int temp = numbers[i]
      numbers[i] = numbers[temp]
      numbers[temp] = temp;
    }
  }
  return false;
}
```

上述代码中，找到的重复数字通过参数duplication传给函数的调用者，而函数的返回值表示数组中是否有重复的数字。当输入的数组中存在重复的数字时，返回true; 否则返回false。
代码中尽管有一个两重循环，但每个数字只需要交换两次就能找到属于他的位置，因此总的时间复杂度是O(n)。另外，所有的操作步骤都是输入数组上进行的，不需要额外分配内存，因此空间复杂度为O(1).


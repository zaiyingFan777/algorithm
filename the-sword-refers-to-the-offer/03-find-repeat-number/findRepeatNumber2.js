// 不修改数组找出重复的数字。

// 在一个长度为n+1的数组里的所有数字都在1~n的范围内，所以数组中至少有一个数字是重复的。请找出数组中任意一个重复的数字，但不能修改输入的数组。例如，如果输入长度为8的数组{2,3,5,4,3,2,6,7}，
// 那么对应的输出是重复的数字2或者3。

/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  if (!nums || nums.length === 0) return -1;
  var len = nums.length;
  var start = 1;
  var end = len - 1;
  while(start <= end) {
    var mid = ((end - start) >> 1) + start; // Math.floor((start + end) / 2)
    // 统计从start-mid总共应为(mid-start)+1
    var count = countRange(nums, len, start, mid);
    // 找到最后start == end
    if (start === end) {
      if (count > 1) {
        return start;
      } else {
        break;
      }
    }
    if (count > (mid - start + 1)) {
      // 个数多
      end = mid;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

function countRange(nums, len, start, end) {
  if (nums.length === 0) return 0;
  var count = 0;
  for(var i = 0; i < len; i++) {
    if (nums[i] >= start && nums[i] <= end) {
      count++;
    }
  }
  return count;
}

findRepeatNumber([2,3,5,4,3,2,6,7]);
findRepeatNumber([1,2,3,4]);
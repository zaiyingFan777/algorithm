package main

import "fmt"

// 1. 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 示例 2：
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// 暴力解法
// 时间复杂度为O(N^2)，空间复杂度为O(1)
func twoSumLower(nums []int, target int) []int {
	// for i := 0; i < len(nums); i++ {
	// 	for j := i + 1; j < len(nums); j++ {
	// 		if nums[i]+nums[j] == target {
	// 			return []int{i, j}
	// 		}
	// 	}
	// }
	// return nil
	for i, x := range nums { // range i下标，x数组元素
		for j := i + 1; j < len(nums); j++ {
			if x+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return nil
}

// 如果想让时间复杂度下降，一般的方法就是用空间换时间，可以通过一个哈希表记录元素值到索引的映射，减少时间复杂度
// 解法2：hashTable
// hashTable2 := map[int]int{}
// hashTable2[0] = 1
// hashTable2[1] = 2
// p1, ok1 := hashTable2[1]
// p2, ok2 := hashTable2[2]
// fmt.Println(p1, ok1, p2, ok2) // 2 true 0 false

// 声明并初始化一个map
// func twoSum(nums []int, target int) []int {
// 	// 定义hashTable
// 	hashTable := map[int]int{} // map[]
// 	// 循环
// 	for i, v := range nums {
// 		if p, ok := hashTable[target-v]; ok { // p value，ok 是否被赋值
// 			// 如果找到则返回
// 			return []int{p, i}
// 		}
// 		// 比如[2, 7, 11, 15] 9，如果第一次遍历，v为2，然后我们在map里面找9-2=7，发现没有，就将map[2] = i
// 		hashTable[v] = i
// 	}
// 	return nil
// }

// 使用make
func twoSum(nums []int, target int) []int {
	// 定义hashTable
	hashTable := make(map[int]int)
	// 循环数组nums，判断map[target-v]是否被赋值，如果没赋值我们将数组元素存储到map中的key，对应的value为index
	for i, v := range nums {
		if p, ok := hashTable[target-v]; ok {
			// 如果map已经存储了，则返回下标
			return []int{p, i}
		}
		// 如果没有找到，则数组元素作为键，数组元素对应的下标作为value存到map中
		hashTable[v] = i
	}
	return nil
}

func main() {
	nums := []int{2, 7, 11, 15}
	arr0 := twoSumLower(nums, 9)
	arr := twoSum(nums, 9)
	fmt.Println(arr, arr0)
}

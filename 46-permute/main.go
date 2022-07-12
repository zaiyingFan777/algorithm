package main

import "fmt"

//1.这样操作nums
//2.或者把函数定义到main函数内
//3.或者定义全局变量去修改
// 1
func test(nums *[]int) {
	*nums = append(*nums, 4)
}

var nums2 = []int{1, 2, 3}

// 3
func test3() {
	nums2 = append(nums2, 7, 8)
}

func main() {
	// copy函数
	nums := []int{1, 2, 3}
	copyNum := make([]int, len(nums))
	copy(copyNum, nums)
	fmt.Println(copyNum, "copyNum") // [1 2 3] copyNum
	test(&nums)
	fmt.Println(nums, "nums") // [1 2 3 4] nums
	// 2
	var test2 func()
	test2 = func() {
		nums = append(nums, 5)
	}
	test2()
	fmt.Println(nums, "nums") // [1 2 3 4 5] nums
	test3()
	fmt.Println(nums2, "nums2") // [1 2 3 7 8] nums2
}

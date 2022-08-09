package main

import (
	"fmt"
	"math"
)

func maxSubArray(nums []int) int {
	n := len(nums)
	if n == 0 {
		return 0
	}
	// 定义dp数组
	dp := make([]int, n)
	// base case
	dp[0] = nums[0]
	for i := 1; i < n; i++ {
		// 要么随波逐流要么自成一派
		dp[i] = max(nums[i], dp[i-1]+nums[i])
	}
	res := math.MinInt32
	for i := 0; i < n; i++ {
		res = max(res, dp[i])
	}
	return res
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}

func main() {
	dp := make([]int, 10)
	fmt.Println(dp) // [0 0 0 0 0 0 0 0 0 0]
}

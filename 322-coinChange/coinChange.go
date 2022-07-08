package coinchange

// 切片知识
// https://blog.csdn.net/weixin_43395911/article/details/122751445?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-122751445-blog-104903832.pc_relevant_multi_platform_whitelistv1&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-122751445-blog-104903832.pc_relevant_multi_platform_whitelistv1&utm_relevant_index=1
// make() 存在三个参数 第一个为类型，第二个为长度 ，第三个为容量
// 切片的动态增长是通过内置函数 append 来实现的
// 如果只指定长度，那么切片的容量和长度相等。也可以分别指定长度和容量：
// 分别指定长度和容量时，创建的切片，底层数组的长度是指定的容量，但是初始化后并不能访问所有的数组元素。切片可以访问 3 个元素，而底层数组拥有 5 个元素。
// 剩余的 2 个元素可以在后期操作中合并到切片，可以通过切片访问这些元素。如果基于这个切片创建新的切片，新切片会和原有切片共享底层数组，也能通过后期操作来访问多余容量的元素。
// !!!不允许创建容量小于长度的切片

// func main() {
// 	arr := make([]int, 3) // 长度和容量为3的切片
// 	arr[0] = 0
// 	arr[1] = 1
// 	arr[2] = 2
// 	fmt.Println(arr)          // [0, 1, 2]
// 	arr1 := make([]int, 3, 5) // 长度为3，容量为5的切片
// 	arr1[0] = 0
// 	arr1[1] = 1
// 	arr1[2] = 2
// 	// arr1[3] = 3 // panic: runtime error: index out of range [3] with length 3
// 	arr1 = append(arr1, 3, 4, 5)
// 	fmt.Println(arr1, len(arr1), cap(arr1)) // [0 1 2 3 4 5] 6 10 容量扩了一倍
// }

func coinChange(coins []int, amount int) int {
	// 定义dp table，长度为amount + 1，初始值为amount + 1
	dp := make([]int, amount+1)
	// base case
	dp[0] = 0
	// 外层循环，为每个dp[i]赋值最小的选择情况
	for i := 1; i < len(dp); i++ {
		// 先初始化dp[i]除了0的都为amount+1，或者math.MaxInt32
		dp[i] = amount + 1
		// 内层 for 在求所有⼦问题 + 1 的最⼩值
		for _, coin := range coins {
			// 不存在小于0的硬币选择，所以跳过
			if i-coin < 0 {
				continue
			}
			dp[i] = min(dp[i], 1+dp[i-coin])
		}
	}
	if dp[amount] == amount+1 {
		return -1
	}
	return dp[amount]
}

func min(x, y int) int {
	if x > y {
		return y
	}
	return x
}

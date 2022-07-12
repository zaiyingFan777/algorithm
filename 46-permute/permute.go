package permute

func swap(nums *[]int, i, j int) {
	temp := (*nums)[i]
	(*nums)[i] = (*nums)[j]
	(*nums)[j] = temp
}

func backtrack(n int, output *[]int, res *[][]int, first int) {
	// 结束条件
	if n == first {
		resarr := make([]int, n)
		copy(resarr, *output)
		*res = append(*res, resarr)
		return
	}
	for i := first; i < n; i++ {
		// 交换数组元素
		swap(output, first, i)
		// 进入下一层决策树
		backtrack(n, output, res, first+1)
		// 撤销选择
		swap(output, first, i)
	}
}

func permute(nums []int) [][]int {
	n := len(nums)
	// 定义res数组
	res := [][]int{}
	// 定义输出数组
	output := make([]int, len(nums))
	copy(output, nums)
	backtrack(n, &output, &res, 0)
	return res
}

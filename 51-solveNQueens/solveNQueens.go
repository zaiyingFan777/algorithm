package solvenqueens

func arrayToString(arr []string) string {
	var result string
	for _, i := range arr { //遍历数组中所有元素追加成string
		result += i
	}
	return result
}

func backtrack(res *[][]string, board *[][]string, row int) {
	// 触发结束条件
	if row == len(*board) {
		resItem := []string{}
		// 将二维数组的item数组变为字符串
		for _, v := range *board {
			resItem = append(resItem, arrayToString(v))
		}
		*res = append(*res, resItem)
		return
	}
	// 遍历每一列
	for col := 0; col < len(*board); col++ {
		// 排除不合法的
		if v := isValid(board, row, col); !v {
			continue
		}
		// 做选择
		(*board)[row][col] = "Q"
		// 去子决策树
		backtrack(res, board, row+1)
		// 撤回选择
		(*board)[row][col] = "."
	}
}

func isValid(board *[][]string, row, col int) bool {
	// 排除同列有q的
	for i := 0; i < row; i++ {
		if (*board)[i][col] == "Q" {
			return false
		}
	}
	// 排除左上方
	for i, j := row-1, col-1; i >= 0 && j >= 0; i, j = i-1, j-1 {
		if (*board)[i][j] == "Q" {
			return false
		}
	}
	// 排除右上方
	for i, j := row-1, col+1; i >= 0 && j < len(*board); i, j = i-1, j+1 {
		if (*board)[i][j] == "Q" {
			return false
		}
	}
	return true
}

func solveNQueens(n int) [][]string {
	// 结果数组
	var res [][]string
	// 路径数组，初始化
	var board [][]string
	board = make([][]string, n)
	for i := range board {
		// board[i] = []string{".", ".", ".", "."}
		board[i] = make([]string, n) // 空数组
		for j := 0; j < n; j++ {
			board[i][j] = "."
		}
	}
	// 从第0行开始
	backtrack(&res, &board, 0)
	return res
}

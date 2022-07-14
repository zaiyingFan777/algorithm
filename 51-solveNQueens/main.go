package main

import "fmt"

func main() {
	// 路径数组
	var board [][]string
	board = make([][]string, 4)
	for i := range board {
		// board[i] = make([]string, 4)
		board[i] = []string{".", ".", ".", "."}
	}
	fmt.Println(board)
}

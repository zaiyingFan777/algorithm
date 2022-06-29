package main

// 切片
// https://blog.csdn.net/qq_45701131/article/details/113005736?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-113005736-blog-123848327.pc_relevant_antiscanv4&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-113005736-blog-123848327.pc_relevant_antiscanv4&utm_relevant_index=1
// https://blog.csdn.net/m0_59439550/article/details/123848327
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// // 错误写法
// func preorderTraversal(root *TreeNode) []int {
// 	// 定义res
// 	var res []int
// 	preorder(root, res)
// 	return res
// }

// func preorder(node *TreeNode, res []int) {
// 	if node == nil {
// 		return
// 	}
// 	// 前序遍历 根左右
// 	// ！！！！这样做会重新生成局部变量
// 	res = append(res, node.Val)
// 	preorder(node.Left, res)
// 	preorder(node.Right, res)
// }

// 正确写法
func preorderTraversal(root *TreeNode) []int {
	// 定义res
	// var res []int
	res := []int{}
	var preorder func(*TreeNode)
	preorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		// 前序遍历 根左右
		res = append(res, node.Val)
		preorder(node.Left)
		preorder(node.Right)
	}
	preorder(root)
	return res
}

func main() {
	// 数组的push
	// var s []int
	// s = append(s, 4)
	// s = append(s, 5)
	// fmt.Println(s)
	// s := []int{}
	// s = append(s, 4)
	// s = append(s, 5)
	// fmt.Println(s)

	// var res []int
	// var test = func() {
	// 	// 这里直接修改外层变量
	// 	res = append(res, 2)
	// }

	// res = append(res, 1)
	// test()
	// fmt.Println(res)
}

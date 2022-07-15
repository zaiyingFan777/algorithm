package mindepth

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	// 定义队列
	queue := []TreeNode{*root}
	// 定义深度，第一层为1
	depth := 1
	// while循环条件queue长度不为0
	for len(queue) != 0 {
		// 拿到队列的长度
		sz := len(queue)
		for i := 0; i < sz; i++ {
			// 截取第一个元素
			var node TreeNode = queue[0]
			// 重新赋值queue
			queue = queue[1:]
			// 判断是否为子节点
			if node.Left == nil && node.Right == nil {
				return depth
			}
			// 左右子节点再加入到队列
			if node.Left != nil {
				queue = append(queue, *(node).Left) // *(node.Left)
			}
			if node.Right != nil {
				queue = append(queue, *(node).Right)
			}
		}
		depth++
	}
	return depth
}

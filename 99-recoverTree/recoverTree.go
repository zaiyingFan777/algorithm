package recovertree

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
func recoverTree(root *TreeNode) {
	// 定义nums数组，用来存储中序遍历root的val的数组，应该是递增的序列
	nums := []int{}
	// 定义中序遍历方法
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		// 左中右
		inorder(node.Left)
		nums = append(nums, node.Val)
		inorder(node.Right)
	}
	// 中序遍历填充完毕nums
	inorder(root)
	// 找到递增数组中，位置变换的两个元素
	first, second := findTwoSwapped(nums)
	// 交换元素
	recover(root, 2, first, second)
}

// 返回两个数而不是下标
func findTwoSwapped(nums []int) (int, int) {
	index1, index2 := -1, -1
	// index1存储大的，index2存储小的下标
	for i := 0; i < len(nums)-1; i++ {
		if nums[i] > nums[i+1] {
			index2 = i + 1
			if index1 == -1 {
				index1 = i
			} else {
				break
			}
		}
	}
	x, y := nums[index1], nums[index2]
	return x, y
}

// 交换元素
func recover(root *TreeNode, count, x, y int) {
	if root != nil {
		// 如果root.val == x 则令 root.val = y，否则root.val = x
		if root.Val == x || root.Val == y {
			if root.Val == x {
				root.Val = y
			} else {
				root.Val = x
			}
			count--
			if count == 0 {
				return
			}
		}
		// 递归左右子树
		recover(root.Left, count, x, y)
		recover(root.Right, count, x, y)
	}
}

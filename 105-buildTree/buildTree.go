package buildtree

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

func buildTree(preorder []int, inorder []int) *TreeNode {
	// 如果两个数组不相等，则返回nil
	if len(preorder) != len(inorder) {
		return nil
	}
	// 定义hashMap，用来存储中序遍历的值以及下标
	indexMap := map[int]int{}
	// 循环中序遍历数组
	for i, v := range inorder {
		// key为item，val为index
		indexMap[v] = i
	}
	var buildTreeTraversal func(preStart, preEnd, inStart, inEnd int) *TreeNode
	buildTreeTraversal = func(preStart, preEnd, inStart, inEnd int) *TreeNode {
		// 当左指针大于右指针结束
		if preStart > preEnd || inStart > inEnd {
			return nil
		}
		// 在前序遍历数组第一位找到根节点对应的值
		rootVal := preorder[preStart]
		// 创建root
		root := &TreeNode{rootVal, nil, nil}
		// 找到root在中序遍历数组中的下标
		pIndex := indexMap[rootVal]
		root.Left = buildTreeTraversal(preStart+1, pIndex-inStart+preStart, inStart, pIndex-1)
		root.Right = buildTreeTraversal(pIndex-inStart+preStart+1, preEnd, pIndex+1, inEnd)
		return root
	}
	return buildTreeTraversal(0, len(preorder)-1, 0, len(inorder)-1)
}

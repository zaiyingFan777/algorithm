package maximumpathsuminbinarytree

import "math"

// 124. 二叉树中的最大路径和
// 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。
// 给你一个二叉树的根节点 root ，返回其 最大路径和

// 示例 1：
// 输入：root = [1,2,3]
// 输出：6
// 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
// 示例 2：
// 输入：root = [-10,9,20,null,null,15,7]
// 输出：42
// 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42

// 方法一：递归（后续遍历，左右中）
// 首先，考虑实现一个简化的函数maxGain(node)，该函数计算二叉树中的一个节点的最大贡献值，具体而言，就是在以该节点为根节点的子树中寻找以该节点
// 为起点的一条路径，使得该路径上的节点值之和最大。
// 具体而言，该函数的计算如下。
// ·空节点的最大贡献值等于0。
// ·非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和（对于叶子节点而言，最大贡献值等于节点值）。

// 因此，对根节点调用函数 maxGain，即可得到每个节点的最大贡献值。
// 根据函数 maxGain 得到每个节点的最大贡献值之后，如何得到二叉树的最大路径和？对于二叉树中的一个节点，该节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值，
// 如果子节点的最大贡献值为正，则计入该节点的最大路径和，否则不计入该节点的最大路径和。
// 维护一个全局变量 maxSum 存储最大路径和，在递归过程中更新 maxSum 的值，最后得到的 maxSum 的值即为二叉树中的最大路径和。

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

func maxPathSum(root *TreeNode) int {
	maxSum := math.MinInt32         // 最小Int32
	var maxGain func(*TreeNode) int // 实现一个简化的函数maxGain(node)，该函数计算二叉树中的一个节点的最大贡献值
	maxGain = func(node *TreeNode) int {
		// 当节点为空返回贡献值0
		if node == nil {
			return 0
		}
		// 递归计算左右子节点的最大贡献值
		// 只有在最大贡献值大于0时，才会选取对应子节点
		// 后续遍历，左右中，这里如果贡献值<0，则返回0
		leftGain := max(0, maxGain(node.Left))
		rightGain := max(0, maxGain(node.Right))
		// 节点的最大路径和取决于当前节点的值与该子节点的左右子节点的最大贡献值
		priceNewPath := node.Val + leftGain + rightGain
		// 更新maxSum
		maxSum = max(maxSum, priceNewPath)
		// 返回节点的最大贡献值
		return node.Val + max(leftGain, rightGain)
	}
	maxGain(root)
	return maxSum
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

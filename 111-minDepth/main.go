package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func main() {
	// 动态改变数组
	res := []int{1, 2, 3, 4, 5}
	res = append(res, 6)
	fmt.Println(res) // [1 2 3 4 5 6]
	// 截取res前两位，并对s设置容量为2，（左开位:右避位:容量）
	test1 := res[:2:2]
	fmt.Println(test1, len(test1), cap(test1)) // [1 2] 2 2
	// 截取res前两位，（左开位:右避位），这里不做容量限制
	test2 := res[:2]
	fmt.Println(test2, len(test2), cap(test2)) // [1 2] 2 10

	// 截取res第二位
	test3 := res[1:2]
	fmt.Println(test3, len(test3), cap(test3)) // [2] 1 9
	// 截取res第一位
	test4 := res[0:1]
	fmt.Println(test4, len(test4), cap(test4)) // [1] 1 10

	// 截取res从1到最后一个
	test5 := res[1:]
	fmt.Println(test5, len(test5), cap(test5)) // [2 3 4 5 6] 5 9

	res = res[1:]
	fmt.Println(res) // [2 3 4 5 6]

	tn1 := TreeNode{
		Val:   2,
		Left:  nil,
		Right: nil,
	}

	tn := TreeNode{
		Val:   1,
		Left:  &tn1,
		Right: nil,
	}
	res2 := []*TreeNode{&tn}
	fmt.Println(res2, res2[0]) // [0xc000004138] &{1 0xc000004120 <nil>}
	res3 := []TreeNode{tn}
	fmt.Println(res3, res3[0])                  // [{1 0xc000004120 <nil>}] {1 0xc000004120 <nil>}
	fmt.Println(res2[0].Right == res3[0].Right) // true

	// 测试(*Node).Left和*(Node.Left)
	fmt.Println(*(tn).Left)               // {2 <nil> <nil>}
	fmt.Println(*(tn.Left))               // {2 <nil> <nil>}
	fmt.Println(*(tn).Left == *(tn.Left)) // true
}

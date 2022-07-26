package main

import (
	"fmt"
	"math"
)

// 76
func minWindow(s string, t string) string {
	// 声明两个map，need记录t，window记录s中的
	need, window := map[uint8]int{}, map[uint8]int{}
	// 将t放入到need中，key为各个字符
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	// 初始化valid，当如果window[cur] == need[cur] valid++
	valid := 0
	// 初始化left right
	left, right := 0, 0
	// 初始化start len(32为最大值)
	start, length := 0, math.MaxInt32
	// 开启while循环，[left, right) right为s的长度时中止循环
	for right < len(s) {
		// 拿到s[right]
		cur := s[right]
		// 扩张右侧
		right++
		// 判断cur是否在need中
		if _, ok := need[cur]; ok {
			// 将cur在window中++
			window[cur]++
			// 如果window[cur] == need[cur]，则让valid++
			if window[cur] == need[cur] {
				valid++
			}
		}
		// 是否要收紧左侧
		for valid == len(need) {
			// 如果right - left 小于Length则更新
			if right-left < length {
				start = left
				length = right - left
			}
			// 拿到左侧元素
			cur := s[left]
			// 收缩left
			left++
			// 判断cur是否在need中
			if _, ok := need[cur]; ok {
				// 如果window[cur] == need[cur]，则让valid--
				if window[cur] == need[cur] {
					valid--
				}
				window[cur]--
			}
		}
	}
	if length == math.MaxInt32 {
		return ""
	}
	return s[start : start+length] // substr
}

// 567
func checkInclusion(s1 string, s2 string) bool {
	// 初始化need，window
	need, window := map[uint8]int{}, map[uint8]int{}
	// 遍历s1，将s1各个元素个数赋值给need
	for c := 0; c < len(s1); c++ {
		need[s1[c]]++
	}
	// 初始化左右指针
	left, right := 0, 0
	valid := 0
	for right < len(s2) {
		curR := s2[right]
		right++
		// curR存在于need中，判断是否与window[curR]相等
		if _, ok := need[curR]; ok {
			// 先将元素加入到window中
			window[curR]++
			// 再判断个数
			if need[curR] == window[curR] {
				valid++
			}
		}
		// 是否移动做窗口
		for right-left >= len(s1) {
			// 先判断是否符合条件
			if valid == len(need) {
				return true
			}
			curL := s2[left]
			left++
			if _, ok := need[curL]; ok {
				// 先判断个数，再减减
				if need[curL] == window[curL] {
					valid--
				}
				window[curL]--
			}
		}
	}
	return false
}

// 438
func findAnagrams(s string, p string) []int {
	// 初始化need，window
	need, window := map[uint8]int{}, map[uint8]int{}
	// 遍历s1，将s1各个元素个数赋值给need
	for c := 0; c < len(p); c++ {
		need[p[c]]++
	}
	// 初始化左右指针
	left, right := 0, 0
	valid := 0
	// 初始化结果
	res := []int{}
	for right < len(s) {
		curR := s[right]
		right++
		if _, ok := need[curR]; ok {
			// 先将元素加入到window中
			window[curR]++
			// 再判断个数
			if need[curR] == window[curR] {
				valid++
			}
		}
		// 是否移动做窗口
		for right-left >= len(p) {
			if valid == len(need) {
				res = append(res, left)
			}
			curL := s[left]
			left++
			if _, ok := need[curL]; ok {
				// 先判断个数，再减减
				if need[curL] == window[curL] {
					valid--
				}
				window[curL]--
			}
		}
	}
	return res
}

// 3
func lengthOfLongestSubstring(s string) int {
	window := map[uint8]int{}
	left, right := 0, 0
	res := 0
	for right < len(s) {
		curR := s[right]
		right++
		// 进行窗口内数据的一系列更新
		window[curR]++
		// 判断窗口内数据的一系列更新
		for window[curR] > 1 {
			curL := s[left]
			left++
			window[curL]--
		}
		res = max(res, right-left)
	}
	return res
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func main() {
	a := "abc"
	b := []byte{}              // unit8
	fmt.Printf("a的类型：%T\n", a) // string
	for i := 0; i < len(a); i++ {
		fmt.Printf("a[i]的类型：%T\n", a[i]) // uint8
		fmt.Println(i, a[i])             // 97 98 99
		b = append(b, a[i])
	}
	fmt.Println(string(b)) // abc
	c := []byte(a)
	fmt.Println(c) // [97 98 99]

	// 遍历字符串将各个键存到map中，如果存在就＋1不存在就为1
	m := "abcda"
	d := map[uint8]int{}
	for i := 0; i < len(m); i++ {
		d[m[i]]++
	}
	fmt.Println(d) // map[97:2 98:1 99:1 100:1]
	// 拿map值
	key1, ok := d[101]
	fmt.Println(key1, ok) // 0 false
	key2, ok2 := d[100]
	fmt.Println(key2, ok2) // 1 true
	// 字符串截取
	// 可以使用变量名[n:m]取出大于等于n小于m的字符序列
	// n和m都可以省略,省略时认为n为0,m为长度
	fmt.Println(m[1:2]) // b
	fmt.Println(m[1:])  // bcda 从1截到末尾
	fmt.Println(m[:2])  // ab
	arr := []rune(m)
	fmt.Println(arr)                          // [97 98 99 100 97]
	fmt.Println(string(arr[1:1+2]), m[0:0+3]) // bc abc

	need := map[string]int{"xx": 11}
	need["yy"] = 22
	fmt.Println(len(need))
}

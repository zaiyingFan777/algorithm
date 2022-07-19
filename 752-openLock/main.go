package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	hashMap := map[string]bool{}
	hashMap["0000"] = true
	fmt.Println(hashMap["0000"]) // true
	fmt.Println(hashMap["1000"]) // false
	v, b := hashMap["0000"]
	fmt.Println(v, b) // true. true
	v1, b1 := hashMap["0001"]
	fmt.Println(v1, b1) // false false

	arr := []int{1, 2}
	arr = arr[1:]
	fmt.Println(arr) // [2]
	arr = arr[1:]
	fmt.Println(arr)        // []
	fmt.Println("1" == "1") // true

	// 将字符串变为数组
	str := "0000"
	fmt.Println(strings.Split(str, ""))                          // [0 0 0 0]
	fmt.Printf("str的下标为1的元素的类型，%T\n", strings.Split(str, "")[1]) // string

	// 将数组变为字符串
	fmt.Println(strings.Join(strings.Split(str, ""), "")) // 0000

	// golang中字符串和各种int类型之间的相互转换方式
	// string 转 int
	// Atoi()函数用于将字符串类型的整数转换为int类型
	int, _ := strconv.Atoi("1")
	fmt.Println(int) // 1
	// string转成int64：
	int2, _ := strconv.ParseInt("12", 10, 64)
	fmt.Println(int2) // 12

	// int 转 string
	str1 := strconv.Itoa(12)
	fmt.Printf("str1的类型，%T\n", str1) // str1的类型，string 12
	// int64转成string：
	var i64 int64 = 12
	str2 := strconv.FormatInt(i64, 10)
	fmt.Printf("str2的类型，%T\n", str2) // str2的类型，string
	fmt.Println(str2)                // 12\

	// []byte
	byteArr := []byte("0000")
	fmt.Println(byteArr) // [48 48 48 48]
	for i, b := range byteArr {
		fmt.Println(i, b, byteArr[i], b == '0') // 3 48 48 true
		if i == 2 {
			byteArr[i] += 1
		}
		if i == 3 {
			byteArr[i] = '9'
		}
	}
	fmt.Println(string(byteArr))                 // 0019
	fmt.Println('9' < '0', '1' < '0', '2' > '1') // false false true
	fmt.Println('0' - 1)                         // false false true

	// 测试
	get := func(status string) (ret []string) {
		s := []byte(status)
		fmt.Println(s, "get") // [48 48 48 48] get
		for i, b := range s {
			s[i] = b - 1
			if s[i] < '0' {
				s[i] = '9'
			}
			ret = append(ret, string(s))
			s[i] = b + 1
			if s[i] > '9' {
				s[i] = '0'
			}
			ret = append(ret, string(s))
			s[i] = b
		}
		return
	}
	fmt.Println(get("0000")) // [9000 1000 0900 0100 0090 0010 0009 0001]
}

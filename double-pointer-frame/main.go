package main

import "fmt"

type Man struct {
	Name string
	Age  int
}

func main() {
	man := new(Man) // new返回的是指针，
	man.Name = "小明"
	man.Age = 18
	fmt.Println(man, *man) // &{小明 18} {小明 18}
}

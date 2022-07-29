package main

import "fmt"

// 结构体
type Cat struct {
	Name string
	Age  int
}

func (c Cat) SayName() {
	fmt.Println(c.Name)
}

// 模拟
type RouterGroup struct {
	System SystemRouterGroup
}

type SystemRouterGroup struct {
	BaseRouter
}

type BaseRouter struct{}

func (s *BaseRouter) InitBaseRouter() {
	fmt.Println("我是baseRouter")
}

func main() {
	c1 := new(Cat)
	c1.Name = "小花"
	c1.Age = 2
	c1.SayName() // 小花

	c2 := &Cat{
		Name: "小喵",
		Age:  1,
	}
	c2.SayName()

	c3 := Cat{
		Name: "小喵1",
		Age:  1,
	}
	c3.SayName()

	router := new(RouterGroup)
	// 这种方式更好一点
	router.System.InitBaseRouter() // 我是baseRouter
	// 这种在下面是正确的 当然在这也是没问题
	router.System.BaseRouter.InitBaseRouter() // 我是baseRouter
	// 这样的话
	// type SystemRouterGroup struct {
	// 	BaseRouter BaseRouter
	// }
	// router.System.InitBaseRouter()            // router.System.InitBaseRouter undefined (type SystemRouterGroup has no field or method InitBaseRouter)
	// router.System.BaseRouter.InitBaseRouter() // 我是baseRouter
}

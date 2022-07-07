package swordtooffer10fib

func fib(n int) int {
	const mod int = 1e9 + 7
	// 初始化两个值
	num1, num2 := 0, 1
	for i := 0; i < n; i++ {
		num1, num2 = num2, (num1+num2)%mod
	}
	return num1
}

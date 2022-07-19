package openlock

// 往上拨动
// func plusOne(cur string, j int) string {
// 	// 将字符串切割为数组
// 	curArr := strings.Split(cur, "")
// 	// 当遇到9的时候往上拨动一下为0
// 	if curArr[j] == "9" {
// 		curArr[j] = "0"
// 	} else {
// 		// 其余的加1
// 		// 先转为数字，再转为字符串
// 		curNum, _ := strconv.Atoi(curArr[j])
// 		curArr[j] = strconv.Itoa(curNum + 1)
// 	}
// 	return strings.Join(curArr, "")
// }

// 向下拨动
// func minusOne(cur string, j int) string {
// 	// 将字符串变为数组
// 	curArr := strings.Split(cur, "")
// 	// 如果是0，向下拨动则是9
// 	if curArr[j] == "0" {
// 		curArr[j] = "9"
// 	} else {
// 		curNum, _ := strconv.Atoi(curArr[j])
// 		curArr[j] = strconv.Itoa(curNum - 1)
// 	}
// 	return strings.Join(curArr, "")
// }

func plusOne(cur string, j int) string {
	// 将字符串切割为byte数组
	curArr := []byte(cur)
	if curArr[j] == '9' {
		curArr[j] = '0'
	} else {
		// 其余的加1
		curArr[j] += 1
	}
	// 将byte[]变为string
	return string(curArr)
}

func minusOne(cur string, j int) string {
	// 将字符串切割为byte数组
	curArr := []byte(cur)
	if curArr[j] == '0' {
		curArr[j] = '9'
	} else {
		// 其余的减1
		curArr[j] -= 1
	}
	// 将byte[]变为string
	return string(curArr)
}

func openLock(deadends []string, target string) int {
	const start = "0000"
	// 简单的判断
	if target == start {
		return 0
	}
	// deads map
	deads := map[string]bool{}
	// 将deadends的元素存入到deads中，key为数组元素，val为true
	for _, deadend := range deadends {
		deads[deadend] = true
	}
	// 如果start在deads则直接返回-1
	if deads[start] {
		return -1
	}
	// 定义队列，并将0000放进去
	queue := []string{start}
	// 定义visited map，将访问过的放里面
	visited := map[string]bool{start: true}
	step := 0
	// 开启while循环
	for len(queue) != 0 {
		sz := len(queue)
		for i := 0; i < sz; i++ {
			// 拿到当前元素
			cur := queue[0]
			// 重新赋值queue
			queue = queue[1:]
			// 判断这个元素是否在deads中，如果在跳出此轮循环
			if deads[cur] {
				continue
			}
			// 判断是否为target
			if cur == target {
				return step
			}
			// 找到他的八种情况
			for j := 0; j < 4; j++ {
				// 往上拨动，满足则加入队列，加入visited
				if up := plusOne(cur, j); !visited[up] {
					// 加入队列
					queue = append(queue, up)
					// 加入visited
					visited[up] = true
				}
				// 往下拨动，满足则加入队列，加入visited
				if down := minusOne(cur, j); !visited[down] {
					// 加入队列
					queue = append(queue, down)
					// 加入visited
					visited[down] = true
				}
			}
		}
		step++
	}
	// 不符合条件的返回-1
	return -1
}

// 采用官方的答案，上面超时
func openLock2(deadends []string, target string) int {
	const start = "0000"
	// 简单的判断
	if target == start {
		return 0
	}
	// 定义visited map，将访问过的放里面
	deads := map[string]bool{}
	// 将deadends的元素存入到visited中，key为数组元素，val为true
	for _, deadend := range deadends {
		deads[deadend] = true
	}
	if deads[start] {
		return -1
	}

	// 拨动函数
	// 枚举 status 通过一次旋转得到的数字 8种情况
	get := func(status string) (ret []string) {
		s := []byte(status)
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

	type pair struct {
		status string
		step   int
	}

	// 定义队列，将start放进去
	queue := []pair{{start, 0}}
	// visited map， 并将start放进去
	visited := map[string]bool{start: true}

	// 开启while循环
	for len(queue) != 0 {
		// 拿到队列的第一个，截取
		cur := queue[0]
		queue = queue[1:]
		// 遍历cur的八个点
		for _, nxt := range get(cur.status) {
			// 在deads和visited map中判断
			if !deads[nxt] && !visited[nxt] {
				// 如果nxt等于target
				if nxt == target {
					return cur.step + 1
				}
				// 如果nxt不等于target，记录一下
				visited[nxt] = true
				// 将nxt放入到队列中
				queue = append(queue, pair{nxt, cur.step + 1})
			}
		}
	}
	// 不符合条件的返回-1
	return -1
}

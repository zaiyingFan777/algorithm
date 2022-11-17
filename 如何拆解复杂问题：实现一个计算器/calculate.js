// 224. 基本计算器
// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
// 注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
//
// 示例 1：
// 输入：s = "1 + 1"
// 输出：2
//
// 示例 2：
// 输入：s = " 2-1 + 2 "
// 输出：3
//
// 示例 3：
// 输入：s = "(1+(4+5+2)-3)+(6+8)"
// 输出：23
//
// 提示：
// 1 <= s.length <= 3 * 105
// s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
// s 表示一个有效的表达式
// '+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
// '-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
// 输入中不存在两个连续的操作符
// 每个数字和运行的计算将适合于一个有符号的 32位 整数

// 思路：

// 1.如何将"212"字符串变为数字
// var s = '212';
// var n = 0;
// for(var i = 0; i < s.length; i++) {
//   var c = s[i];
//   n = n * 10 + (c - '0');
// }
// console.log(n) // 212

// 2.如何处理加减法
// "2-1+2" 我们可以将字符串拆分为 +2 -1 +2 然后放到一个栈中，分别取出计算和
// function calculate(s) {
//   // 定义栈结构
//   var stk = [];
//   var num = 0;
//   // 记录Num前的符号，初始化为+
//   var sign = '+';
//   for(var i = 0; i < s.length; i++) {
//     var c = s[i];
//     // 如果是数字
//     if (!!Number(c)) {
//       num = num * 10 + (c - '0');
//     }
//     // 当走到了s的最后一个字符，我们需要计算
//     if (!!!Number(c) || i === s.length - 1) {
//       switch(sign) {
//         case '+':
//           stk.push(num);
//           break;
//         case '-':
//           stk.push(-num);
//           break;
//       }
//       // 我们重新标记sign
//       sign = c;
//       // num也要重新计数
//       num = 0;
//     }
//   }
//   // var res = 0;
//   // while(stk.length) {
//   //   res += stk.pop();
//   // }
//   var res = stk.reduce((a, b) => a + b, 0)
//   return res;
// }

// 3.如何处理乘除
// 当遇到乘除法的时候，我们可以将stk栈顶的元素取出来，与当前的num做乘除然后再放到栈中
// 如果是空格，我们需要在if (!!!Number(c) || i === s.length - 1) {里面多加一层判断，
// 要过滤到空格 if ((!!!Number(c) && c !== ' ') || i === s.length - 1)
// function calculate(s) {
//   // 定义栈结构
//   var stk = [];
//   var num = 0;
//   // 记录Num前的符号，初始化为+
//   var sign = '+';
//   for(var i = 0; i < s.length; i++) {
//     var c = s[i];
//     // 如果是数字
//     if (!!Number(c)) {
//       num = num * 10 + (c - '0');
//     }
//     // 当走到了s的最后一个字符，我们需要计算
//     // 多加一条判断c !== ' '，因为' '的时候我们不需要做任何操作 跳过即可
//     if ((!!!Number(c) && c !== ' ') || i === s.length - 1) {
//       switch(sign) {
//         case '+':
//           stk.push(num);
//           break;
//         case '-':
//           stk.push(-num);
//           break;
//         case '*':
//           stk.push(stk.pop() * num);
//           break;
//         case '/':
//           stk.push(stk.pop() / num);
//           break;
//       }
//       // 我们重新标记sign
//       sign = c;
//       // num也要重新计数
//       num = 0;
//     }
//   }
//   var res = stk.reduce((a, b) => a + b, 0)
//   return res;
// }

// 4.处理括号
// 采用递归的形式，见下面代码

// 注意 Number('*') 为NaN，我们采用!!的形式 !!Number('*')为false !!Number('1')为true

// 最后两个用例超时

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  var rex = /^[0-9]$/;
  // 我们给helper传递list
  var helper =  function(s) {
    // 定义栈结构
    var stk = [];
    var num = 0;
    // 记录Num前的符号，初始化为+
    var sign = '+';
    while (s.length) {
      // 拿出来第一个
      var c = s.shift();
      // 如果是数字
      if (rex.test(c)) {
        num = num * 10 + (c - '0');
      }
      // 处理（
      if (c === '(') {
        // 遇到左括号进行递归
        num = helper(s);
      }
      // 当走到了s的最后一个字符，我们需要计算
      // 多加一条判断c !== ' '，因为' '的时候我们不需要做任何操作 跳过即可
      if ((!rex.test(c) && c !== ' ') || s.length === 0) {
        // switch(sign) {
        //   case '+':
        //     stk.push(num);
        //     break;
        //   case '-':
        //     stk.push(-num);
        //     break;
        //   case '*':
        //     stk.push(stk.pop() * num);
        //     break;
        //   case '/':
        //     stk.push(stk.pop() / num);
        //     break;
        // }
        if (sign === '+') {
          stk.push(num);
        } else if (sign === '-') {
          stk.push(-num);
        } else if (sign === '*') {
          stk.push(stk.pop() * num);
        } else if (sign === '/') {
          stk.push(stk.pop() / num);
        }
        // 我们重新标记sign
        sign = c;
        // num也要重新计数
        num = 0;
      }
      // 处理 ）
      // 遇到右括号结束递归
      if (c === ')') break;
    }
    var res = stk.reduce((a, b) => a + b, 0)
    return res;
  }
  return helper(s.split(''));
};

// 官方答案
// 思路：我们先定义一个栈ops=[1]，这个栈遇到(，会将当前的sign放到栈顶（也就是数组的最后）
// ops栈顶，就是我们当前要计算的符号，如果接下来遇到+我们接下来的sign就是 +ops[ops.length-1] 如果遇到-我们接下来的sign就是 -ops[ops.length-1]

// 这里是如何处理括号的，我们上面用的是递归，这里 是将当前的sign加入到ops栈里  当遇到右括号的时候，再将栈顶的元素移除
// 举个例子 2 - (4 + 2) 
// 1.当遇到2的时候 ret += sign(1) * 2 = 2,
// 2.当遇到-号的时候，我们需要改变sign，这时候ops栈顶为默认的1，所以sign为-1
// 3.接下来遇到括号，我们将sign放到ops栈顶这时候为[1,-1]，
// 4.接下来遇到4，num 为 4，然后ret += sign(-1) * num = 2 - 4 = -2
// 5.接下来遇到+，遇到+的时候sign = ops[ops.length - 1]; = -1,说明 2-(4+2)为 2 - 4 -2
// 接着上面，i++遇到了2，我们ret += sign(-1) *2 = -2-2 = -4
// 6.接下来遇到)，这时候我们移除栈顶ops = [1]

var calculate = function(s) {
  // 保存符号的栈
  const ops = [1];
  // 默认的标识sign为1
  let sign = 1;
  // 结果 
  let ret = 0;
  const n = s.length;
  let i = 0;

  // 开始遍历字符串
  while(i < n) {
    if (s[i] === ' ') {
      // 当遇到 ' '跳过
      i++;
    } else if (s[i] === '+') {
      // 当遇到+的时候
      // sign为ops栈顶
      sign = ops[ops.length - 1];
      i++;
    } else if (s[i] === '-') {
      // 当遇到-的时候取反
      sign = -ops[ops.length - 1];
      i++;
    } else if (s[i] === '(') {
      // 遇到左括号，需要将当前的sign放到ops栈顶，以后的计算需要依赖当前栈顶的符号  - ()这时候 括号里的计算都是反着来的
      ops.push(sign);
      i++;
    } else if (s[i] === ')') {
      // 遇到右括号的时候 
      ops.pop();
      i++;
    } else {
      let num = 0;
      // 当遇到数字的时候，我们需要累计将当前无符号的字符串变为数字
      // 因为我们要往后移动i，所以需要判断s[i]是不是空串' '
      while(i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
        num = num * 10 + (s[i] - '0');
        i++;
      }
      // 累加ret
      ret += sign * num;
    }
  }
  return ret;
};

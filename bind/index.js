Function.prototype.call = function () {
  const [context, ...args] = arguments
  // 第一个参数即需要绑定的this上下文
  const _context = context || window
  // this为调用call的函数，将需要执行的函数，放入上下文并执行
  _context.fn = this
  const result = _context.fn(...args)
  // 执行后删除，防止污染
  delete _context.fn
  return result
}
Function.prototype.apply = function () {
  // 第二个参数是数组
  const [context, args] = arguments
  const _context = context || window
  _context.fn = this
  const result = _context.fn(...args)
  delete _context.fn
  return result
}

Function.prototype.bind = function () {
  const [context, ...args] = arguments
  const _context = context || window
  const _this = this
  // bind返回一个函数
  return function () {
    // 调用bind时可能会接收参数 args，返回一个函数后继续接收参数 arguments
    return _this.call(_context, ...args, ...arguments)
  }
}

const SB001 = {
  name: 'SB001',
  sayHello: function (age) {
    console.log(`Hello, I'm ${this.name}, My age is ${age}`)
  },
}

const SB002 = {
  name: 'SB002',
}

console.log('--- call ---')
SB001.sayHello.call(SB002, 24)
console.log('--- apply ---')
SB001.sayHello.apply(SB002, [24])
console.log('--- bind ---')
SB001.sayHello.bind(SB002)(24)

function num(a, b, c) {
  console.log(a, b, c)
  return a + b + c
}
console.log('--- bind2 ---')
const _num = num.bind(null, 10)
// console.log('_num', _num)
const ans = _num(20, 30)
console.log('ans', ans)

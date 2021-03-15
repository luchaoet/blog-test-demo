Function.prototype.call = function () {
  const [context, ...args] = arguments
  context.fn = this
  context.fn(...args)
  delete context.fn
}
Function.prototype.apply = function () {
  const [context, args] = arguments
  context.fn = this
  context.fn(...args)
  delete context.fn
}

Function.prototype.bind = function () {
  const [context, args] = arguments
  context.fn = this
  // bind返回一个函数
  return function () {
    context.fn.call(context, ...arguments)
    delete context.fn
  }
}

var jawil = {
  name: 'jawil',
  sayHello: function (age) {
    // console.log(this)
    console.log('Hello, I am ', this.name, ', My age is', age)
  },
}

var lulin = {
  name: 'lulin',
}

// jawil.sayHello.call(lulin, 24)
// jawil.sayHello.apply(lulin, [24])
jawil.sayHello.bind(lulin)(24)

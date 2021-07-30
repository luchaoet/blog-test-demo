var co = require('./co')

function* foo() {
  yield Promise.resolve(console.log('1'))
  yield Promise.resolve(console.log('2'))
}

function* bar() {
  const a = yield Promise.resolve(1)
  console.log(a)
  const b = yield Promise.resolve(2)
  console.log(b)
}

co(bar) // 1 2

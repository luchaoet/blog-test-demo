// 模拟 Promise 字段名称
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const state = '[[PromiseState]]'
const result = '[[PromiseResult]]'

const empty = () => {}

class Promise {
  // 初始值
  [result] = undefined;
  [state] = PENDING
  handlers = []
  constructor(init) {
    const resolve = this.resolve.bind(this)
    const reject = this.reject.bind(this)
    doResolve(init, resolve, reject)
  }
  resolve() {
    // 只有PENDING状态才允许修改状态，防止race方法中可能多次修改状态
    if (this[state] !== PENDING) return
    const [value] = arguments
    this[result] = value
    this[state] = FULFILLED
    // 已完成 执行then 及 finally中的函数
    this.handlers.forEach((v) => this.handle(v))
    // 清空 防止多个任务的其他任务执行
    this.handlers = null
  }
  reject() {
    // 只有PENDING状态才允许修改状态，防止race方法中可能多次修改状态
    if (this[state] !== PENDING) return
    const [value] = arguments
    this[result] = value
    this[state] = REJECTED
    // 失败 执行catch 及 finally中的函数
    this.handlers.forEach((v) => this.handle(v))
    this.handlers = null
  }
}
Promise.prototype.then = function () {
  const [onFulfilled, onRejected] = arguments
  // 保存 then 中的方法
  this.done(onFulfilled, onRejected)
  return this // 便于链式操作 下同
}
Promise.prototype.catch = function () {
  const [onRejected] = arguments
  // 保存 catch 中的方法
  this.done(null, onRejected)
  return this
}
Promise.prototype.finally = function () {
  const [onFinalled] = arguments
  // 保存 finally 中的方法
  this.done(null, null, onFinalled)
  return this
}
Promise.prototype.done = function () {
  const [onFulfilled, onRejected, onFinalled] = arguments
  this.handle({ onFulfilled, onRejected, onFinalled })
}

Promise.prototype.handle = function () {
  const [handler] = arguments
  const { onFulfilled, onRejected, onFinalled } = handler
  const _onFulfilled = handleFunction(onFulfilled)
  const _onRejected = handleFunction(onRejected)
  const _onFinalled = handleFunction(onFinalled)

  const _state = this[state]
  if (_state === PENDING) {
    this.handlers.push(handler)
  } else if (_state === FULFILLED) {
    _onFulfilled(this[result])
    _onFinalled(this[result])
  } else if (_state === REJECTED) {
    _onRejected(this[result])
    _onFinalled(this[result])
  }
}

//resolve方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
//reject方法
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}
/**
 * race方法
 * 返回最快返回的结果
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
/**
 * all 方法
 * 遇到失败，整体失败，返回当前失败结果；所有promises成功，整体成功，返回成功结果数组
 */
Promise.all = function (promises) {
  const result = []
  const len = promises.length
  let index = 0
  const handleResult = (i, v, resolve) => {
    result[i] = v // 结果顺序对应promises顺序
    index++
    // 均返回成功 整体resolve
    if (index === len) resolve(result)
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      const promise = promises[i]
      // Promise实例
      if (promise instanceof Promise) {
        promises[i].then(
          (v) => handleResult(i, v, resolve), // 返回成功 存储结果
          reject // 存在 reject，整体 reject
        )
      } else {
        // 非Promise实例 直接存储
        handleResult(i, promise, resolve)
      }
    }
  })
}

function doResolve(init, onFulfilled, onRejected) {
  try {
    init(
      (v) => onFulfilled(v), // resolve
      (v) => onRejected(v) // reject
    )
  } catch (e) {
    throw e
  }
}

function handleFunction(func) {
  const empty = () => {}
  return typeof func === 'function' ? func : empty
}

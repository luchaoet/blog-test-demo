function ajax(params) {
  // 实际发送请求方法
  return params + Math.random()
}

const storage = new Map()

// // 代理ajax请求
function proxyAjax(params) {
  console.log(`发送请求: ${params}`)
  // 缓存模式
  if (storage.has(params)) {
    console.log(`cache: ${params}`)
    return storage.get(params)
  }
  console.log(`ajax: ${params}`)
  const value = ajax(params)
  storage.set(params, value)
  return value
}

// 发送参数为1的请求
console.log(proxyAjax(1))
// 发送相同参数为1的请求，cache读取到缓存，所以不再调用ajax方法，直接返回结果
console.log(proxyAjax(1))
// 发送参数为2的请求
console.log(proxyAjax(2))

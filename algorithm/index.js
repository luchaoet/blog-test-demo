Array.prototype.bubbleSort = function () {
  const arr = [...this]
  var len = arr.length
  for (var i = 0; i < len - 1; i++) {
    console.log('i -', i)
    for (var j = 0; j < len - 1 - i; j++) {
      console.log('j', j)
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比

        var temp = arr[j + 1] // 元素交换

        arr[j + 1] = arr[j]

        arr[j] = temp
      }
    }
  }

  return arr
}

const a = [5, 3, 9, 4, 1, 3, 6, 8].bubbleSort()
console.log(a)

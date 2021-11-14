Array.prototype.bubbleSort = function () {
  const arr = [...this]
  const len = arr.length
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
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

// const a = [5, 3, 9, 4, 1, 3, 6, 8].bubbleSort()
// console.log(a)

Array.prototype.insertionSort = function () {
  const arr = [...this]
  const len = arr.length
  for (let index = 1; index < len; index++) {
    // const element = arr[index]
    let comparedIndex = index
    while (comparedIndex > 0 && arr[comparedIndex] < arr[comparedIndex - 1]) {
      const temp = arr[comparedIndex]
      arr[comparedIndex] = arr[comparedIndex - 1]
      arr[comparedIndex - 1] = temp
      comparedIndex--
    }
  }
  return arr
}

const a = [5, 3, 9, 4, 1, 3, 6, 8].insertionSort()
console.log(a)

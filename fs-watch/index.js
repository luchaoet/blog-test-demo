const fs = require('fs')
const chokidar = require('chokidar')

// 只能监听当前目录下的文件，不能监听子文件夹下的文件变动
// fs.watch('./src', function (event, filename) {
//   console.log('event is: ' + event)
//   if (filename) {
//     console.log('filename provided: ' + filename)
//   } else {
//     console.log('filename not provided')
//   }
// })

// One-liner for current directory
chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path)
})

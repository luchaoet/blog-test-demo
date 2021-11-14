const Util = {}

Util.CANVAS = {
  init: function ({ dom, option = {} }) {
    const { width, height } = getComputedStyle(dom) || {}

    // width = document.documentElement.clientWidth, height = document.documentElement.clientHeight
    console.log(width, height)
    const { xAxis } = option
    const type = xAxis.type
    Util.CANVAS[type](dom, option)
  },
  // 处理显示模糊问题
  createElement: function (w = 300, h = 150) {
    var ratio = window.devicePixelRatio || 1
    var canvas = document.createElement('canvas')
    canvas.width = w * ratio // 实际渲染像素
    canvas.height = h * ratio // 实际渲染像素
    canvas.style.width = `${w}px` // 控制显示大小
    canvas.style.height = `${h}px` // 控制显示大小
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
    return canvas
  },
  // 绘制线条
  drawLine: function ({ context, startPoint = { x: 0, y: 0 }, lineTo = [], lineWidth = 1, strokeStyle = '#333' }) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.strokeStyle = strokeStyle
    context.moveTo(startPoint.x, startPoint.y)
    for (let i = 0; i < lineTo.length; i++) {
      const { x, y } = lineTo[i]
      context.lineTo(x, y)
    }
    context.stroke()
    context.closePath()
  },

  category: function (dom, option) {
    const { xAxis, yAxis, series } = option
  },
}

// option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       type: 'line',
//       smooth: true,
//     },
//   ],
// }

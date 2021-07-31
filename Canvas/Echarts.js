/**
 * Echarts 类
 */
class Echarts {
  constructor(dom) {
    this.dom = dom
  }
  setOption(option) {
    this.option = option
    this.init()
  }
  init() {
    const { option, dom } = this
    const { xAxis, yAxis, series } = option
    const tem = series.reduce((a, b) => {
      return [...a.data, ...b.data]
    })
    const max = Math.max(...tem)

    const minValue = Math.ceil(max / 6)

    // console.log(dom.height)

    const minHeight = Math.ceil((dom.height - 20) / 6)

    var context = dom.getContext('2d')
    // context.scale(1, 1)
    context.lineWidth = 1

    context.beginPath()
    context.moveTo(50, 300.5)
    context.lineTo(500, 300.5)
    context.strokeStyle = '#000'
    context.stroke()

    // for (let i = 6; i >= 0; i--) {
    //   context.beginPath()
    //   context.moveTo(10, minHeight * i + 0.5)
    //   context.lineTo(dom.width - 10, minHeight * i + 0.5)
    //   if (i === 6) {
    //     context.strokeStyle = '#000'
    //   } else {
    //     context.strokeStyle = '#e0e6f1'
    //   }
    //   context.stroke()
    // }
  }
}

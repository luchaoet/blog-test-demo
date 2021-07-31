const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
    {
      data: [22, 34, 40, 50, 60, 70, 80],
      type: 'line',
    },
  ],
}

var chart = document.getElementById('chart')
const myChart = new Echarts(chart)
myChart.setOption(option)

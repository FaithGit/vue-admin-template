<template>
  <div id="powerEcharts" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  data() {
    return {
      powerList: [{
        month: '1月',
        value: 2500
      },
      {
        month: '2月',
        value: 2800
      },
      {
        month: '3月',
        value: 3000
      },

      {
        month: '4月',
        value: 2600
      },

      {
        month: '5月',
        value: 3500
      },

      {
        month: '6月',
        value: 2500
      },
      {
        month: '7月',
        value: 3200
      },
      {
        month: '8月',
        value: 3100
      },
      {
        month: '9月',
        value: 2900,
        ratio: 87.3
      },
      {
        month: '10月',
        value: 2500
      },
      {
        month: '11月',
        value: 3600
      },
      {
        month: '12月',
        value: 3400,
        ratio: 87.3
      },
      {
        month: '1月',
        value: 2800
      },
      {
        month: '2月',
        value: 3000
      },
      {
        month: '3月',
        value: 2400
      }

      ]
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      var xData = []
      var yData = []
      var min = 50
      this.powerList.map(function(a, b) {
        xData.push(a.month)
        if (a.value === 0) {
          yData.push(a.value + min)
        } else {
          yData.push(a.value)
        }
      })
      console.log('xData', xData)
      console.log('yData', yData)

      const myChart = echarts.init(document.getElementById('powerEcharts'))

      var option = {
        backgroundColor: '#041a51',
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0
            }
          },
          formatter: function(prams) {
            if (prams[0].data === min) {
              return '用电量：0W'
            } else {
              return '用电量：' + prams[0].data + 'W'
            }
          }
        },
        legend: {
          data: ['直接访问', '背景'],
          show: false
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '10%',
          height: '85%',
          containLabel: true,
          z: 22
        },
        xAxis: [{
          type: 'category',
          gridIndex: 0,
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#0c3b71'
            }
          },
          axisLabel: {
            show: true,
            color: 'rgb(170,170,170)',
            fontSize: 16
          }
        }],
        yAxis: [{
          type: 'value',
          name: '单位:瓦',
          nameTextStyle: {
            color: 'rgb(170,170,170)'
          },
          gridIndex: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // min: min,
          // max: 100,
          axisLine: {
            lineStyle: {
              color: '#0c3b71'
            }
          },
          axisLabel: {
            color: 'rgb(170,170,170)',
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          gridIndex: 0,
          min: min,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
        ],
        series: [{
          name: '合格率',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00feff'
                },
                {
                  offset: 0.5,
                  color: '#027eff'
                },
                {
                  offset: 1,
                  color: '#0286ff'
                }
                ]
              )
            }
          },
          data: yData,
          zlevel: 11

        },
        {
          name: '背景',
          type: 'bar',
          barWidth: '50%',
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: '-135%',
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          zlevel: 9
        }

        ]
      }

      myChart.setOption(option)
      window.onresize = myChart.resize
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div id="distribution12" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    monthList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {
    monthList: {
      deep: true,
      handler(nv) {
        this.drawChart()
      }
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart12 = echarts.init(document.getElementById('distribution12'))
      console.log(this.monthList)
      const arr = []
      for (var i = 0; i < this.monthList.length; i++) {
        arr.push(this.monthList[i].num)
      }
      var option = {

        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2020']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        toolbox: {
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两边留白
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisLabel: {
            // 坐标轴刻度标签的相关设置。
            interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            textStyle: {
              color: '#1B253A',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            },
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 4 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
            // rotate:50,
          },
          axisTick: {
            // 坐标轴刻度相关设置。
            show: false
          },
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: '#E5E9ED'
              // opacity:0.2
            }
          },
          splitLine: {
            // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: '#E5E9ED'
              // 	opacity:0.1
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E5E9ED'
                // 	opacity:0.1
              }
            }
          }
        ],
        series: [
          {
            name: '2020',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(255,80,124,1)',
                lineStyle: {
                  color: 'rgba(255,80,124,1)',
                  width: 1
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(255,80,124,0)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(255,80,124,0.35)'
                    }
                  ])
                }
              }
            },
            data: arr
          }
        ]
      }

      myChart12.setOption(option)
      // window.onresize = myChart12.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => {
        myChart12.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

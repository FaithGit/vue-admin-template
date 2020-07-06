<template>
  <div id="distribution13" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  // props: {
  //   monthList: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {}
  },
  // watch: {
  //   monthList: {
  //     deep: true,
  //     handler(nv) {
  //       this.drawChart()
  //     }
  //   }
  // },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart13 = echarts.init(document.getElementById('distribution13'))
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: e => {
            return `
                ${e.name}<br/>
                次数: ${e.data.value}<br/>
                处理率: ${e.data.rate}%
            `
          }
        },
        angleAxis: {
          type: 'category',
          // 去掉边线
          axisLine: {
            show: false
          }
        },
        radiusAxis: {
          max: 100,
          // 去掉刻度线
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          radius: [0, '50%']
        },
        series: [
        // 饼图
          {
            type: 'pie',
            radius: [0, '50%'],
            label: {
              color: '#333',
              lineHeight: 14,
              formatter: e => {
                return `${e.name}\n次数: ${e.data.value}\n处理率: ${e.data.rate}%`
              }
            },
            labelLine: {
              length: 20,
              lineStyle: {
                color: '#999'
              }
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#fff',
              shadowColor: 'rgba(0, 0, 0, .2)',
              shadowBlur: 6,
              shadowOffsetY: 4
            },
            data: [
              {
                value: 45,
                // 因为触发的是饼图的 tooltip，这里对应放极坐标的 data 值
                rate: 78,
                name: '排放温度',
                itemStyle: {
                  color: 'rgba(255, 198, 93, .4)'
                }
              },
              {
                value: 47,
                rate: 65,
                name: '风机',
                itemStyle: {
                  color: 'rgba(127, 229, 253, .4)'
                }
              },
              {
                value: 48,
                rate: 50,
                name: '水喷淋',
                itemStyle: {
                  color: 'rgba(145, 205, 241, .4)'
                }
              },
              {
                value: 30,
                rate: 80,
                name: '净化器',
                itemStyle: {
                  color: 'rgba(152, 234, 220, .4)'
                }
              }
            ]
          },
          // 极坐标 - 玫瑰图
          {
            type: 'bar',
            name: '排放温度',
            max: 100, // 100 的比例
            data: [78], // 控制半径占比
            barWidth: (45 / 170) * 100 + '%', // 控制和饼图角度一致
            barGap: 0,
            itemStyle: {
              color: '#ffc65d',
              shadowColor: '#000',
              shadowBlur: 6
            },
            coordinateSystem: 'polar'
          }, {
            type: 'bar',
            name: '风机',
            data: [65],
            max: 100,
            barWidth: (47 / 170) * 100 + '%',
            barGap: 0,
            itemStyle: {
              color: '#7fe5fd',
              shadowColor: '#000',
              shadowBlur: 6
            },
            coordinateSystem: 'polar'
          }, {
            type: 'bar',
            name: '水喷淋',
            data: [50],
            max: 100,
            barWidth: (48 / 170) * 100 + '%',
            barGap: 0,
            itemStyle: {
              color: '#8db9ff',
              shadowColor: '#000',
              shadowBlur: 6
            },
            coordinateSystem: 'polar'
          }, {
            type: 'bar',
            name: '净化器',
            data: [80],
            max: 100,
            barWidth: (30 / 170) * 100 + '%',
            barGap: 0,
            itemStyle: {
              color: '#a3ffc5',
              shadowColor: '#000',
              shadowBlur: 6
            },
            coordinateSystem: 'polar'
          }
        ]
      }

      myChart13.setOption(option)
      // window.onresize = myChart13.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => {
        myChart13.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

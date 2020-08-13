<template>
  <div id="distribution13" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    fenbulvlist: {
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
      console.log('这个是后端传过来的异常分布及处理率', this.fenbulvlist)
      var colorList = ['rgba(255, 198, 93, .4)', 'rgba(127, 229, 253, .4)', 'rgba(145, 205, 241, .4)', 'rgba(152, 234, 220, .4)', 'rgba(12, 124, 20, .4)']
      // var series = []
      var obj1 = {
        type: 'pie',
        radius: [0, '50%'],
        label: {
          color: '#333',
          lineHeight: 14,
          formatter: e => {
            return `${e.name}\n次数: ${e.data.value}\n`
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

        ]
      }
      for (let i = 0; i < this.fenbulvlist.length; i++) {
        obj1.data.push({
          value: this.fenbulvlist[i].value,
          // 因为触发的是饼图的 tooltip，这里对应放极坐标的 data 值

          name: this.fenbulvlist[i].name,
          itemStyle: {
            color: colorList[i]
          }
        })
      }

      const myChart13 = echarts.init(document.getElementById('distribution13'))
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: e => {
            return `
                ${e.name}<br/>
                次数: ${e.data.value}<br/>
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
          obj1
          // 极坐标 - 玫瑰图
          // {
          //   type: 'bar',
          //   name: '排放温度',
          //   max: 100, // 100 的比例
          //   data: [78], // 控制半径占比
          //   barWidth: (45 / 170) * 100 + '%', // 控制和饼图角度一致
          //   barGap: 0,
          //   itemStyle: {
          //     color: '#ffc65d',
          //     shadowColor: '#000',
          //     shadowBlur: 6
          //   },
          //   coordinateSystem: 'polar'
          // }, {
          //   type: 'bar',
          //   name: '风机',
          //   data: [65],
          //   max: 100,
          //   barWidth: (47 / 170) * 100 + '%',
          //   barGap: 0,
          //   itemStyle: {
          //     color: '#7fe5fd',
          //     shadowColor: '#000',
          //     shadowBlur: 6
          //   },
          //   coordinateSystem: 'polar'
          // }, {
          //   type: 'bar',
          //   name: '水喷淋',
          //   data: [50],
          //   max: 100,
          //   barWidth: (48 / 170) * 100 + '%',
          //   barGap: 0,
          //   itemStyle: {
          //     color: '#8db9ff',
          //     shadowColor: '#000',
          //     shadowBlur: 6
          //   },
          //   coordinateSystem: 'polar'
          // }, {
          //   type: 'bar',
          //   name: '净化器',
          //   data: [80],
          //   max: 100,
          //   barWidth: (30 / 170) * 100 + '%',
          //   barGap: 0,
          //   itemStyle: {
          //     color: '#a3ffc5',
          //     shadowColor: '#000',
          //     shadowBlur: 6
          //   },
          //   coordinateSystem: 'polar'
          // }
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

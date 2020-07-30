<template>
  <div id="distribution" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    echartData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {
    echartData: {
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
      const myChart3 = echarts.init(document.getElementById('distribution'))
      const bgColor = '#041a51'
      const title = '总量'
      const color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']

      const formatNumber = function(num) {
        const reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      const total = this.echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0)

      var option = {
        backgroundColor: bgColor,
        color: color,
        legend: {
          // orient: 'vertical', // 'vertical'
          x: 'left', // 'center' | 'left' | {number},
          y: '10', // 'center' | 'bottom' | {number}
          padding: 15, // [5, 10, 15, 20]
          itemGap: 3,
          textStyle: { color: '#c3cad9' }
        },
        title: [{
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
          top: '45%',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: 'normal',
                color: '#ffffff',
                padding: [10, 0]
              },
              val: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#ffffff'
              }
            }
          }
        }
        // {
        //   text: '单位：个',
        //   top: 20,
        //   left: 20,
        //   textStyle: {
        //     fontSize: 14,
        //     color: '#666666',
        //     fontWeight: 400
        //   }
        // }
        ],
        series: [{
          type: 'pie',
          radius: ['30%', '40%'],
          center: ['50%', '55%'],
          data: this.echartData,
          minAngle: 10,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderColor: bgColor,
              borderWidth: 2
            }
          },
          labelLine: {
            normal: {
              length: 19,
              length2: 40,
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          label: {
            normal: {
              // formatter(v) {
              //   let text = Math.round(v.percent) + '%' + '' + v.name
              //   if (text.length <= 8) {
              //     return text
              //   } else if (text.length > 8 && text.length <= 16) {
              //     return text = `${text.slice(0, 8)}\n${text.slice(8)}`
              //   } else if (text.length > 16 && text.length <= 24) {
              //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16)}`
              //   } else if (text.length > 24 && text.length <= 30) {
              //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24)}`
              //   } else if (text.length > 30) {
              //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}`
              //   }
              // },
              textStyle: {
                fontSize: 14
              }
            }
          }
        }]
      }

      myChart3.setOption(option)
      // window.onresize = myChart3.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => { myChart3.resize() })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

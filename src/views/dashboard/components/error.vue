<template>
  <div id="distribution9" style="height:100%;width:100%" />
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
      const myChart9 = echarts.init(document.getElementById('distribution9'))
      const bgColor = '#FFFFFF'
      const title = '总量'
      const color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']
      const echartData = this.echartData

      const formatNumber = function(num) {
        const reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      const total = echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0)

      var option = {
        backgroundColor: bgColor,
        color: color,
        legend: {
          // orient: 'vertical', // 'vertical'
          x: 'left', // 'center' | 'left' | {number},
          y: '30', // 'center' | 'bottom' | {number}
          padding: 15, // [5, 10, 15, 20]
          itemGap: 3,
          textStyle: { color: '#000' }
        },
        title: [{
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
          top: '60%',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: 'normal',
                color: '#000',
                padding: [10, 0]
              },
              val: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#000'
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
          center: ['50%', '75%'],
          minAngle: 20,
          data: echartData,
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
              length2: 90,
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return (
                  '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '}'
                )
              },
              padding: [0, -100, 25, -100],
              rich: {
                icon: {
                  fontSize: 16
                },
                name: {
                  fontSize: 14,
                  padding: [0, 10, 0, 4],
                  color: '#000'
                },
                value: {
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000'
                }
              }
            }
          }
        }]
      }

      myChart9.setOption(option)
      // window.onresize = myChart9.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => { myChart9.resize() })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

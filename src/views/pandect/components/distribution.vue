<template>
  <div id="distribution" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  data() {
    return {
      city: ['4-01', '4-02', '4-03', '4-04', '4-05', '4-06  '],
      num: ['40', '60', '22', '85', '50', '40']
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(document.getElementById('distribution'))
      const bgColor = '#041a51'
      const title = '总量'
      const color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']
      const echartData = [{
        name: '静电电流',
        value: '372'
      },
      {
        name: '风机异常',
        value: '292'
      },
      {
        name: '排放温度',
        value: '220'
      },
      {
        name: '水喷淋',
        value: '1420'
      },
      {
        name: '生产温度',
        value: '256'
      }
      ]

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
              length: 15,
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
                  color: '#ffffff'
                },
                value: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#ffffff'
                }
              }
            }
          }
        }]
      }

      myChart.setOption(option)
      window.onresize = myChart.resize
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

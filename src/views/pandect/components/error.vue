<template>
  <div id="errEcharts" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    city: {
      type: Array,
      default: function() {
        return []
      }
    },
    num: {
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
    city: {
      deep: true,
      handler(nv) {
        this.drawChart()
      }
    }
  },
  mounted() {

  },
  methods: {
    drawChart() {
      const myChart1 = echarts.init(document.getElementById('errEcharts'))

      var option = {
        backgroundColor: '#041a51',
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            handleStyle: {
              color: '#094198'
            },
            textStyle: {
              color: 'rgba(255,255,255,1)'
            },
            fillerColor: 'rgba(67,55,160,0.4)',
            borderColor: 'rgba(204,187,225,0.5)'
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,255,255,0)' // 0% 处的颜色
                }, {
                  offset: 0.5,
                  color: 'rgba(255,255,255,1)' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(255,255,255,0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }

        },
        grid: {
          top: '10%',
          left: '10%',
          right: '5%',
          bottom: '30%'
        // containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { // 坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: 'color:"#092b5d"'
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            textStyle: {
              color: '#24c4ff',
              margin: 15
            },
            formatter: function(data) {
              return data
            }
          },
          axisTick: {
            show: false
          },
          data: this.city
        }],
        yAxis: [{
          min: 0,
          max: 100,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#092b5d'
            }

          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#24c4ff'

            },
            formatter: function(value) {
              if (value === 0) {
                return value
              }
              return value
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '异常数量',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#7c80f4' // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)'
          },
          itemStyle: {
            color: 'rgba(14,30,73,1)',
            borderColor: '#646ace',
            borderWidth: 2

          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: [
                ' {a|{c}}'
              ].join(','),
              rich: {
                a: {
                  color: '#fff',
                  align: 'center'
                }
              }
            }
          },
          tooltip: {
            show: true
          },
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(124, 128, 244,.3)'

              },
              {
                offset: 1,
                color: 'rgba(124, 128, 244, 0)'
              }
              ], false),
              shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: this.num
        }]
      }

      myChart1.setOption(option)
      window.onresize = myChart1.resize
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

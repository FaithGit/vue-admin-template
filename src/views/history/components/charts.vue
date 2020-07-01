<template>
  <div>
    <div v-show="tabledata.length!=0" id="historyCharts" style="height:100%" />
  </div>

</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    tabledata: {
      type: Array,
      required: true
    }
  },
  watch: {
    tabledata: {
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
      console.log('执行了吗')
      const timeArr = []
      const shujuArr = []
      for (var i = this.tabledata.length - 1; i >= 0; i--) {
        timeArr.push(this.tabledata[i].data_time)
        shujuArr.push(this.tabledata[i].data_time)
      }

      const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF', '#f10948', '#0E67FF']
      var historyCharts = echarts.init(document.getElementById('historyCharts'))
      var option = {
        backgroundColor: '#fff',
        title: {
          text: '设备历史数据',
          textStyle: {
            fontSize: 18,
            fontWeight: 400
          },
          left: 'center',
          top: '0%'
        },
        legend: {
          icon: 'circle',
          top: '5%',
          right: '5%',
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#556677'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,0)',
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        grid: {
          top: '15%'
        },
        xAxis: [{
          type: 'category',
          data: timeArr,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#606266' // 坐标轴的颜色
            }
          },
          'axisTick': {
            'show': false
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#556677'
            }
          },
          splitLine: {
            show: false
          }
        }, {
          type: 'value',
          position: 'right',
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#556677'
            },
            formatter: '{value}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCE2E8'
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: '风机电流',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[1],
              borderColor: colorList[1]
            }
          }
        },
        {
          name: '水喷淋',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[2],
              borderColor: colorList[2]
            }
          }
        },
        {
          name: '风机负荷',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[3],
              borderColor: colorList[3]
            }
          }
        },
        {
          name: '风量',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[4],
              borderColor: colorList[4]
            }
          }
        },
        {
          name: '净化器电流',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[5],
              borderColor: colorList[5]
            }
          }
        },
        {
          name: '净化负荷',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[6],
              borderColor: colorList[6]
            }
          }
        },
        {
          name: '功率',
          type: 'line',
          data: [33.48, 33.52, 33.49, 33.47, 33.47, 33.45, 33.62, 33.52, 33.54, 33.6],
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          itemStyle: {
            normal: {
              color: colorList[0],
              borderColor: colorList[0]
            }
          }
        }
        ]
      }
      historyCharts.setOption(option)
      // window.onresize = myChart3.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => {
        historyCharts.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

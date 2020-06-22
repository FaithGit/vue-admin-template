<template>
  <div id="errEcharts1" style="height:380px" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    datatime: {
      type: Array,
      required: true
    },
    datalist: {
      type: Array,
      required: true
    },
    devicename: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      colorArry: [
        '#123dac',
        '#73e2e2',
        '#ff7e85',
        '#9b52ff',
        '#fac524',
        '#46caff',
        '#a1e867',
        '#10b2b2',
        '#ec87f7',
        '#f4905a',
        '#00baba',
        '#facf24',
        '#e89d67',
        '#23c6c6',
        '#fa8699',
        '#40b7fc',
        '#006d75',
        '#595959',
        '#f4764f',
        '#a640fc',
        '#fda23f',
        '#2d7ae4',
        '#5092ff',
        '#9351ed',
        '#8a89fe',
        '#df89e8',
        '#2797ff',
        '#6ad089',
        '#7c92e8 '
      ]
    }
  },
  watch: {
    datatime: {
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
      var fuseries = []
      for (var i = 0; i < this.datalist.length; i++) {
        fuseries.push({
          name: this.devicename[i],
          data: this.datalist[i],
          type: 'line',
          smooth: true,
          smoothMonotone: 'x',
          cursor: 'pointer',
          showSymbol: false,
          lineStyle: {
            shadowColor: this.colorArry[i],
            shadowBlur: 10
          }
        })
      }

      const myChart5 = echarts.init(document.getElementById('errEcharts1'))
      const xAxisData = this.datatime
      var option = {
        textStyle: {
          fontFamily: 'Din-Light'
        },
        color: [
          '#123dac',
          '#73e2e2',
          '#ff7e85',
          '#9b52ff',
          '#fac524',
          '#46caff',
          '#a1e867',
          '#10b2b2',
          '#ec87f7',
          '#f4905a',
          '#00baba',
          '#facf24',
          '#e89d67',
          '#23c6c6',
          '#fa8699',
          '#40b7fc',
          '#006d75',
          '#595959',
          '#f4764f',
          '#a640fc',
          '#fda23f',
          '#2d7ae4',
          '#5092ff',
          '#9351ed',
          '#8a89fe',
          '#df89e8',
          '#2797ff',
          '#6ad089',
          '#7c92e8 '
        ],
        title: {
          text: '',
          left: '47%',
          textStyle: {
            fontSize: 24
          }
        },
        legend: {
          data: this.devicename,
          left: 'left',

          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            color: '#898989',
            lineHeight: 15
          },
          type: 'scroll'
        },
        tooltip: {
          backgroundColor: '#fff',
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          textStyle: {
            color: '#565656',
            lineHeight: 28
          },
          confine: true,
          padding: 12,
          extraCssText:
            'box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;',
          formatter: {
            _custom: {
              type: 'function',
              display: '<span>ƒ</span> (params)'
            }
          }
        },
        grid: {
          left: 30,
          right: 30,
          top: 50,
          bottom: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xAxisData,
          axisLabel: {
            color: '#a0a9bc',
            // X轴标签 label 做了特殊处理，防止左右溢出
            formatter: (value, index) => {
              if (index === 0 || index === xAxisData.length - 1) {
                return ''
              }
              return value
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: 'gray'
          },
          type: 'value',
          axisLabel: {
            color: '#a0a9bc',
            inside: true,
            margin: 0,
            verticalAlign: 'bottom'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          minInterval: 1,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: fuseries
      }

      myChart5.setOption(option)
      // window.onresize = myChart3.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => {
        myChart5.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

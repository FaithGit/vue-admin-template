<template>
  <div id="errEcharts1" style="height:100%" />
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
    return {}
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
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart5 = echarts.init(document.getElementById('errEcharts1'))

      const xAxisData = [
        '17:00:00',
        '16:45:00',
        '16:30:00',
        '16:15:00',
        '16:00:00',
        '15:45:00',
        '15:30:00',
        '15:15:00',
        '15:00:00',
        '14:45:00',
        '14:30:00',
        '14:15:00',
        '14:00:00',
        '13:45:00',
        '13:30:00',
        '13:15:00',
        '13:00:00',
        '12:45:00',
        '12:30:00',
        '12:15:00',
        '12:00:00',
        '11:45:00',
        '11:30:00',
        '11:15:00'
      ]
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
          data: [
            {
              name: '压延机1',
              icon:
                'path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z'
            },
            {
              name: '压延机2',
              icon:
                'path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z'
            },
            {
              name: '压延机3',
              icon:
                'path://M512 139.81262864a286.42534744 286.42534744 0 1 0 286.42534744 286.42534744 286.42534744 286.42534744 0 0 0-286.42534744-286.42534744z m0 477.3755789a190.95023144 190.95023144 0 1 1 190.95023144-190.95023146 190.95023144 190.95023144 0 0 1-190.95023144 190.95023146z'
            }
          ],
          left: 'left',
          selected: {
            压延机1: true,
            压延机2: true,
            压延机3: true
          },
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
          left: 0,
          right: 0,
          top: 40,
          bottom: 20
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
        series: [
          {
            name: '压延机1',
            data: [
              43,
              58,
              195,
              229,
              320,
              211,
              124,
              131,
              124,
              360,
              124,
              78,
              160,
              604,
              17,
              0,
              0,
              0,
              2,
              8,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            cursor: 'pointer',
            showSymbol: false,
            lineStyle: {
              shadowColor: 'rgba(18,61,172,0.5)',
              shadowBlur: 10
            }
          },
          {
            name: '压延机2',
            data: [
              23,
              39,
              118,
              71,
              116,
              89,
              58,
              71,
              51,
              146,
              31,
              41,
              61,
              485,
              5,
              0,
              0,
              0,
              0,
              3,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            cursor: 'pointer',
            showSymbol: false,
            lineStyle: {
              shadowColor: 'rgba(115,226,226,0.5)',
              shadowBlur: 10
            }
          },
          {
            name: '压延机3',
            data: [
              20,
              37,
              91,
              72,
              68,
              67,
              54,
              42,
              42,
              115,
              41,
              33,
              64,
              312,
              4,
              0,
              0,
              0,
              3,
              4,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            cursor: 'pointer',
            showSymbol: false,
            lineStyle: {
              shadowColor: 'rgba(255,126,133,0.5)',
              shadowBlur: 10
            }
          }
        ]
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

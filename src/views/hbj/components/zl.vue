<template>
  <div id="distribution11" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    zlList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
    zlList: {
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
      const myChart11 = echarts.init(document.getElementById('distribution11'))
      var set = [
      ]
      for (var i = 0; i < this.zlList.length; i++) {
        const temp = []
        temp[0] = this.zlList[i].value
        temp[1] = this.zlList[i].num
        set[i] = temp
      }

      var option = {
        // backgroundColor:"#ccc",
        dataset: {
          source: set
        },
        xAxis: {
          type: 'value'

        },
        yAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        // name:'记忆轮次'
        },
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: 170,
          top: 16,
          right: 48,
          bottom: 24
        },
        series: [{
          type: 'bar',
          barWidth: '60%',
          smooth: true,
          color: '#4A90E2',
          label: {
            show: true,
            formatter: params => {
              // console.log(params);
              return params.data[1]
            },
            position: 'right',
            color: '#7F7F7F'
          }
        }]
      }

      myChart11.setOption(option)
      // window.onresize = myChart11.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => { myChart11.resize() })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

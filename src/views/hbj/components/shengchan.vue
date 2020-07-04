<template>
  <div id="distribution11" style="height:100%" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    shengchanList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
    shengchanList: {
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
      // console.log('生产列表')
      // console.log(this.shengchanList)
      var xrr = []
      var drr = []
      for (var i = 0; i < this.shengchanList.length; i++) {
        xrr.push(this.shengchanList[i].value)
        drr.push(this.shengchanList[i].num)
      }
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xrr,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: drr
          }
        ]
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

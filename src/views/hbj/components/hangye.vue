<template>
  <div id="distribution10" style="height:200px" />
</template>

<script>
var echarts = require('echarts')
export default {
  props: {
    busData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
    busData: {
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
      const myChart10 = echarts.init(document.getElementById('distribution10'))
      const arr = []
      for (var i = 0; i < this.busData.length; i++) {
        arr.push({
          value: this.busData[i].comNum,
          name: this.busData[i].value
        })
      }

      var option = {
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '10%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C'
          }

        },
        series: [
          {
            name: '行业',
            type: 'pie',
            radius: [0, 80],

            data: arr
          }
        ]
      }

      myChart10.setOption(option)
      // window.onresize = myChart10.resize
      // 注意：如果是一个页面中插入多个echarts图，那么需要用第一种方式来监听resize事件，即：window.addEventListener，若选用第二种方法只能监听一个echarts图的自适应。区别在于addEventListener与on上，有兴趣可以自行查阅。
      window.addEventListener('resize', () => { myChart10.resize() })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

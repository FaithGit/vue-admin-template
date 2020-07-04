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
      const myChart5 = echarts.init(document.getElementById('errEcharts1'))
      var option = {}
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

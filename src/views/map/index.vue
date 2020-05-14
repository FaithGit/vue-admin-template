
<template>
  <div class="test">
    <div id="container" />
  </div>
</template>
<script>
import MapLoader from '@/utils/map'
export default {
  name: 'Test',
  data() {
    return {
      map: null
    }
  },
  mounted() {
    const that = this
    MapLoader().then(AMap => {
      console.log('地图加载成功')
      that.map = new AMap.Map('container', {
        center: [120.680757, 30.510659],
        zoom: 12
      })
    }, e => {
      console.log('地图加载失败', e)
    })
  }
}
</script>
<style lang="scss" scoped>
 #container{
   height: 100vh;
   width:100vw
 }
</style>


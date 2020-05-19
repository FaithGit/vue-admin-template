
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
        zoom: 11
      })

      AMap.plugin('AMap.DistrictSearch', function() {
        var opts = {
          subdistrict: 0, // 获取边界不需要返回下级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'city' // 查询行政级别为 市
        }
        var district = new AMap.DistrictSearch(opts)
        district.search('海宁市', function(status, result) {
          // 查询成功时，result即为对应的行政区信息
          var bounds = result.districtList[0].boundaries

          for (var i = 0, l = bounds.length; i < l; i++) {
            var polygonbox = new AMap.Polygon({
              strokeWeight: 3,
              path: bounds[i],
              fillOpacity: 0.9,
              fillColor: '#6e3fc8',
              strokeColor: '#6e3fc8',
              extData: {
                IDname: '海宁',
                Center: '传递内容'
              }
            })

            that.map.add(polygonbox)
            var marker = new AMap.Marker({
              position: new AMap.LngLat(120.678043, 30.492398), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: '汽车北站'
            })
            // 将创建的点标记添加到已有的地图实例：
            that.map.add(marker)
          }
        })
      }
      )
    }, e => {
      console.log('地图加载失败', e)
    })
  },
  destroyed() {
    this.map.destroy()
  }
}
</script>
<style lang="scss" scoped>
 #container{
   height: 100vh;
   width:100vw
 }
</style>


<template>
  <div class="dashboard-container">
    <div class="dashboardHead">
      <img src="@img/hs_logo.png" style="height:56px;margin:7px">
      <span class="hs_headTitle">嘉兴环保系统</span>
      <span class="hs_headTitle" style="float:right;margin-right:20px;font-size:18px">
        返回首页
      </span>
    </div>
    <div class="hs_content">
      <el-row>
        <el-col :span="6">
          <div class="kuang kuangTop">
            <div class="kuang-content">
              <div class="left-title">
                数据
              </div>
              <div class="kuang-body-flex">
                <table class="mian-table" style="  border: 1px solid #094198; width:94%">
                  <tr>
                    <td class="main-td">监测点位数</td>
                    <td class="main-td">监测企业数</td>
                    <td class="main-td">异常企业数</td>
                    <td class="main-td">限产企业数</td>
                  </tr>
                  <tr>
                    <td class="main-tdNum">1</td>
                    <td class="main-tdNum">2</td>
                    <td class="main-tdNum">3</td>
                    <td class="main-tdNum">4</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="kuang kuangMiddle">
            <div class="kuang-content">
              <div class="left-title">
                动态栏
              </div>
              <div class="kuang-body">
                <div v-for="(itemList,index) in list" :key="itemList.company" class="kuang-body-ui">
                  {{ index+1 }}
                  <span style="width:30%;display:inline-block;text-align:center;word-wrap: break-word">{{ itemList.company }}  </span>
                  <span style="width:30%;display:inline-block;text-align:center;word-wrap: break-word">{{ itemList.time }}  </span>
                  <span style="width:30%;display:inline-block;text-align:center;word-wrap: break-word">{{ itemList.message }}  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="kuang height4 kuangEnd">
            <div class="kuang-content">
              <div class="left-title">
                用电量
              </div>
              <div class="kuang-body">
                <userPower />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="kuang kuang10 height10">
            <div class="kuang-content" style="padding:20px">
              <div class="left-title" style="width:20%">
                地图
              </div>
              <div id="container1" style="width:100&;height:100%;" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="kuang kuangTop">
            <div class="kuang-content">
              <div class="left-title">
                用电量
              </div>
              <div class="kuang-body-flex">
                <table class="mian-table" style="  border: 1px solid #094198; width:94%">
                  <tr>
                    <td class="main-td">监测点位数</td>
                    <td class="main-td">监测企业数</td>
                    <td class="main-td">异常企业数</td>
                    <td class="main-td">限产企业数</td>
                  </tr>
                  <tr>
                    <td class="main-tdNum">1</td>
                    <td class="main-tdNum">2</td>
                    <td class="main-tdNum">3</td>
                    <td class="main-tdNum">4</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="kuang kuangMiddle">
            <div class="kuang-content">
              <div class="left-title" style="width:50%">
                当月异常告警趋势变化
              </div>
              <div class="kuang-body">
                <error />
              </div>
            </div>
          </div>
          <div class="kuang height4 kuangEnd">
            <div class="kuang-content">
              <div class="left-title">
                当月异常分布
              </div>
              <distribution />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import MapLoader from '@/utils/map'
import userPower from './components/userPower'
import error from './components/error'
import distribution from './components/distribution'

export default {
  name: 'Pandect',
  components: {
    userPower,
    error,
    distribution
  },
  data() {
    return {
      map: null,
      list: [
        {
          company: 'xxxxx',
          time: '2020-04-23 12:00',
          message: 'xxx未达标'
        },
        {
          company: 'yyyy',
          time: '2011,12,11,03,15',
          message: 'yyy未达标'
        },
        {
          company: 'zzz1',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        },
        {
          company: 'zzz2',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        },
        {
          company: 'zzz3',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        },
        {
          company: 'zzz4',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        },
        {
          company: 'zzz5',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        },
        {
          company: 'zzz6',
          time: '2012,20,16,42,15',
          message: 'zzz达标'
        }
      ]

    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
  mounted() {
    const that = this
    MapLoader().then(AMap => {
      // 实例化信息窗体
      var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>'
      var content = []
      content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里")
      content.push('电话：010-64733333')
      content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>")

      var infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        content: createInfoWindow(title, content.join('<br/>')),
        offset: new AMap.Pixel(16, -45)
      })

      function closeInfoWindow() {
        that.map.clearInfoWindow()
      }
      // 构建自定义信息窗体
      function createInfoWindow(title, content) {
        var info = document.createElement('div')
        info.className = 'custom-info input-card content-window-card'
        info.style.backgroundColor = 'white'

        // 可以通过下面的方式修改自定义窗体的宽高
        // info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement('div')
        var titleD = document.createElement('div')
        var closeX = document.createElement('img')
        top.className = 'info-top'
        titleD.innerHTML = title
        closeX.src = 'https://webapi.amap.com/images/close2.gif'
        closeX.onclick = closeInfoWindow

        top.appendChild(titleD)
        top.appendChild(closeX)
        info.appendChild(top)

        // 定义中部内容
        var middle = document.createElement('div')
        middle.className = 'info-middle'
        middle.style.backgroundColor = 'white'
        middle.innerHTML = content
        info.appendChild(middle)

        // 定义底部内容
        var bottom = document.createElement('div')
        bottom.className = 'info-bottom'
        bottom.style.position = 'relative'
        bottom.style.top = '0px'
        bottom.style.margin = '0 auto'
        var sharp = document.createElement('img')
        sharp.src = 'https://webapi.amap.com/images/sharp.png'
        bottom.appendChild(sharp)
        info.appendChild(bottom)
        return info
      }
      console.log('地图加载成功')
      that.map = new AMap.Map('container1', {
        center: [120.680757, 30.510659],
        zoom: 11,
        mapStyle: 'amap://styles/darkblue'
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
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.3,
              fillColor: '#1047ab',
              strokeColor: '#1047ab',
              strokeOpacity: 0.3,
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
            AMap.event.addListener(marker, 'click', function() {
              infoWindow.open(that.map, marker.getPosition())
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
.dashboardHead{
  background:linear-gradient(to right,#1047ab 55%,#041752);
  height: 70px;
}
.hs_headTitle{
  color: white;
  font-size: 22px;
  overflow: auto;
  height: 70px;
  line-height: 70px;
  display: inline-block;

}
.hs_content{
  height: calc(100vh - 70px);
  background: linear-gradient(rgb(7, 28, 91),rgb(7, 36, 106));
}
.left-kuang{
  height: calc((100vh - 70px)/10 * 3);
  // margin: 30px 30px 30px 44px;
  // background: rgba(3, 26, 80,0.9);
  // border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
}
.left-title{
  background: #094198;
  position: absolute;
  top: -12px;
  width: 30%;
  height: 24px;
  color: white;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;
  z-index: 2;
}
.left-content{
  width: 90%;
  height: 80%;
  background: rgba(3, 26, 80,0.9);
  margin: 0px auto;
  position: relative;
}
.left-title::after{
  content: "";
  width: 0px;
  height: 0px;
  // border-left: 15px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 24px solid #094198;
  position: absolute;
  top: 0px;
  right: -12px;
}
.left-title::before{
  content: "";
  width: 0px;
  height: 0px;
  // border-left: 15px solid transparent;
  border-left: 12px solid transparent;
  border-top: 24px solid #094198;
  position: absolute;
  top: 0px;
  left: -12px;
}
.kuang{
  height: calc(((100vh - 70px)/10) * 3);
  width: 100%;
}
.kuangTop{
padding: 40px 20px 20px 20px;
}
.kuangMiddle{
padding: 15px 20px 20px 20px;
}
.kuangEnd{
padding: 20px 20px 30px 20px;
}
.kuang10{
padding: 40px 0px 30px 0px;
}

.height4{
   height: calc(((100vh - 70px)/10) * 4);
}
.height10{
   height: calc((100vh - 70px));
}
.kuang-content{
  background: rgba(3, 26, 80,0.9);height:100%; position: relative;
}
.kuang-body-flex{
  width: 100%;
  height: 100%;
  padding: 20px 15px 15px 15px;
  display: flex;
  align-items: center;
}
.kuang-body{
  width: 100%;
  height: 100%;
  padding: 20px 15px 15px 15px;
  overflow: auto;
}
.mian-table{
  font-size: 16px;
  color: white;
  text-align: center;
  margin: 0 auto;
}
.main-td{
  padding: 10px;
}
.main-tdNum{
  padding: 30px;
  font-size: 22px;
}
.kuang-body-ui{
  margin: 15px;
  color:white
}

           /*ie滚动条样式*/
           * {
               scrollbar-arrow-color: rgb(200,200,200);/*ok-上下三角箭头*/
               scrollbar-3dlight-color: rgb(200,200,200);/*ok-3d滑块左上角高光部分颜色*/
               scrollbar-highlight-color: rgb(200,200,200);/*ok-滑块左上角高光部分颜色*/
               scrollbar-shadow-color: rgb(200,200,200);/*ok*/
               scrollbar-darkshadow-color: rgb(200,200,200);/*ok-以上都是定义一些阴影高光等3D效果*/
               scrollbar-face-color: rgb(200,200,200);/*ok-滑块*/
               scrollbar-track-color: rgb(240,240,240);/*ok-滑道*/
           }
           /*chrome滚动条样式*/
           ::-webkit-scrollbar {/*滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。*/
               width: 10px;
               height: 10px;
           }
           ::-webkit-scrollbar-button {/*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
               display: none;
           }
           ::-webkit-scrollbar-track {/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
               display: none;
           }
           ::-webkit-scrollbar-track-piece {/*内层轨道，滚动条中间部分（除去）。*/
               background: rgb(240,240,240);
           }
           ::-webkit-scrollbar-thumb {/*滚动条里面可以拖动的那部分*/
               background: rgb(200,200,200);
           }
           ::-webkit-scrollbar-thumb:hover {/*滚动条里面可以拖动的那部分*/
               background: rgb(180,180,180);
           }
           ::-webkit-scrollbar-corner {/*边角*/
               background: rgb(200,200,200);
           }
           ::-webkit-scrollbar-resizer {/*定义右下角拖动块的样式*/
               background: rgb(200,200,200);
           }
</style>

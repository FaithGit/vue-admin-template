<template>
  <div class="dashboard-container">
    <div class="dashboardHead">
      <img src="@img/hs_logo.png" style="height:56px;margin:7px">
      <span class="hs_headTitle">{{ areaCode=='330481'?'海宁市':areaCode=='330482'?'平湖市': areaCode }}治理设施工况（电量）监测系统</span>
      <span class="hs_headTitle" style="float:right;margin-right:20px;font-size:18px;cursor: pointer;" @click="gotoHome">
        返回首页
      </span>
      <screenfull id="screenfull" class="right-menu-item hover-effect" style="display:inline-block;color:white;float:right;margin-right:20px;line-height: 70px;height: 70px;" />

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
                    <td class="main-td">监测<br>点位数</td>
                    <td class="main-td">监测<br>企业数</td>
                    <td class="main-td">异常<br>企业数</td>
                    <td class="main-td">限产<br>企业数</td>
                  </tr>
                  <tr>
                    <td class="main-tdNum">
                      <countTo :start-val="startVal1" :end-val="deviceNum" :duration="3000" />
                    </td>
                    <td class="main-tdNum">
                      <countTo :start-val="startVal2" :end-val="comNum" :duration="3000" />
                    </td>
                    <td class="main-tdNum">
                      <countTo :start-val="startVal3" :end-val="warComNum" :duration="3000" />
                    </td>
                    <td class="main-tdNum">
                      <countTo :start-val="startVal4" :end-val="susComNum" :duration="3000" />
                    </td>
                  </tr>
                </table>
              </div>
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
                <!-- <div class="left-line" />
                <div class="right-line" /> -->
              </div>
            </div>
          </div>

          <div class="kuang kuangMiddle">
            <div class="kuang-content">
              <div class="left-title">
                动态栏
              </div>
              <div class="kuang-body">
                <div v-show="!list.length>0" style="display:flex;justify-content: center;align-items: center;width: 100%;height: 100%;">
                  <div><img src="@img/goodList.png" style="width:180px"></div>
                  <div style="color:white;position: absolute;bottom: 8%;">无异常</div>
                </div>
                <swiper ref="swiperList1" :options="swiperOption" style="width:100%;height:100%;">
                  <swiper-slide v-for="(itemList,index) in list" :key="'itemList'+index">
                    <el-row style="color:white">
                      <el-col :span="2" style="padding-left:5px"> {{ index+1 }}</el-col>
                      <el-col :span="8"> {{ itemList.name }}</el-col>
                      <el-col :span="7"> {{ itemList.dataTime }}</el-col>
                      <el-col :span="7" style="text-align:center"> {{ itemList.logName }}</el-col>
                    </el-row>
                  </swiper-slide>
                  <div slot="scrollbar" class="swiper-scrollbar" />
                </swiper>

                <!-- <el-row>
                  <el-col v-for="(itemList,index) in list" :key="itemList.company" :span="24" class="kuang-body-ui">
                    <el-col :span="3"> {{ index+1 }}</el-col>
                    <el-col :span="7"> {{ itemList.name }}</el-col>
                    <el-col :span="7"> {{ itemList.dataTime }}</el-col>
                    <el-col :span="7"> {{ itemList.logName }}</el-col>
                  </el-col>
                </el-row> -->
              </div>
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">

              </div>
            </div>
          </div>
          <div class="kuang height4 kuangEnd">
            <div class="kuang-content">
              <div class="left-title futitle">
                街、镇异常次数
              </div>
              <el-tabs v-model="activeName2" @tab-click="handleClick">
                <el-tab-pane label="近7日" name="first2" />
                <el-tab-pane label="近30日" name="second2" />
              </el-tabs>
              <div class="kuang-body">
                <userPower :baojinglist="baojinglist" />
              </div>
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
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
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
              </div>
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
                    <td class="main-td">今日用电量</td>
                    <td class="main-td">当年用电量</td>

                  </tr>
                  <tr>
                    <td class="main-tdNums">
                      <svg-icon icon-class="power" />
                      <countTo :start-val="startVal4" :end-val="todayMaxElc" :duration="3000" />kW·h
                    </td>
                    <td class="main-tdNums">
                      <svg-icon icon-class="powers" />
                      <countTo :start-val="startVal4" :end-val="yearMalElc" :duration="3000" />kW·h
                    </td>

                  </tr>
                </table>
              </div>
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
              </div>
            </div>
          </div>

          <div class="kuang kuangMiddle">
            <div class="kuang-content">
              <div class="left-title left-title-small" style="width:50%">
                当月异常告警趋势变化
              </div>
              <div class="kuang-body">
                <error :city="city" :num="num" />
              </div>
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
              </div>
            </div>
          </div>
          <div class="kuang height4 kuangEnd">
            <div class="kuang-content">
              <div class="left-title">
                当月异常分布
              </div>
              <distribution />
              <div class="four-jiao">
                <img src="@img/02-1.png" class="jiao">
                <img src="@img/02-1.png" class="jiao2">
                <img src="@img/02-1.png" class="jiao3">
                <img src="@img/02-1.png" class="jiao4">
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="display:none">
      <infowindow ref="infowindows" :device-infos="deviceInfo" />
    </div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import MapLoader from '@/utils/map'
import userPower from './components/userPower'
import error from './components/error'
import distribution from './components/distribution'
import infowindow from './components/infoWindow'
import { findComMap, findMapDataDetail, findIndexTotalData, warMonthSort, findPictureDynamicInfo, findPictureAdminWarRange } from '@/api/table'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import screenfull from 'screenfull'
export default {
  name: 'Pandect',
  components: {
    userPower,
    error,
    distribution,
    infowindow,
    Screenfull
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: false,
        scrollbarDraggable: true,
        initialSlide: 0,
        slidesPerView: 5,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        speed: 1000
      },
      map: null,
      list: [],
      markList: [
        {
          name: '第一人民医院',
          position: '121.043789,30.699662',
          type: 1
        }, {
          name: '平湖中学',
          position: '121.039841,30.688639',
          type: 1
        }
      ],
      deviceInfo: {

      },
      deviceNum: 0,
      yearMalElc: 0,
      warComNum: 0,
      todayMaxElc: 0,
      susComNum: 0,
      comNum: 0,
      startVal1: 0,
      startVal2: 0,
      startVal3: 0,
      startVal4: 0,
      city: [],
      num: [],
      baojinglist: [],
      activeName2: 'first2'

    }
  },
  computed: {
    ...mapGetters([
      'areaCode'
    ])
  },
  mounted() {
    findPictureDynamicInfo({
      token: getToken()
    }).then(res => {
      this.list = res.retData
    })
    // 拿取点位
    findComMap({ token: getToken() }).then(res => {
      this.markList = res.retData
      const that = this
      MapLoader().then(AMap => {
        // 添加地图边界
        function addPolygonbox() {
          AMap.plugin('AMap.DistrictSearch', function() {
            var opts = {
              subdistrict: 0, // 获取边界不需要返回下级行政区
              extensions: 'all', // 返回行政区边界坐标组等具体信息
              level: 'city' // 查询行政级别为 市
            }
            var district = new AMap.DistrictSearch(opts)
            const areacodeWhere = that.areaCode === '330481' ? '海宁市' : that.areaCode === '330482' ? '平湖市' : '平湖市'
            district.search(areacodeWhere, function(status, result) {
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
              }
            })
          }
          )
        }
        // 点击获取table信息
        function markerClick(e) {
          findMapDataDetail({
            comId: e.target.comId,
            token: getToken()
          }).then(res => {
            that.deviceInfo = res.retData[0]
            infoWindow.setContent(e.target.content)
            infoWindow.open(that.map, e.target.getPosition())
          })
        }

        if (that.areaCode === '330481') {
          that.map = new AMap.Map('container1', {
          // center: [121.087157, 30.71595],
            center: [120.680757, 30.510659],
            zoom: 11,
            mapStyle: 'amap://styles/darkblue'
          })
          addPolygonbox() // 添加行政区
        } else if (that.areaCode === '330482') {
          that.map = new AMap.Map('container1', {
            center: [121.087157, 30.71595],
            // center: [120.680757, 30.510659],
            zoom: 11,
            mapStyle: 'amap://styles/darkblue'
          })
          addPolygonbox() // 添加行政区
        } else {
          that.map = new AMap.Map('container1', {
          // center: [121.087157, 30.71595],
            center: [120.680757, 30.510659],
            zoom: 11,
            mapStyle: 'amap://styles/darkblue'
          })
          addPolygonbox() // 添加行政区
        }

        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        })

        for (var j = 0; j < this.markList.length; j++) {
          if (!this.markList[j].lon_lat) {
            continue
          }
          var marker = new AMap.Marker({

            position: this.markList[j].lon_lat.split(','),
            map: that.map,
            title: this.markList[j].com_short_name
          })
          marker.content = this.$refs.infowindows.$el
          marker.comId = this.markList[j].id
          marker.on('click', markerClick)
        // marker.emit('click', { target: marker })
        }

      // that.map.setFitView()
      }, e => {
        console.log('地图加载失败', e)
      })
    })

    findIndexTotalData({ token: getToken() }).then(res => {
      this.deviceNum = res.retData.deviceNum
      this.yearMalElc = res.retData.yearMalElc
      this.warComNum = res.retData.warComNum
      this.todayMaxElc = res.retData.todayMaxElc
      this.susComNum = res.retData.susComNum
      this.comNum = res.retData.comNum
    })
    warMonthSort({
      token: getToken()
    }).then(res => {
      var _city = res.retData.date
      this.num = res.retData.value
      for (var i = 0; i < _city.length; i++) {
        _city[i] = _city[i].slice(5, _city[i].length)
      }
      this.city = _city
    })

    findPictureAdminWarRange({
      token: getToken(),
      timeStyle: 1
    }).then(res => {
      console.log('res', res)
      this.baojinglist = res.retData
    })
  },
  destroyed() {
    this.map = null
  },
  methods: {
    gotoHome() {
      this.$router.push('/')
    },
    closeInfoWindow() {
      this.map.clearInfoWindow()
    },
    buttoncli() {
      screenfull.toggle()
    },
    handleClick() {
      console.log(this.activeName2)
      if (this.activeName2 === 'second2') {
        findPictureAdminWarRange({
          token: getToken(),
          timeStyle: 2
        }).then(res => {
          console.log('res', res)
          this.baojinglist = res.retData
        })
      } else {
        findPictureAdminWarRange({
          token: getToken(),
          timeStyle: 1
        }).then(res => {
          console.log('res', res)
          this.baojinglist = res.retData
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
>>>.swiper-scrollbar-drag{
  background:rgb(9,65,152)
}
*{
  padding: 0;
  margin: 0;
}
>>> .el-tabs__nav-wrap{
  width: 160px;
  position: absolute;
  right: -28px;
  position: absolute;
  top: 5px;
}
>>> .el-tabs__nav-wrap::after{
  width: 0px;
}
>>> .el-tabs__item{
  color: white;
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
  overflow: hidden;
}
.mian-table{
  font-size: 16px;
  color: white;
  text-align: center;
  margin: 0 auto;
}
.main-td{
  padding: 15px 10px 10px 10px;
}
.main-tdNum{
  padding: 30px;
  font-size: 22px;
}
.main-tdNums{
  padding: 30px 0px;
  font-size: 24px;
  @media screen and (max-width: 1743px){
     font-size: 19px;
  }
}
.futitle{
  @media screen and (max-width: 1720px){
    font-size: 14px;
  }
  @media screen and (max-width: 1502px){
    font-size: 12px;
    letter-spacing: 0px;
  }
}
.kuang-body-ui{
  margin: 15px 0;
  text-align: center;
  color:white;
  @media screen and (max-width: 2015px){
     font-size: 14px;
  }
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

.jiao,.jiao2,.jiao3,.jiao4{
    position: absolute;
    width: 20px;
    height: 20px;
  }
  .jiao{
    top:0;
    left:0;
  }
  .jiao2{
    top:0;
    right:0;
    transform: rotate(90deg)
  }
  .jiao3{
      bottom: 0;
      right: 0;
      transform: rotate(180deg)
  }
  .jiao4{
      bottom: 0;
      left: 0;
      transform: rotate(270deg)
  }
  .left-line{
     position: absolute;
     width: 15%;
     height:3px;
     background: #01bfff;
     top: -1px;
     left: 15%;

  }
  .right-line{
     position: absolute;
     width: 15%;
     height:3px;
     background: #01bfff;
     top: -1px;
     right: 15%;
  }
</style>

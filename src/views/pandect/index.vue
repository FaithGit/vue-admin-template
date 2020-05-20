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
        <el-col :span="8">
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
                  <span style="width:30%;display:inline-block;text-align:center">{{ itemList.company }}  </span>
                  <span style="width:30%;display:inline-block;text-align:center">{{ itemList.time }}  </span>
                  <span style="width:35%;display:inline-block;text-align:center">{{ itemList.message }}  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="kuang height4 kuangEnd">
            <div class="kuang-content">
              <div class="left-title">
                用电量
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="kuang kuang10 height10">
            <div class="kuang-content">
              <div class="left-title">
                地图
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Pandect',
  data() {
    return {
      list: [
        {
          company: 'xxxxx',
          time: '2010,20,15,30,15',
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
  }
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
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
  top: -15px;
  width: 30%;
  height: 30px;
  color: white;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
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
  border-right: 15px solid transparent;
  border-bottom: 30px solid #094198;
  position: absolute;
  top: 0px;
  right: -15px;
}
.left-title::before{
  content: "";
  width: 0px;
  height: 0px;
  // border-left: 15px solid transparent;
  border-left: 15px solid transparent;
  border-top: 30px solid #094198;
  position: absolute;
  top: 0px;
  left: -15px;
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
padding: 40px 20px 30px 0px;
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

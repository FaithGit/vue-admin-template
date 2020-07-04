<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="comBlock" style="background:#475867">
          <div class="comTitle" style="text-align:left;margin-bottom:63px">
            <svg-icon icon-class="comName" style="margin: 0 5px" />xxxx环保局/xxxx镇<br>
          </div>
          <el-col :span="8" class="comTitle "> 监测企业总数<br> <span class="comtitle">0</span>  </el-col>
          <el-col :span="8" class="comTitle whiteBorder"> 产物设施总数<br> <span class="comtitle">0</span> </el-col>
          <el-col :span="8" class="comTitle"> 产物设施总数<br> <span class="comtitle">0</span> </el-col>
          <img src="@img/icon2.png" class="com" style="width:70px;margin-right:20px">
        </div>
      </el-col>
      <el-col :span="10">
        <div class="comBlock" style="background:#ffffff">
          <div class="comTitle" style="text-align:left;"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000"> 行业划分</span><br></div>
          <hangye />
        </div>
      </el-col>
      <el-col :span="6" style="height:260px">
        <div class="comBlock" style="background:#ffffff; position: relative;">
          <iframe frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&id=55&py=jiaxing" style="width: 100%;height: 227px;margin-top: 20px;" />
        </div>
      </el-col>

      <el-col :span="12" style="margin-top:20px;position: relative;">
        <div class="total">
          检测仪点位：<span class="totalnum">10</span>个
        </div>
        <div class="comBlock" style="background:#ffffff;height:400px;color:#000">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="first" style="height:345px"><shengchan v-if="activeName==='first'" :shengchan-list="shengchanList" /></el-tab-pane>
            <el-tab-pane label="配置管理" name="second" style="height:345px"><zl v-if="activeName==='second'" :zl-list="zlList" /></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import { findDeviceNumByProcess } from '@/api/table'
import { getToken } from '@/utils/auth'
import hangye from './components/hangye'
import shengchan from './components/shengchan'
import zl from './components/zl'

export default {
  name: 'Dashboard',
  components: {
    hangye,
    shengchan,
    zl
  },
  data() {
    return {
      hangyeList: [],
      activeName: 'first',
      shengchanList: [],
      zlList: []

    }
  },
  mounted() {
    findDeviceNumByProcess({
      token: getToken()
    }).then(res => {
      this.shengchanList = res.retData.sc
      this.zlList = res.retData.zl
    })
  },
  destroyed() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
>>> .el-tabs__nav-wrap{
  width: 160px;
  margin-left: 74%;
}
.dashboard-container{
  padding: 20px;
  background: #f0f2f5;
  height: calc(100vh - 84px);
  overflow: auto;
}
.comBlock{
  background: #1890FF;
  color: white;
  height: 260px;
box-shadow: 4px 4px 40px rgba(0,0,0,.05);
    border-color: rgba(0,0,0,.05);
  position: relative;
}
.comTitle{
  padding: 15px;
  text-align: center;
  line-height: 35px;
  @media screen and (max-width: 1500px){
    font-size: 12px;
  }
}
.comtitle{
  font-size: 18px;
  font-weight: bold;
}
.whiteBorder{
  border-left:1px white solid ;
  border-right:1px white solid ;
}
.whiteBorderRight{
  border-right:1px white solid ;
}
.timeset{
  font-size: 14px;
  line-height: 23px;
}
.timeNum{
  font-size: 16px;
  font-weight: bold;
}
.bigtitle{
  @media screen and (max-width: 1890px){
      font-size: 13px;
      letter-spacing: -1px;
  }
  @media screen and (max-width: 1543px){
    font-size: 14px;
    letter-spacing: 2px;
  }

}
.floatError{
  position: relative;
  top: 20px;
  z-index: 99;
  color: black;
}
.com{
  position: absolute;
  font-size: 77px;
  z-index: 99;
  top: 10px;
  right: 10px;
}
.groupName{
  text-align: center;
  padding:15px 0;
}
.qyTitle{
  padding: 15px 10px 10px 10px;
}
.innerSwiper{
  padding:10px
}
.swiperCol{
  line-height: 30px;
  text-align:center;
  margin: 5px 0px
}
.warnList{
  line-height: 30px;
  height: 30px;
}
.warnIndex{
    width: 28px;
    height: 28px;
    background:#314659;
    display: inline-block;
    color: white;
    border-radius: 50%;
}
.noData{
  height: 366.84px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.swiper-pagination{
      bottom: 20px;
}
.font15{
  font-size: 15px;
}
.total{
position: absolute;
    top: 3px;
    left: 30px;
    color: #000;
    z-index: 5;
    font-size: 16px;
}
.totalnum{
    font-size: 34px;
    font-weight: 500;
}
</style>

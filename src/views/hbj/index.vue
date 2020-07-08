<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="comBlock" style="background:#475867">
          <div class="comTitle" style="text-align:left;margin-bottom:30px">
            <svg-icon icon-class="where" style="margin: 0 5px" />{{ name }}<br>
          </div>
          <el-col :span="24" class="comTitle" style="line-height:25px;text-align:left;padding-left: 22px;padding-top:5px;padding-bottom:5px"> 监测企业总数： <span class="comtitle" style="font-size:26px">{{ totalComNum }}</span> 家  </el-col>
          <el-col :span="24" class="comTitle" style="line-height:25px;text-align:left;padding-left: 22px;padding-top:5px;padding-bottom:5px"> 监测设施总数： <span class="comtitle" style="font-size:26px">{{ totalDeviceNum }}</span> 个
            <!-- <span style="margin:0 15px 0 20px">生产：{{ scNum1 }}个</span>治理：{{ zlNum1 }}个 -->
          </el-col>
          <el-col :span="24" class="comTitle" style="line-height:30px;text-align:left;padding-left: 22px;padding-top:5px;padding-bottom:5px">
            产污设施：正常 <span style="margin:0 26px 0 0">{{ scNormalNum }} 个</span>
            异常：{{ scWarNum }} 个
            <br>
            治污设施：<span style="margin:0 26px 0 0">正常 {{ zlNormalNum }} 个</span>
            异常：<span>{{ zlWarNum }}个</span>
          </el-col>
          <!-- <el-col :span="8" class="comTitle whiteBorder"> 产物设施总数<br> <span class="comtitle">0</span> </el-col>
          <el-col :span="8" class="comTitle"> 产物设施总数<br> <span class="comtitle">0</span> </el-col> -->
          <svg-icon icon-class="com" class="com" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="comBlock" style="background:#ffffff">
          <div class="comTitle" style="text-align:left;padding: 15px 15px 0;"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000"> 行业划分</span><br></div>
          <hangye :bus-data="busData" />
        </div>
      </el-col>
      <el-col :span="6" style="height:260px">
        <div class="comBlock" style="background:#ffffff; position: relative;">
          <iframe frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&id=55&py=jiaxing" style="width: 100%;height: 227px;margin-top: 20px;" />
        </div>
      </el-col>

      <el-col :span="12" style="margin-top:20px;position: relative;">
        <div class="total">
          检测仪点位：<span class="totalnum">{{ total }}</span>个
        </div>
        <div class="comBlock" style="background:#ffffff;height:400px;color:#000">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="'生产('+scNum+')'" name="first" style="height:345px"><shengchan v-if="activeName==='first'" :shengchan-list="shengchanList" /></el-tab-pane>
            <el-tab-pane :label="'治理('+zlNum+')'" name="second" style="height:345px"><zl v-if="activeName==='second'" :zl-list="zlList" /></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="12" style="margin-top:20px;">
        <div class="comBlock" style="height:400px;background:#ffffff">
          <div class="comTitle" style="text-align:left;"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000"> 年度异常统计次数</span><br></div>
          <month style="height:345px" :month-list="monthList" />
        </div>
      </el-col>
      <el-col :span="8" style="margin-top:20px;">
        <div class="comBlock" style="height:400px;background:#ffffff">
          <div class="comTitle" style="text-align:left;position: absolute"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000">异常治理设施排名</span><br></div>
          <el-tabs v-model="activeName1">
            <el-tab-pane label="近7日" name="first1" style="height:345px;color:#000">
              <!-- <paihang :ph-list="phList" /> -->
              <div class="spaceTitle">
                <div style="font-size:80px"><svg-icon icon-class="nodata" /></div>暂无数据</div>
            </el-tab-pane>
            <el-tab-pane label="今日" name="second1" style="height:345px;color:#000;">
              <div class="spaceTitle">
                <div style="font-size:80px"><svg-icon icon-class="nodata" /></div>暂无数据</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="8" style="margin-top:20px;">
        <div class="comBlock" style="height:400px;background:#ffffff">
          <div class="comTitle" style="text-align:left;position: absolute"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000">异常企业排名</span><br></div>
          <el-tabs v-model="activeName2">
            <el-tab-pane label="近7日" name="first2" style="height:345px;color:#000">
              <!-- <paihang :ph-list="phList" /> -->
              <div class="spaceTitle">
                <div style="font-size:80px"><svg-icon icon-class="nodata" /></div>暂无数据</div>
            </el-tab-pane>
            <el-tab-pane label="今日" name="second2" style="height:345px;color:#000;">
              <div class="spaceTitle">
                <div style="font-size:80px"><svg-icon icon-class="nodata" /></div>暂无数据</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="8" style="margin-top:20px;">
        <div class="comBlock" style="height:400px;background:#ffffff">
          <div class="comTitle" style="text-align:left;"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px;color:#000">异常分布及处理率</span><br></div>
          <fenbulv style="height:345px" />
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import { findDeviceNumByProcess, findMonthSmsNum, findHbjBasicData, findComNumBusDstbt } from '@/api/table'
import { getToken } from '@/utils/auth'
import hangye from './components/hangye'
import shengchan from './components/shengchan'
import zl from './components/zl'
import month from './components/month'
import fenbulv from './components/fenbulv'
// import paihang from './components/paihang'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    hangye,
    shengchan,
    zl,
    month,
    fenbulv
    // paihang
  },
  data() {
    return {
      hangyeList: [],
      monthList: [],
      activeName: 'first',
      shengchanList: [],
      busData: [],
      zlList: [],
      total: '',
      totalComNum: 0,
      totalDeviceNum: 0,
      scNormalNum: 0,
      scWarNum: 0,
      zlNormalNum: 0,
      zlWarNum: 0,
      scNum1: 0,
      zlNum1: 0,
      activeName1: 'first1',
      activeName2: 'first2',
      phList: ['模拟数据1', '模拟数据2', '模拟数据3', '模拟数据4', '模拟数据5', '模拟数据6', '模拟数据7']
    }
  },
  computed: {
    scNum: function() {
      let sum = 0
      this.shengchanList.forEach(v => {
        sum += v.num
      })
      return sum
    },
    zlNum: function() {
      return this.total - this.scNum
    },
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    findDeviceNumByProcess({
      token: getToken()
    }).then(res => {
      this.shengchanList = res.retData.sc
      this.zlList = res.retData.zl
      this.total = res.retData.total
    })
    findMonthSmsNum({
      token: getToken()
    }).then(res => {
      this.monthList = res.retData
    })
    findComNumBusDstbt({
      token: getToken()
    }).then(res => {
      this.busData = res.retData.busData
    })
    findHbjBasicData({
      token: getToken()
    }).then(res => {
      this.totalComNum = res.retData.totalComNum
      this.totalDeviceNum = res.retData.totalDeviceNum
      this.scNormalNum = res.retData.scNormalNum
      this.scWarNum = res.retData.scWarNum
      this.scNum1 = res.retData.scNum
      this.zlNum1 = res.retData.zlNum
      this.zlNormalNum = res.retData.zlNum
      this.zlWarNum = res.retData.zlWarNum
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
  position: relative;
  top: 10px;
}
>>> .el-tabs__nav-wrap::after{
  width: 0px;
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
    font-size: 108px;
    z-index: 99;
    top: 5px;
    right: 23px;
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
  top: 10px;
  left: 30px;
  color: #000;
  z-index: 5;
  font-size: 16px;
}
.totalnum{
    font-size: 34px;
    font-weight: 500;
}
.tabPane{
  position: absolute;
  top: 10px;
  right: 100px;
}
.spaceTitle{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

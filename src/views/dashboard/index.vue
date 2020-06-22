<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="comBlock">
          <div class="comTitle" style="text-align:left"> <svg-icon icon-class="where" style="margin: 0 5px" />{{ comName }}<br></div>
          <el-col :span="8" class="comTitle "> 治理线组<br> <span class="comtitle">{{ groupNum }}</span>  </el-col>
          <el-col :span="8" class="comTitle whiteBorder"> 生产设备<br> <span class="comtitle">{{ scNum }}</span>  </el-col>
          <el-col :span="8" class="comTitle "> 治理设备<br> <span class="comtitle">{{ zlNum }}</span>  </el-col>
        </div>

      </el-col>
      <el-col :span="10">
        <div class="comBlock" style="background:#42b983">
          <div class="comTitle" style="text-align:left"> <svg-icon icon-class="powers" style="margin:0 5px" />用电情况<br></div>
          <el-col :span="6" class="comTitle"> 今日总用电量<br>
            <span class="timeNum"> {{ todayTotal }}kw/h </span>
            <div class="timeset">{{ todayTotalTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorder"> 今日功率峰值<br>
            <span class="timeNum"> {{ maxPowerToday }}kw </span>
            <div class="timeset">{{ maxPowerTodayTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorderRight"> <span class="bigtitle">昨日同期总用电量</span><br>
            <span class="timeNum"> {{ yesterdayTotal }}kw/h </span>
            <div class="timeset">{{ yesterdayTotalTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle"> 昨日功率峰值<br>
            <span class="timeNum"> {{ maxPowerYesterday }}kw </span>
            <div class="timeset">{{ maxPowerYesterdayTime }}</div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="6" style="height:200px"><error /></el-col>
    </el-row>
  </div>
</template>

<script>
import { findComBasicData, findComElc } from '@/api/table'
import { getToken } from '@/utils/auth'
import error from './components/error'
export default {
  name: 'Dashboard',
  components: {
    error
  },
  data() {
    return {
      comName: '',
      scNum: '',
      zlNum: '',
      groupNum: '',
      todayTotal: 0,
      yesterdayTotal: 0.000,
      maxPowerYesterday: 0.000,
      maxPowerToday: 0,
      maxPowerYesterdayTime: '',
      todayTotalTime: '',
      maxPowerTodayTime: '',
      yesterdayTotalTime: ''
    }
  },
  mounted() {
    findComBasicData({
      token: getToken()
    }).then(res => {
      console.log(res)
      this.comName = res.retData.comName
      this.scNum = res.retData.scNum
      this.zlNum = res.retData.zlNum
      this.groupNum = res.retData.groupNum
    })
    findComElc({
      token: getToken()
    }).then(res => {
      this.todayTotal = res.retData.todayTotal
      this.yesterdayTotal = res.retData.yesterdayTotal
      this.maxPowerYesterday = res.retData.maxPowerYesterday
      this.maxPowerToday = res.retData.maxPowerToday
      this.maxPowerYesterdayTime = res.retData.maxPowerYesterdayTime
      this.todayTotalTime = res.retData.todayTotalTime
      this.maxPowerTodayTime = res.retData.maxPowerTodayTime
      this.yesterdayTotalTime = res.retData.yesterdayTotalTime
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  padding: 20px;
}
.comBlock{
  background: #1890FF;
  color: white;
  height: 200px;
  border-radius: 5px;
}
.comTitle{
  padding: 15px;
  text-align: center;
  line-height: 35px;
}
.comtitle{
  font-size: 18px;
  font-weight: bold;;
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
    font-size: 13px;
    letter-spacing: 0px;
  @media screen and (min-width: 1633px){
      font-size: 14px;
      letter-spacing: -1px;
  }
  @media screen and (max-width: 1480px){
      font-size: 13px;
      letter-spacing: -1px;
  }
    @media screen and (min-width: 1700px){
      font-size: 16px;
  }
}
</style>

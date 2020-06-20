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
          <el-col :span="6" class="comTitle"> 今日总用电量<br> 200<div class="">2020-06-19 17:00:00</div>   </el-col>
          <el-col :span="6" class="comTitle whiteBorder"> 今日功率峰值<br> <span class="comtitle">{{ scNum }}</span>  </el-col>
          <el-col :span="6" class="comTitle whiteBorderRight"> 昨日同期总用电量<br> <span class="comtitle">{{ scNum }}</span>  </el-col>
          <el-col :span="6" class="comTitle"> 昨日功率峰值<br> <span class="comtitle">{{ zlNum }}</span>  </el-col>
        </div>
      </el-col>
      <el-col :span="6">123</el-col>
    </el-row>
  </div>
</template>

<script>
import { findComBasicData } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Dashboard',
  data() {
    return {
      comName: '',
      scNum: '',
      zlNum: '',
      groupNum: ''
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
</style>

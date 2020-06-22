<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="comBlock">
          <div class="comTitle" style="text-align:left;margin-bottom:60px"> <svg-icon icon-class="where" style="margin: 0 5px" />{{ comName }}<br></div>
          <el-col :span="8" class="comTitle "> 治理线组<br> <span class="comtitle">{{ groupNum }}</span>  </el-col>
          <el-col :span="8" class="comTitle whiteBorder"> 生产设备<br> <span class="comtitle">{{ scNum }}</span>  </el-col>
          <el-col :span="8" class="comTitle "> 治理设备<br> <span class="comtitle">{{ zlNum }}</span>  </el-col>
          <svg-icon icon-class="com" class="com" />
        </div>

      </el-col>
      <el-col :span="10">
        <div class="comBlock" style="background:#42b983">
          <div class="comTitle" style="text-align:left;margin-bottom:50px"> <svg-icon icon-class="powers" style="margin:0 5px" />用电情况<br></div>
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
      <el-col :span="6" style="height:260px">
        <div class="comBlock" style="background:#041a51; position: relative;">
          <div class="floatError">
            <svg-icon icon-class="error" style="margin:0 5px 0 14px" />
            异常分布</div>
          <div style="height:220px">
            <error />
          </div>
        </div>
      </el-col>
      <el-col :span="18" style="margin-top:20px;">
        <div style="background:white;height:412px">
          <div style="padding:10px 0 10px 10px">生产情况</div>
          <div class="height:380px">
            <createHour :datatime="dataTime" :datalist="dataList" :devicename="deviceName" />
          </div>

        </div>
      </el-col>
      <el-col :span="6" style="margin-top:20px">
        <div style="background:white;height:412px">
          <div style="padding: 10px 0px 10px 10px;">异常情况</div>
          <div style="background:white;height:380px;display: flex;align-items: center;justify-content: center;">暂无</div>
        </div>
      </el-col>
      <el-col v-for="(item,index) in xhList" :key="'key'+index" :span="12" style="margin-top:20px;">
        <div style="background:white;height:412px">
          <div class="groupName">{{ item.groupName }}</div>
          <div class="height:380px">
            <div :id="forId(index)" style="height:380px" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var echarts = require('echarts')
import { findComBasicData, findComElc, findScSwitchData, findUseElcByGroup } from '@/api/table'
import { getToken } from '@/utils/auth'
import createHour from './components/createHour'
import error from './components/error'
export default {
  name: 'Dashboard',
  components: {
    createHour,
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
      yesterdayTotalTime: '',
      dataTime: [],
      dataList: [],
      deviceName: [],
      xhList: [],
      getId: []

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
    findScSwitchData({
      token: getToken()
    }).then(res => {
      this.dataTime = res.retData.dataTime
      this.dataList = res.retData.dataList
      this.deviceName = res.retData.deviceName
    })
    findUseElcByGroup({
      token: getToken()
    }).then(res => {
      this.xhList = res.retData
      this.mapTree()
    })
  },
  methods: {
    forId: function(index) {
      return 'geo_' + index
    },
    mapTree() {
      this.$nextTick(function() {
        for (var i = 0; i < this.xhList.length; i++) {
          this.getId.push(echarts.init(document.getElementById('geo_' + i)))
          this.getId[i].setOption({
            backgroundColor: '#091C3D',
            tooltip: { // 提示框组件
              trigger: 'axis',
              formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              },
              textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '10%',
              top: '40%',
              //	padding:'0 0 10 0',
              containLabel: true
            },
            legend: {// 图例组件，颜色和名字
              right: '10%',
              top: '30%',
              itemGap: 16,
              itemWidth: 18,
              itemHeight: 10,
              data: [{
                name: '健康度'
                // icon:'image://../wwwroot/js/url2.png', //路径
              },
              {
                name: '可用度'
              }],
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            xAxis: [
              {
                type: 'category',
                //	boundaryGap: true,//坐标轴两边留白
                data: ['22:18', '22:23', '22:25', '22:28', '22:30', '22:33', '22:35', '22:40', '22:18', '22:23', '22:25', '22:28', '22:30', '22:33', '22:35', '22:40'],
                axisLabel: { // 坐标轴刻度标签的相关设置。
                  //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                  //	margin:15,
                  textStyle: {
                    color: '#078ceb',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                  },
                  rotate: 50
                },
                axisTick: {// 坐标轴刻度相关设置。
                  show: false
                },
                axisLine: {// 坐标轴轴线相关设置
                  lineStyle: {
                    color: '#fff',
                    opacity: 0.2
                  }
                },
                splitLine: { // 坐标轴在 grid 区域中的分隔线。
                  show: false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitNumber: 5,
                axisLabel: {
                  textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                  }
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#fff'],
                    opacity: 0.06
                  }
                }

              }
            ],
            series: [
              {
                name: '健康度',
                type: 'bar',
                data: [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60, 55, 45, 30, 15, 10],
                barWidth: 10,
                barGap: 0, // 柱间距离
                // label: {//图形上的文本标签
                //     normal: {
                //       show: true,
                //       position: 'top',
                //       textStyle: {
                //           color: '#a8aab0',
                //           fontStyle: 'normal',
                //           fontFamily: '微软雅黑',
                //           fontSize: 12,
                //       },
                //     },
                // },
                itemStyle: {
                  normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#5768EF'
                    }, {
                      offset: 1,
                      color: '#5768EF'
                    }]),
                    barBorderRadius: 50,
                    borderWidth: 0
                  }
                }
              },
              {
                name: '可用度',
                type: 'bar',
                data: [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60, 45, 42, 15, 12, 5],
                barWidth: 10,
                barGap: 0, // 柱间距离
                // label: {//图形上的文本标签
                //     normal: {
                //       show: true,
                //       position: 'top',
                //       textStyle: {
                //           color: '#a8aab0',
                //           fontStyle: 'normal',
                //           fontFamily: '微软雅黑',
                //           fontSize: 12,
                //       },
                //     },
                // },
                itemStyle: {
                  normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#69CBF2'
                    }, {
                      offset: 1,
                      color: '#69CBF2'
                    }]),
                    barBorderRadius: 50,
                    borderWidth: 0
                  }
                }
              }
            ]
          })
          console.log('实行了吗')
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
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
.floatError{
  position: relative;
  top: 20px;
  z-index: 99;
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
</style>

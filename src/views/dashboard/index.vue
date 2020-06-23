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
            <span class="timeNum"> {{ todayTotal }}kW·h </span>
            <div class="timeset">{{ todayTotalTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorder"> 今日功率峰值<br>
            <span class="timeNum"> {{ maxPowerToday }}kw </span>
            <div class="timeset">{{ maxPowerTodayTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorderRight"> <span class="bigtitle">昨日同期总用电量</span><br>
            <span class="timeNum"> {{ yesterdayTotal }}kW·h </span>
            <div class="timeset">{{ yesterdayTotalTime }}</div>
          </el-col>
          <el-col :span="6" class="comTitle"> 昨日功率峰值<br>
            <span class="timeNum"> {{ maxPowerYesterday }}kw </span>
            <div class="timeset">{{ maxPowerYesterdayTime }}</div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="6" style="height:260px">
        <div class="comBlock" style="background:#ffffff; position: relative;">
          <div class="floatError">
            <svg-icon icon-class="error" style="margin:0 5px 0 14px" />
            异常分布
          </div>
          <div style="height:220px">
            <error />
          </div>
        </div>
      </el-col>
      <el-col :span="18" style="margin-top:20px;">
        <div style="background:white;height:412px">
          <div style="padding:10px 0 10px 10px">生产情况(近12小时)</div>
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
            <div :id="forId(index)" :ref="forId(index)" style="height:380px" />
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
      getId: [],
      colorArry: [
        '#123dac',
        '#73e2e2',
        '#ff7e85',
        '#9b52ff',
        '#fac524',
        '#46caff',
        '#a1e867',
        '#10b2b2',
        '#ec87f7',
        '#f4905a',
        '#00baba',
        '#facf24',
        '#e89d67',
        '#23c6c6',
        '#fa8699',
        '#40b7fc',
        '#006d75',
        '#595959',
        '#f4764f',
        '#a640fc',
        '#fda23f',
        '#2d7ae4',
        '#5092ff',
        '#9351ed',
        '#8a89fe',
        '#df89e8',
        '#2797ff',
        '#6ad089',
        '#7c92e8 '
      ],
      colorArry1: [
        'rgba(18,61,172,0.9)',
        'rgba(115,226,226,0.9)',
        '#ff7e85',
        '#9b52ff',
        '#fac524',
        '#46caff',
        '#a1e867',
        '#10b2b2',
        '#ec87f7',
        '#f4905a',
        '#00baba',
        '#facf24',
        '#e89d67',
        '#23c6c6',
        '#fa8699',
        '#40b7fc',
        '#006d75'
      ],
      colorArry2: [
        'rgba(18,61,172,0.2)',
        'rgba(115,226,226,0.2)',
        '#ff7e85',
        '#9b52ff',
        '#fac524',
        '#46caff',
        '#a1e867',
        '#10b2b2',
        '#ec87f7',
        '#f4905a',
        '#00baba',
        '#facf24',
        '#e89d67',
        '#23c6c6',
        '#fa8699',
        '#40b7fc',
        '#006d75'
      ]

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
  destroyed() {
    this.getId = null
  },
  methods: {
    forId: function(index) {
      return 'geo_' + index
    },
    mapTree() {
      this.$nextTick(function() {
        for (var i = 0; i < this.xhList.length; i++) {
          console.log(i)
          this.getId.push(echarts.init(document.getElementById('geo_' + i)))
          const xAxisData = this.xhList[i].dataTime
          var fuseries = []

          for (var j = 0; j < this.xhList[i].dataList.length; j++) {
            fuseries.push({
              name: this.xhList[i].deviceName[j],
              data: this.xhList[i].dataList[j],
              type: 'line',
              smooth: true,
              smoothMonotone: 'x',
              cursor: 'pointer',
              showSymbol: false,
              lineStyle: {
                shadowColor: this.colorArry[j],
                shadowBlur: 10
              }
            })
          }

          this.getId[i].setOption({
            'textStyle': {
              'fontFamily': 'Din-Light'
            },
            'color': ['#123dac', '#73e2e2', '#ff7e85', '#9b52ff', '#fac524', '#46caff', '#a1e867', '#10b2b2', '#ec87f7', '#f4905a', '#00baba', '#facf24', '#e89d67', '#23c6c6', '#fa8699', '#40b7fc', '#006d75', '#595959', '#f4764f', '#a640fc', '#fda23f', '#2d7ae4', '#5092ff', '#9351ed', '#8a89fe', '#df89e8', '#2797ff', '#6ad089', '#7c92e8 '],
            'title': {
              'text': '',
              'left': '47%',
              'textStyle': {
                'fontSize': 24
              }
            },
            'legend': {
              'data': this.xhList[i].deviceName,
              'left': 'left',
              'itemWidth': 10,
              'itemHeight': 10,
              'itemGap': 10,
              'textStyle': {
                'color': '#898989',
                'lineHeight': 15
              },
              'type': 'scroll'
            },
            'tooltip': {
              'backgroundColor': '#fff',
              'trigger': 'axis',
              'axisPointer': {
                'type': 'none'
              },
              'textStyle': {
                'color': '#565656',
                'lineHeight': 28
              },
              'confine': true,
              'padding': 12,
              'extraCssText': 'box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;',
              formatter(params) {
                const item = params[0]
                var time = `${item.axisValue} <br>`
                var text1 = ''
                for (var i = 0; i < params.length; i++) {
                  text1 += `${params[i].marker}${params[i].seriesName}：${params[i].data} kW·h<br>`
                }
                return time + text1
              }
            },
            'grid': {
              'left': 40,
              'right': 20,
              'top': 60,
              'bottom': 50
            },
            'xAxis': {
              'type': 'category',
              'boundaryGap': true,
              'data': xAxisData,
              'axisLabel': {
                'color': '#a0a9bc',
                // X轴标签 label 做了特殊处理，防止左右溢出
                formatter: (value, index) => {
                  if (index === 0 || index === xAxisData.length - 1) {
                    return ''
                  }
                  return value
                }
              },
              'axisLine': {
                'show': false
              },
              'axisTick': {
                'show': false
              }
            },
            'yAxis': {
              'name': '',
              'nameTextStyle': {
                'color': 'gray'
              },
              'type': 'value',
              'axisLabel': {
                'color': '#a0a9bc',
                'inside': true,
                'margin': -10,
                'verticalAlign': 'bottom',
                formatter: '{value} kW·h '
              },
              'splitLine': {
                'lineStyle': {
                  'type': 'dashed'
                }
              },
              'minInterval': 1,
              'axisLine': {
                'show': false
              },
              'axisTick': {
                'show': false
              }
            },
            'series': fuseries
          })
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
</style>

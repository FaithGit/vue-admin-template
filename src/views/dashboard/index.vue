<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="comBlock">
          <div class="comTitle" style="text-align:left;margin-bottom:40px"> <svg-icon icon-class="comName" style="margin: 0 5px" />{{ comName }}<br>
            <svg-icon icon-class="where" style="margin: 0 5px" />{{ adress }}<br>
          </div>
          <el-col :span="8" class="comTitle "> 治理线组<br> <span class="comtitle">{{ groupNum }}</span>  </el-col>
          <el-col :span="8" class="comTitle whiteBorder"> 产污设施：{{ scNum }}<br> 开启 <span style="margin-right:5px">{{ scOpen }}</span>  关闭 <span>{{ scClose }}</span></el-col>
          <el-col :span="8" class="comTitle"> 治污设施：{{ zlNum }}<br> 开启 <span style="margin-right:5px">{{ zlOpen }}</span>  关闭 <span>{{ zlClose }}</span></el-col>
          <!-- <el-col :span="8" class="comTitle "> 治理设备<br> <span class="comtitle">{{ zlNum }}</span>  </el-col> -->
          <svg-icon icon-class="com" class="com" />
        </div>

      </el-col>
      <el-col :span="10">
        <div class="comBlock" style="background:#42b983">
          <div class="comTitle" style="text-align:left;margin-bottom:50px"> <svg-icon icon-class="powers" style="margin:0 5px;font-size:16px" /><span style="font-size:16px">用电情况</span><br></div>
          <el-col :span="6" class="comTitle"> <span class="bigtitle">今日产污设施用电量</span><br>
            <span class="timeNum"> {{ todayScTotal }}kW·h </span>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorder"> <span class="bigtitle">今日治污设施用电量</span><br>
            <span class="timeNum"> {{ todayZlTotal }}kW·h</span>
          </el-col>
          <el-col :span="6" class="comTitle whiteBorderRight"> <span class="bigtitle">年度产污设施用电量</span><br>
            <span class="timeNum"> {{ yearScTotal }}kW·h </span>
          </el-col>
          <el-col :span="6" class="comTitle"> <span class="bigtitle">年度治污设施用电量</span><br>
            <span class="timeNum"> {{ yearZlTotal }}kw </span>
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
      <el-col :span="9" style="margin-top:20px;">
        <div style="background:white;height:412px">
          <div class="qyTitle">
            <svg-icon icon-class="status" style="margin: 0 5px;font-size:19px" />
            企业设备实时状态
          </div>
          <div v-if="swiperList.length===0" class="noData">
            暂无数据
          </div>
          <swiper v-else ref="swiperList" :options="swiperOption" style="width:100%;height:374px;">
            <swiper-slide v-for="(sw,swIndex) in swiperList" :key="'sw'+swIndex">
              <div class="innerSwiper">
                <el-col :span="12" class="swiperCol"> 设备名称<br>{{ sw.deviceName }}</el-col>
                <el-col :span="12" class="swiperCol"> 设备类型<br>{{ sw.processName }}</el-col>
                <el-col :span="12" class="swiperCol">  A相电流：{{ sw.aCurrent }} <svg-icon icon-class="anpei" /></el-col>
                <el-col :span="12" class="swiperCol"> A相电压：{{ sw.aVoltage }} <svg-icon icon-class="dianya" /></el-col>
                <el-col :span="12" class="swiperCol"> B相电流：{{ sw.bCurrent }} <svg-icon icon-class="anpei" /></el-col>
                <el-col :span="12" class="swiperCol">  B相电压：{{ sw.bVoltage }} <svg-icon icon-class="dianya" /></el-col>
                <el-col :span="12" class="swiperCol">  C相电流：{{ sw.cCurrent }} <svg-icon icon-class="anpei" /></el-col>
                <el-col :span="12" class="swiperCol">  C相电压：{{ sw.cVlotage }} <svg-icon icon-class="dianya" /></el-col>
                <el-col :span="12" class="swiperCol">  功率：  <svg-icon icon-class="powerss" />{{ sw.activePower }} kW·h</el-col>
                <el-col :span="12" class="swiperCol">  功率因素：{{ sw.factor }}</el-col>
              </div>
            </swiper-slide>

            <div id="pagination" slot="pagination" class="swiper-pagination" />
          </swiper>
          <!-- <createHour :datatime="dataTime" :datalist="dataList" :devicename="deviceName" /> -->
        </div>
      </el-col>
      <el-col :span="9" style="margin-top:20px;">
        <div style="background:white;height:412px">
          <div class="qyTitle">
            企业设备异常次数排名
          </div>
          <el-row v-if="warnList.length!==0" :gutter="20" style="text-align:center">
            <el-col :span="12" :offset="4">设备名称</el-col>
            <el-col :span="8">异常报警次数（次）</el-col>
            <div v-for="(warn,warnIndex) in warnList" :key="'warn'+warnIndex" class="warnList">
              <el-col :span="4"> <div :class="{warnIndex:warnIndex<3}">{{ warnIndex+1 }}</div></el-col>
              <el-col :span="12">{{ warn.deviceName }}</el-col>
              <el-col :span="8">{{ warn.warNum }}</el-col>
            </div>
          </el-row>
          <div v-else class="noData">
            暂无数据
          </div>

          <!-- <createHour :datatime="dataTime" :datalist="dataList" :devicename="deviceName" /> -->
        </div>
      </el-col>
      <el-col :span="6" style="margin-top:20px">
        <div style="background:white;height:412px">
          <div style="padding: 15px 0px 10px 10px;">异常情况</div>
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
import { findComBasicData, findComElc, findUseElcByGroup, findComDeviceRealData, findComDeviceWarRange } from '@/api/table'
import { getToken } from '@/utils/auth'
// import createHour from './components/createHour'
import error from './components/error'
export default {
  name: 'Dashboard',
  components: {
    // createHour,
    error
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        loop: true,
        speed: 1000
      },
      comName: '',
      adress: '',
      scNum: '',
      scClose: '',
      scOpen: '',
      zlNum: '',
      zlOpen: '',
      zlClose: '',
      groupNum: '',
      todayScTotal: 0,
      todayZlTotal: 0,
      yearScTotal: 0,
      yearZlTotal: 0,
      dataTime: [],
      dataList: [],
      deviceName: [],
      xhList: [],
      getId: [],
      swiperList: [],
      warnList: [],
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
      this.adress = res.retData.adress
      this.scNum = res.retData.scNum
      this.scClose = res.retData.scClose
      this.scOpen = res.retData.scOpen
      this.zlNum = res.retData.zlNum
      this.zlClose = res.retData.zlClose
      this.zlOpen = res.retData.zlOpen
      this.groupNum = res.retData.groupNum
    })
    findComElc({
      token: getToken()
    }).then(res => {
      this.todayScTotal = res.retData.todayScTotal
      this.todayZlTotal = res.retData.todayZlTotal
      this.yearScTotal = res.retData.yearScTotal
      this.yearZlTotal = res.retData.yearZlTotal
    })
    // findScSwitchData({
    //   token: getToken()
    // }).then(res => {
    //   this.dataTime = res.retData.dataTime
    //   this.dataList = res.retData.dataList
    //   this.deviceName = res.retData.deviceName
    // })
    findComDeviceRealData({
      token: getToken()
    }).then(res => {
      this.swiperList = res.retData
    })
    findComDeviceWarRange({
      token: getToken()
    }).then(res => {
      this.warnList = res.retData
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
    allResize() {
      for (var i = 0; i < this.getId.length; i++) {
        // console.log(i)
        this.getId[i].resize()
      }
    },
    mapTree() {
      this.$nextTick(function() {
        for (var i = 0; i < this.xhList.length; i++) {
          console.log('i' + i)
          this.getId.push(echarts.init(document.getElementById('geo_' + i)))
          const xAxisData = this.xhList[i].dataTime
          var fuseries = []

          for (var j = 0; j < this.xhList[i].dataList.length; j++) {
            console.log('j' + j)
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
        window.addEventListener('resize', () => { this.allResize() })
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
  @media screen and (max-width: 1700px){
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
</style>

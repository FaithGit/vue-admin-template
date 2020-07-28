<template>
  <div class="app-container">
    <div>
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择" @change="changeCom">
        <el-option
          v-for="item in comList"
          :key="item.value+'x'"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class="scx">生产线：</span>
      <el-select v-model="scx" placeholder="请选择" clearable>
        <el-option
          v-for="(item,index) in scxList"
          :key="'y'+index"
          :label="item.group_name"
          :value="item.group_id"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="findTodayScZlPower">搜索</el-button>
      <div>
        <div v-for="(listitem,listindex) in list" :key="'xxxx'+listindex" class="gropBlock">
          <div style="font-size: 18px;text-align: center;">{{ listitem.groupName }}</div>
          <div class="wuri">五日平均功率(KW)</div>

          <div :id="forId(listindex)" :ref="forId(listindex)" style="height:600px" />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
var echarts = require('echarts')
import { findData, selectAllGroups, findTodayScZlPower } from '@/api/table'
import { getToken } from '@/utils/auth'
export default {
  name: 'DataCom',
  data() {
    return {
      comList: [],
      com: '',
      scxList: [],
      scx: '',
      list: [],
      getId: [],
      fu: ''
    }
  },
  mounted() {
    findData({
      token: getToken(),
      comName: '',
      pageIndex: 1,
      pageSize: 100
    }).then(res => {
      // console.log(res.retData.data)
      var arr = res.retData.data
      var temp = []
      for (var i = 0; i < arr.length; i++) {
        temp.push({
          label: arr[i].comShortName,
          value: arr[i].id
        })
      }
      this.comList = temp
      this.com = temp[0].value
      this.findTodayScZlPower()
      this.changeCom()
    })
  },
  methods: {
    forId: function(index) {
      return 'fu_' + index
    },
    allResize() {
      for (var i = 0; i < this.getId.length; i++) {
        // console.log(i)
        this.getId[i].resize()
      }
    },
    allclean() {
      for (var i = 0; i < this.getId.length; i++) {
        // console.log(i)
        this.getId[i].clean()
      }
    },
    mapTree() {
      this.getId = []
      this.allclean()
      // var colors = ['rgb(87,147,243)', 'rgb(209,74,97)', 'rgb(103,91,186)']
      // var colors3 = ['rgba(87,147,243,0.3)', 'rgba(209,74,97,0.3)', 'rgba(103,91,186,0.3)']
      // var colors9 = ['rgba(87,147,243,0.9)', 'rgba(209,74,97,0.9)', 'rgba(103,91,186,0.9)']
      this.$nextTick(function() {
        for (var i = 0; i < this.list.length; i++) {
          this.getId.push(echarts.init(document.getElementById('fu_' + i)))

          var avgPowerList = [] // 平均值数组
          var powerList = [] // 用电量数组
          var deviceNameList = [] // legendData
          var dataTimeList = []
          for (var j = 0; j < this.list[i].list.length; j++) {
            avgPowerList.push(this.list[i].list[j].avgPower)
            deviceNameList.push(this.list[i].list[j].deviceName)
            const _arr = []
            dataTimeList = []
            for (var z = 0; z < this.list[i].list[j].data.length; z++) {
              _arr.push(this.list[i].list[j].data[z].avg_power)
              dataTimeList.push(this.list[i].list[j].data[z].data_time)
            }
            powerList[j] = _arr
          }

          console.log(avgPowerList)
          // console.log(powerList)
          // console.log(deviceNameList)
          // console.log(dataTimeList)

          var series = []
          for (let y = 0; y < deviceNameList.length; y++) {
            // var fu = deviceNameList
            series.push({
              // color: colors[y],
              name: deviceNameList[y],
              type: 'line',
              smooth: true,
              data: powerList[y],
              areaStyle: {},
              markArea: {
                silent: true,
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderWidth: 1,
                    borderType: 'dashed'
                  }
                },
                data: [
                  [{
                    name: deviceNameList[y] + ': ' + avgPowerList[y],
                    yAxis: avgPowerList[y],
                    label: {
                      fontSize: 14,
                      fontWeight: 'bold',
                      position: 'right',
                      distance: 30
                    }
                  }, {
                    name: deviceNameList[y] + ': ' + avgPowerList[y],
                    yAxis: avgPowerList[y],
                    label: {
                      position: 'right',
                      fontWeight: 'bold',
                      distance: 30,
                      fontSize: 14
                    }
                  }]

                ]
              }
              // markLine: {
              //   label: {
              //     show: true,
              //     textStyle: {
              //       fontSize: 14
              //     },
              //     formatter: function(params) {
              //       console.log(params)
              //       const str = fu[y] + ': ' + avgPowerList[y] + 'KW'
              //       return str
              //     }
              //   },
              //   silent: true,
              //   data: [{
              //     yAxis: avgPowerList[y],
              //     name: '平均值'
              //   }]
              // },

            })
          }

          this.getId[i].setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              top: '10%',
              right: '10%'
            },
            toolbox: {
              feature: {
                dataView: {
                  show: false,
                  readOnly: false
                },
                restore: {
                  show: false
                },
                saveAsImage: {
                  show: false
                }
              }
            },
            legend: {
              data: deviceNameList,
              top: 20
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisTick: {
                alignWithLabel: true
              },
              data: dataTimeList
            }],
            yAxis: [{
              type: 'value',
              name: '功率(KW)',
              position: 'left',
              // axisLine: {
              //   lineStyle: {
              //     color: colors[0]
              //   }
              // },
              axisLabel: {
                formatter: '{value} '
              }
            }
            ],

            series: series
          }, true
          )
        }
        window.addEventListener('resize', () => { this.allResize() })
      })
    },
    changeCom() {
      this.selectAllGroups()
    },
    findData() {
      findData({
        token: getToken(),
        comName: '',
        pageIndex: 1,
        pageSize: 100
      }).then(res => {
        // console.log(res.retData.data)
        var arr = res.retData.data
        var temp = []
        for (var i = 0; i < arr.length; i++) {
          temp.push({
            label: arr[i].comShortName,
            value: arr[i].id
          })
        }
        this.comList = temp
        this.com = temp[0].value
      })
    },
    selectAllGroups() {
      selectAllGroups({
        pageIndex: 1,
        pageSize: 99,
        comId: this.com || ''
      }).then(res => {
        this.scxList = res.retData.data
        this.scx = ''
      })
    },
    findTodayScZlPower() {
      console.log(this.com)
      console.log(this.scx)
      findTodayScZlPower({
        token: getToken(),
        comId: this.com,
        groupId: this.scx
      }).then(res => {
        console.log(res)
        this.list = res.retData
        this.mapTree()
        setTimeout(() => {
          this.allResize()
        }, 200)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
    padding: 20px;
}
.scx{
  margin: 0 0 0 10px;
}
.gropBlock{
  margin-top: 20px;
  position: relative;
}
.wuri{
    font-size: 17px;
    text-align: right;
    position: absolute;
    right: 20px;
    top: 49px;
}
</style>

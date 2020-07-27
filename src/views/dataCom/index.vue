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
          {{ listitem.groupName }}

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
      getId: []
    }
  },
  mounted() {
    this.findData()
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
    mapTree() {
      this.getId = []
      this.$nextTick(function() {
        for (var i = 0; i < this.list.length; i++) {
          this.getId.push(echarts.init(document.getElementById('fu_' + i)))

          this.getId[i].setOption({
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
            }]
          }
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
}
</style>

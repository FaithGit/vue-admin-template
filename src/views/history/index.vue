<template>
  <div class="app-container">
    <div>
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择" @change="changeCom">
        <el-option
          v-for="item in comList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span>设备：</span>
      <el-select v-model="device" placeholder="请选择" @change="changeDevice">
        <el-option
          v-for="item in deviceList"
          :key="item.value"
          :label="item.label"
          :value="item"
        />
      </el-select>
      <span>日期：</span>
      <el-date-picker
        v-model="time"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        @change="changeTime"
      />
      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" @click="searchClickReset">重置</el-button>
    </div>

    <el-table v-loading="loadable" border :data="tableData" style="margin:10px 0px 0px 0px">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="设备名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.device_name }}
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.com_name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.device_type">
            {{ scope.row.device_type }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="生产线组号" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.group_name">
            {{ scope.row.group_name }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.data_time">
            {{ scope.row.data_time }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='1'" key="1" label="开启状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.switch_data">
            {{ scope.row.switch_data==true?'开':'关' }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='1'" key="2" label="生产温度" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.pro_tem">
            <svg-icon icon-class="tem" />
            {{ scope.row.pro_tem }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='1'" key="3" label="功率" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.active_power">
            <svg-icon icon-class="powerss" />
            {{ scope.row.active_power }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="4" label="水喷淋" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.water_spray">
            <svg-icon icon-class="water_switch" :class="[scope.row.water_spray!==true?'redSvg':'greenSvg']" />
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="5" label="风机电流" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.fans_current">
            <svg-icon icon-class="anpei" />
            {{ scope.row.fans_current }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="6" label="风机负荷" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.fans_load">
            <svg-icon icon-class="fuhe" />
            {{ scope.row.fans_load }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="7" label="风量" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.fans_volume">
            <svg-icon icon-class="fan" />
            {{ scope.row.fans_volume }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="deviceStyles=='2'" key="8" label="净化器电流" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.purifier_current">
            <svg-icon icon-class="anpei" />
            {{ scope.row.purifier_current }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="9" label="净化负荷" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.purifier_load">
            <svg-icon icon-class="fuhe" />
            {{ scope.row.purifier_load }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="deviceStyles=='2'" key="10" label="功率" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.active_power">
            <svg-icon icon-class="powerss" />
            {{ scope.row.active_power }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="[10,20,30,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="paginationStyle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { findData, selectByComId, findDataHistory } from '@/api/table'

export default {
  name: 'History',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      deviceStyle: '',
      deviceStyles: '',
      list: null,
      listLoading: true,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      loadable: false,
      comList: [],
      com: '',
      deviceList: [],
      device: '',
      time: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    findData({
      comName: '',
      pageIndex: 1,
      pageSize: 9999
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
      this.com = this.comList[0].value
      selectByComId({
        comId: this.com
      }).then(res => {
        // console.log(res)
        var arr = res.retData
        var temp = []
        for (var i = 0; i < arr.length; i++) {
          temp.push({
            label: arr[i].deviceName,
            value: arr[i].deviceId,
            deviceStyle: arr[i].deviceStyle
          })
        }
        this.deviceList = temp
        this.device = this.deviceList[0]
        this.deviceStyles = this.device.deviceStyle
        console.log('this.deviceStyles', this.deviceStyles)
        this.time = [new Date(new Date() - 3600 * 1000 * 24 * 7), new Date()]
        this.findDataHistory()
      })
    })
  },
  methods: {

    handleSizeChange(val) {
      this.pageSize = val
      this.findDataHistory()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findDataHistory()
    },
    findData() {
      findData({
        comName: '',
        pageIndex: 1,
        pageSize: 9999
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
      })
    },
    searchClick() {
      if (this.com === '') {
        this.$message({
          type: 'warning',
          message: '公司未选'
        })
        return
      } else if (this.device === '') {
        this.$message({
          type: 'warning',
          message: '设备未选'
        })
        return
      } else if (this.time.length === 0) {
        this.$message({
          type: 'warning',
          message: '时间未选'
        })
        return
      }
      this.deviceStyles = this.deviceStyle
      console.log(this.deviceStyles)
      this.findDataHistory()
    },
    searchClickReset() {
      this.com = ''
      this.device = ''
      this.time = []
      this.tableData = []
      this.deviceStyles = ''
    },
    changeCom(val) {
      console.log(val)
      selectByComId({
        comId: val
      }).then(res => {
        // console.log(res)
        var arr = res.retData
        var temp = []
        for (var i = 0; i < arr.length; i++) {
          temp.push({
            label: arr[i].deviceName,
            value: arr[i].deviceId,
            deviceStyle: arr[i].deviceStyle
          })
        }
        this.deviceList = temp
        this.device = ''
      })
    },
    changeDevice(val) {
      console.log(val)
      this.deviceStyle = val.deviceStyle
    },
    findDataHistory(pageIndex, pageSize) {
      this.loadable = true
      findDataHistory({
        'pageIndex': this.pageIndex || pageIndex,
        'pageSize': this.pageSize || pageSize,
        'deviceId': this.device.value,
        'startTime': this.time[0],
        'endTime': this.time[1],
        'deviceStyle': this.deviceStyles
      }).then(res => {
        console.log(res)
        this.tableData = res.retData.data
        this.total = res.retData.total
        this.loadable = false
      })
    },
    changeTime(val) {
      console.log(val)
      if (val === null) {
        this.time = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.redSvg{
  color: red;
  font-size: 20px;
}
.greenSvg{
  color: green;
  font-size: 20px;
}
.paginationStyle{
 text-align: center;
 margin: 15px 0;
}
</style>

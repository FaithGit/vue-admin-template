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
      <span class="demonstration">检测仪：</span>
      <el-select v-model="device" clearable placeholder="非必填项">
        <el-option
          v-for="item in deviceList"
          :key="item.value"
          :label="item.deviceName"
          :value="item.deviceId"
        />
      </el-select>
      <span class="demonstration">日期: </span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />

      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" @click="restClick">重置</el-button>
    </div>

    <el-table v-loading="loadable" border :data="tableData" style="margin:10px 0px 0px 0px">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="点位" align="center">
        <template slot-scope="scope">
          {{ scope.row.device_name }}
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.com_name }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.data_time }}
        </template>
      </el-table-column>
      <el-table-column label="数据" align="center">
        <el-table-column label="监测项" align="center">
          <template slot-scope="scope">
            {{ scope.row.warType }}
          </template>
        </el-table-column>

        <el-table-column label="监测值" align="center">
          <template slot-scope="scope">
            {{ scope.row.warData }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="异常类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type_name }}
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
      style="text-align: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { findData, findWarData, selectAllDevices } from '@/api/table'
import { getToken } from '@/utils/auth'
import { DateHandle } from '@/utils/validate'
export default {
  name: 'LineList',
  data() {
    return {
      com: '',
      date: '',
      comList: [],
      deviceList: [],
      device: '',
      searchReal: '', // 公司id 真实搜索条件
      deviceReal: '', // 设备id 真实搜索条件
      loadable: true,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      addVisible: false,
      lineTitle: '',
      comId: '',
      groupName: '',
      groupId: '',
      groupNo: '',
      isTest: true,
      isUse: true,
      showUpdata: false,
      isList: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date()
            var date = new Date()
            // 2. 时分秒归零
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            const start = date
            picker.$emit('pick', [start, end])
          }
        }, {
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
      findWarData({
        token: getToken(),
        comId: this.com,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        startTime: '',
        endTime: '',
        deviceId: ''
      }).then(res => {
        this.tableData = res.retData.data
        this.total = res.retData.total
        this.loadable = false
      })
    })
  },
  methods: {

    findWarData() {
      this.loadable = true
      console.log(this.date)
      if (this.date) {
        findWarData({
          token: getToken(),
          comId: this.searchReal,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          startTime: DateHandle(this.date[0]),
          endTime: DateHandle(this.date[1]),
          deviceId: this.deviceReal
        }).then(res => {
          this.tableData = res.retData.data
          this.total = res.retData.total
          this.loadable = false
        })
      } else {
        findWarData({
          token: getToken(),
          comId: this.searchReal,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          deviceId: this.deviceReal
        }).then(res => {
          this.tableData = res.retData.data
          this.total = res.retData.total
          this.loadable = false
        })
      }
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.pageIndex = 1
      this.findWarData()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.findWarData()
    },
    searchClick() {
      this.searchReal = this.com
      this.deviceReal = this.device
      this.pageIndex = 1
      this.findWarData()
    },
    restClick() {
      this.deviceReal = this.device = ''
      this.searchReal = this.com = ''
      this.date = ''
      this.pageIndex = 1
      this.findWarData()
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
      })
    },
    changeCom(val) {
      selectAllDevices({
        token: getToken(),
        comId: this.com
      }).then(res => {
        console.log(res)
        this.deviceList = res.retData.data
        this.device = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    padding: 20px;
}
.demonstration{
  margin-left: 10px;
}
</style>

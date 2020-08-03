<template>
  <div class="app-container">
    <div>
      <span>用户名：</span>

      <el-input v-model="userName" clearable placeholder="非必填项" style="width:200px" />
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
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="IP地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.ipAddress }}
        </template>
      </el-table-column>
      <el-table-column label="登录时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.loginDate }}
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
import { findLoginLog } from '@/api/table'
// import { getToken } from '@/utils/auth'
import { DateHandle } from '@/utils/validate'
export default {
  name: 'Loginlog',
  data() {
    return {
      loadable: false,
      realName: '',
      realDate: [],
      userName: '',
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      date: '',
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
    findLoginLog({
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      this.tableData = res.retData.data
      this.total = res.retData.total
    })
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    searchClick() {
      this.pageIndex = 1
      this.realName = this.userName
      this.findLoginLog()
    },
    restClick() {
      this.realName = ''
      this.userName = ''
      this.pageIndex = 1
      this.date = ''
      this.findLoginLog()
    },
    findLoginLog() {
      if (this.date) {
        findLoginLog({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          userName: this.realName,
          startTime: DateHandle(this.date[0]),
          endTime: DateHandle(this.date[1])
        }).then(res => {
          this.tableData = res.retData.data
          this.total = res.retData.total
        })
      } else {
        findLoginLog({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          userName: this.realName
        }).then(res => {
          this.tableData = res.retData.data
          this.total = res.retData.total
        })
      }
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

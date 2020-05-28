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

      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>

  </div>
</template>

<script>
import { findData, selectByComId } from '@/api/table'

export default {
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
      list: null,
      listLoading: true,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      search1: '',
      search: '',
      loadable: true,
      comList: [],
      com: '',
      deviceList: [],
      device: '',
      time: '',
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
    this.findData()
  },
  methods: {

    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageIndex = val
    },
    findData() {
      this.loadable = true
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
      this.search = this.search1
      this.findData(this.search, 1, this.pageSize)
    },
    searchClickReset() {
      this.search = this.search1 = ''
      this.findData(this.search, 1, this.pageSize)
    },
    changeCom(val) {
      console.log(val)
      selectByComId({
        comId: val
      }).then(res => {
        console.log(res)
      })
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

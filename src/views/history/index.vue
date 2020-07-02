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
    <el-tabs v-model="activeName" type="card" class="elTab">
      <el-tab-pane label="表格" name="first">
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
      </el-tab-pane>
      <el-tab-pane label="图表化" name="second">
        <charts v-if="activeName=='second'" :tabledata="tableData" style="height:900px" />
      </el-tab-pane>
    </el-tabs>
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
    <div class="daochu">
      <span>文件格式：</span>
      <el-select v-model="bookType" placeholder="请选择" size="small">
        <el-option label="xlsx" value="xlsx" />
        <el-option label="csv" value="csv" />
        <el-option label="txt" value="txt" />
      </el-select>
      <el-button v-if="deviceStyles==2" size="small" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadAll">
        单页导出
      </el-button>
      <el-button v-else size="small" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload"> 单页导出</el-button>
    </div>

  </div>
</template>

<script>
import { findData, selectByComId, findDataHistory } from '@/api/table'
import { getToken } from '@/utils/auth'
import { DateHandle } from '@/utils/validate'
import charts from './components/charts'

export default {
  name: 'History',
  components: {
    charts
  },
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
      bookType: 'xlsx',
      activeName: 'first',
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
      deviceValue: '',
      startTime: '',
      endTime: '',
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
  watch: {
    '$route'(to, from) {
      // console.log(to)
      // console.log(from)
      if (JSON.stringify(to.params) !== '{}') {
        this.init()
      }
    }
  },
  mounted() {
    console.log(this.$route.params.comId, this.$route.params.device_id)
    this.init()
  },
  methods: {
    // 导出excel
    handleDownloadAll() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备名称', '企业名称', '类型', '生产线组号', '时间', '水喷淋', '风机电流', '风机负荷', '风量', '净化器电流', '净化负荷', '功率'] // 表头名称
        const filterVal = ['device_name', 'com_name', 'device_type', 'group_name', 'data_time', 'water_spray', 'fans_current', 'fans_load', 'fans_volume', 'purifier_current', 'purifier_load', 'active_power'] // 对应的字段v
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: true,
          bookType: this.bookType || 'xlsx'
        })
      })
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备名称', '企业名称', '类型', '生产线组号', '时间', '开启状态', '生产温度', '功率'] // 表头名称
        const filterVal = ['device_name', 'com_name', 'device_type', 'group_name', 'data_time', 'switch_data', 'pro_tem', 'active_power']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: true,
          bookType: this.bookType || 'xlsx'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (v[j] === true) {
          v[j] = '开'
        } else if (v[j] === false) {
          v[j] = '关'
        } else if (v[j] === undefined) {
          v[j] = undefined
        }
        return v[j]
      }))
    },
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
      this.pageIndex = 1
      this.deviceValue = this.device.value
      this.startTime = DateHandle(this.time[0])
      this.endTime = DateHandle(this.time[1])
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
        'token': getToken(),
        'pageIndex': this.pageIndex || pageIndex,
        'pageSize': this.pageSize || pageSize,
        'deviceId': this.deviceValue,
        'startTime': DateHandle(this.startTime),
        'endTime': DateHandle(this.endTime),
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
    },
    init() {
      // 判断是否传参进入
      if (this.$route.params.comId && this.$route.params.device_id && this.$route.params.device_name && this.$route.params.style) {
        findData({
          'token': getToken(),
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
          this.com = this.$route.params.comId
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
            this.device = this.$route.params.device_name
            this.deviceValue = this.$route.params.device_id
            this.deviceStyles = this.$route.params.style
            this.deviceStyle = this.$route.params.style
            this.time = [new Date(new Date() - 3600 * 1000 * 24 * 7), new Date()]
            this.startTime = this.time[0]
            this.endTime = this.time[1]
            this.findDataHistory()
          })
        })
      } else {
        // 正常进入
        findData({
          'token': getToken(),
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
            this.deviceStyle = this.device.deviceStyle
            this.deviceValue = this.device.value

            console.log('this.deviceStyles', this.deviceStyles)
            this.time = [new Date(new Date() - 3600 * 1000 * 24 * 7), new Date()]
            this.startTime = this.time[0]
            this.endTime = this.time[1]
            this.findDataHistory()
          })
        })
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
.elTab{
  margin-top:10px
}
.daochu{
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  position: absolute;
  top: 74px;
  right: 22px;
  font-size: 14px;
  font-weight: 500;
}
</style>

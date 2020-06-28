<template>
  <div class="app-container">
    <div>
      <el-input v-model="search1" style="width:280px;margin:10px 0 15px 0" placeholder="请输入企业名" @keyup.enter.native="searchClick" />
      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" @click="searchClickReset">重置</el-button>
    </div>

    <el-table v-loading="loadable" border :data="tableData" :span-method="arraySpanMethod">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="企业" align="center">
        <template slot-scope="scope">
          {{ scope.row.comName }}
        </template>
      </el-table-column>
      <el-table-column label="组号" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.groupName">
            {{ scope.row.groupName }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>

      <el-table-column label="生产设备开关" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.scData">
            <span v-for="sc in scope.row.scData " :key="sc.id">
              <el-popover
                placement="top-start"
                :title="sc.device_name"
                width="200"
                trigger="hover"
                :content="'生产设备开关:'+(sc.switch_data ==true?'开':'关')"
              >
                <svg-icon slot="reference" icon-class="create" :class="[sc.device_name==true?'redSvgCreate':'greenSvgCreate']" style="margin:0 5px" class="hoverHref" @click="gotoHistory(sc,scope.row,1)" />
              </el-popover>

            </span>
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="治理设施名称" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.device_name">
            <span class="gotoZL" @click="gotoHistoryZL(scope.row,2)">  {{ scope.row.device_name }}</span>
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="工艺名称" align="center">
        <template slot-scope="scope">

          <div v-if="scope.row.PROCESS">
            {{ scope.row.PROCESS }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" width="154px">
        <template slot-scope="scope">
          <div v-if="scope.row.data_time">
            <svg-icon icon-class="anpei" />
            {{ scope.row.data_time }}
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="水喷淋" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.water_spray">
            <svg-icon icon-class="water_switch" :class="[scope.row.water_spray!==true?'redSvg':'greenSvg']" />
          </div>
          <div v-else>
            /
          </div>
        </template>
      </el-table-column>
      <el-table-column label="风机电流" align="center">
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
      <el-table-column label="风机负荷" align="center">
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
      <el-table-column label="净化器电流" align="center">
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
      <el-table-column label="净化负荷" align="center">
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
      <el-table-column label="风量" align="center">
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
      <el-table-column label="功率" align="center">
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
import { findData } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Table',
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
      loadable: true
    }
  },
  mounted() {
    this.findData()
  },
  methods: {
  // 表格合并方法
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.nameIndex) { // 如果有值,说明需要合并
          return [row.nameIndex, 1]
        } else return [0, 0]
      }
      if (columnIndex === 2) {
        if (row.typeIndex) {
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
      if (columnIndex === 3) {
        if (row.typeIndex) {
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
    },
    init() {
      const getDate = [] // 存储新表格数据
      const typeIndex = [0] // 保存id,地区需要合并的值
      const nameIndex = [0] // 保存类型需要合并的值
      let a // id,地区需要合并的行是所有类型的长度
      // console.log(this.tableData)
      this.tableData.forEach((v, index) => {
        if (v.groups && v.groups.length) { // 如果有生产线
          a = 0
          v.groups.forEach((subV, i, typeData) => {
            if (subV.zlData && subV.zlData.length) { // 如果有治理设备
              subV.zlData.forEach((ss, k, data) => {
                if (k === data.length - 1) {
                  typeIndex.push(data.length) // 把每一个类型下面数据长度存起来
                  a += data.length // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    nameIndex.push(a) // 类型循环完成后把数据长度存起来
                  }
                }

                getDate.push({ // 这里是表格得展示数据
                  // id: v.id,
                  comName: v.comName,
                  comShortName: v.comShortName,
                  id: v.id,
                  govern: subV.govern,
                  create: subV.create,
                  groupName: subV.groupName,
                  abnormal: ss.abnormal,
                  switch_data: ss.switch_data, // 生产设备开关
                  title: ss.title, // 设备名称
                  device_name: ss.device_name, // 设备名称
                  device_id: ss.device_id,
                  data_time: ss.data_time,
                  fans_volume: ss.fans_volume,
                  emission_tem_in: ss.emission_tem_in,
                  fans_load: ss.fans_load,
                  purifier_current: ss.purifier_current,
                  emission_tem_out: ss.emission_tem_out,
                  purifier_load: ss.purifier_load,
                  fans_current: ss.fans_current,
                  water_spray: ss.water_spray,
                  active_power: ss.active_power,
                  scData: subV.scData,
                  PROCESS: ss.PROCESS
                })
              })
            } else { // 如果没治理设备
              getDate.push({ // 这里是表格得展示数据
                comName: v.comName,
                id: v.id,
                groupName: subV.groupName,
                scData: subV.scData

              })
              var x = 1
              nameIndex.push(x)
              typeIndex.push(x)
            }
          })
        } else {
          getDate.push({ // //如果没有生产线
            comName: v.comName,
            comShortName: v.comShortName,
            id: v.id
          })
          var x = 1
          nameIndex.push(x)
          typeIndex.push(x)
        }
      })

      // console.log(nameIndex)
      // [0, 5, 4]
      // 看一下打印出来的规律,除去第一项,5是第一次需要合并的行
      // 第二次合并又是从第五行开始合并4行

      // console.log(typeIndex)
      // [0, 2, 3, 2, 2]
      // 类型的数据存储规律也是一样,第一次合并2行
      // 第二次从2行开始,合并3行,以此类推

      // 根据这个规则,只需要给数据加上两个额外的属性控制是否合并就OK
      let k = 0
      let t = 0
      nameIndex.forEach((v, i, nameArr) => {
        if (nameArr[i + 1]) {
          getDate[k].nameIndex = nameArr[i + 1]
          k += nameArr[i + 1]
        }
      })

      typeIndex.forEach((v, i, typeArr) => {
        if (typeArr[i + 1]) {
          getDate[t].typeIndex = typeArr[i + 1]
          t += typeArr[i + 1]
        }
      })
      this.tableData = getDate
      console.log(nameIndex)
      console.log(typeIndex)
      console.log(getDate)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.findData()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.findData()
    },
    findData(seach1, pageIndex, pageSize) {
      this.loadable = true
      findData({
        token: getToken(),
        comName: seach1 || this.search,
        pageIndex: pageIndex || this.pageIndex,
        pageSize: pageSize || this.pageSize
      }).then(res => {
        const obj = res.retData.data
        this.tableData = obj
        this.total = res.retData.total
        this.init()
        this.loadable = false
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
    gotoHistory(item, all, style) {
      // console.log(item)
      // console.log(all)
      this.$router.push({ name: 'History', params: { comId: all.id, device_id: item.device_id, device_name: item.device_name, style: style }})
    },
    gotoHistoryZL(all, style) {
      console.log(all)
      this.$router.push({ name: 'History', params: { comId: all.id, device_id: all.device_id, device_name: all.device_name, style: style }})
    }
  }
}
</script>
<style lang="scss" scoped>
.redSvg{
  color: red !important;
  font-size: 20px;
  fill: red !important;
}
.greenSvg{
  color: green !important;
  font-size: 20px;
    fill: green !important;
}
.redSvgCreate{
  color: red !important;
  font-size: 20px;
  fill: red !important;
}
.greenSvgCreate{
  color: green !important;
  font-size: 20px;
    fill: green !important;
}
.greenSvgCreate:hover{
color: #9100ff !important;
 fill: #9100ff !important;
 cursor: pointer;
}
.redSvgCreate:hover{
color: #9100ff !important;
 fill: #9100ff !important;
  cursor: pointer;
}
.gotoZL:hover{
color: #9100ff !important;
 fill: #9100ff !important;
  cursor: pointer;
}
.paginationStyle{
 text-align: center;
 margin: 15px 0;
}

</style>

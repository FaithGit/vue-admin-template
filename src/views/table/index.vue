<template>
  <div class="app-container">
    <el-table border :data="tableData" :span-method="arraySpanMethod">
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
          {{ scope.row.groupName }}
        </template>
      </el-table-column>

      <el-table-column label="生产设备开关" align="center">
        <template slot-scope="scope">
          <span v-for="sc in scope.row.scData " :key="sc.id">
            <el-popover
              placement="top-start"
              :title="sc.device_name"
              width="200"
              trigger="hover"
              :content="'ID:'+sc.device_id"
            >
              <svg-icon slot="reference" icon-class="create" :class="[sc.device_name!==true?'redSvg':'greenSvg']" style="margin:0 5px" />
            </el-popover>

          </span>
        </template>
      </el-table-column>
      <el-table-column label="治理设施名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.device_name }}
        </template>
      </el-table-column>
      <el-table-column label="工艺名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.PROCESS }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" width="154px">
        <template slot-scope="scope">
          {{ scope.row.data_time }}
        </template>
      </el-table-column>
      <el-table-column label="水喷淋" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="water_switch" :class="[scope.row.water_spray!==true?'redSvg':'greenSvg']" />
        </template>
      </el-table-column>
      <el-table-column label="风机电流" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="anpei" />
          {{ scope.row.fans_current }}
        </template>
      </el-table-column>
      <el-table-column label="风机负荷" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="fuhe" />
          {{ scope.row.fans_load }}
        </template>
      </el-table-column>
      <el-table-column label="净化器电流" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="anpei" />
          {{ scope.row.purifier_current }}
        </template>
      </el-table-column>
      <el-table-column label="净化负荷" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="fuhe" />
          {{ scope.row.purifier_load }}
        </template>
      </el-table-column>
      <el-table-column label="风量" align="center">
        <template slot-scope="scope">
          <svg-icon icon-class="fan" />
          {{ scope.row.fans_volume }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findData } from '@/api/table'

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
      tableData: []
    }
  },
  mounted() {
    findData().then(res => {
      const obj = res.retData
      // for (var i = 0; i < obj.length; i++) {
      //   obj[i].scList = []
      //   obj[i].zlList = []
      //   for (var j = 0; j < obj[i].groups.length; j++) {
      //     for (var z = 0; z < obj[i].groups[j].zlData.length; z++) {
      //       obj[i].zlList.push(obj[i].groups[j].zlData[z])
      //     }

      //     for (var y = 0; y < obj[i].groups[j].scData.length; y++) {
      //       obj[i].scList.push(obj[i].groups[j].scData[y])
      //     }
      //   }
      // }
      // console.dir(obj)
      this.tableData = obj
      this.init()
    })
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
      this.tableData.forEach((v, index) => {
        if (v.groups && v.groups.length) {
          a = 0
          v.groups.forEach((subV, i, typeData) => {
            if (subV.zlData && subV.zlData.length) {
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
                  scData: subV.scData,
                  PROCESS: ss.PROCESS
                })
              })
            }
          })
        }
      })

      console.log(nameIndex)
      // [0, 5, 4]
      // 看一下打印出来的规律,除去第一项,5是第一次需要合并的行
      // 第二次合并又是从第五行开始合并4行

      console.log(typeIndex)
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
      console.log(getDate)
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
</style>

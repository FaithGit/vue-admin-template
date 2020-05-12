<template>
  <div class="app-container">
    <el-table border :data="tableData" :span-method="arraySpanMethod">
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="公司" align="center">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column label="组号" align="center">
        <template slot-scope="scope">
          {{ scope.row.groupNumber }}
        </template>
      </el-table-column>
      <el-table-column label="治理设施" align="center">
        <template slot-scope="scope">
          {{ scope.row.govern }}
        </template>
      </el-table-column>
      <el-table-column label="对应生产设施" align="center">
        <template slot-scope="scope">
          {{ scope.row.create }}
        </template>
      </el-table-column>
      <el-table-column label="异常类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.abnormal }}
        </template>
      </el-table-column>
      <el-table-column label="异常时长" align="center">
        <el-table-column label="时" align="center">
          <template slot-scope="scope">
            {{ scope.row.m }}
          </template>
        </el-table-column>
        <el-table-column label="分" align="center">
          <template slot-scope="scope">
            {{ scope.row.m }}
          </template>
        </el-table-column>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

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
      tableData: [{
        id: 1,
        company: '海宁长沁丰纺织有限公司',
        type: [{
          groupNumber: '1#线',
          govern: '（印刷1，2）治理设施2#	',
          create: '1901090-西印刷机1#,1901094-东印刷机2#	',
          sortList: [{
            abnormal: '风机异常',
            h: 1,
            m: 30
          }, {
            abnormal: '静电电流异常	',
            h: 0,
            m: 25
          }]
        }, {
          groupNumber: '4#线',
          govern: '（复合机）治理设施1#	',
          create: '1901062-复合机1#',
          sortList: [{
            abnormal: '软件1'
          }, {
            abnormal: '软件2'
          }, {
            abnormal: '软件3'
          }]
        }]
      }, {
        id: 2,
        company: '海宁飞溢纺织有限公司',
        type: [{
          groupNumber: '3#线',
          govern: '器械',
          sortList: [{
            abnormal: '器械1'
          }]
        }, {
          groupNumber: '9#线',
          govern: '软件',
          sortList: [{
            abnormal: '软件1'
          }, {
            abnormal: '软件2'
          }]
        }]
      }]
    }
  },
  mounted() {
    this.init()
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
    },
    init() {
      const getDate = [] // 存储新表格数据
      const typeIndex = [0] // 保存id,地区需要合并的值
      const nameIndex = [0] // 保存类型需要合并的值
      let a // id,地区需要合并的行是所有类型的长度
      this.tableData.forEach((v, index) => {
        if (v.type && v.type.length) {
          a = 0
          v.type.forEach((subV, i, typeData) => {
            if (subV.sortList && subV.sortList.length) {
              subV.sortList.forEach((ss, k, data) => {
                if (k === data.length - 1) {
                  typeIndex.push(data.length) // 把每一个类型下面数据长度存起来
                  a += data.length // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    nameIndex.push(a) // 类型循环完成后把数据长度存起来
                  }
                }
                getDate.push({
                  id: v.id,
                  company: v.company,
                  govern: subV.govern,
                  create: subV.create,
                  groupNumber: subV.groupNumber,
                  abnormal: ss.abnormal,
                  h: ss.h,
                  m: ss.m
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

<template>
  <div class="app-container">
    <div>
      <el-input v-model="search1" style="width:280px;margin:10px 0 15px 0" placeholder="请输入企业名" @keyup.enter.native="searchClick" />
      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" @click="addList">添加</el-button>
    </div>
    <el-table border :data="tableData">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="MN" align="center">
        <template slot-scope="scope">
          {{ scope.row.mn }}
        </template>
      </el-table-column>
      <el-table-column label="设备数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.deviceNum }}
        </template>
      </el-table-column>
      <el-table-column label="工况表数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.conditionsNum }}
        </template>
      </el-table-column>
      <el-table-column label="电表数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.meterNum }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="lineTitle"
      :visible.sync="visible"
      width="80%"
      style="margin-top: 0vh;"
    >
      <Forms />
    </el-dialog>
  </div>
</template>

<script>
import { findBoards } from '@/api/table'
import Forms from '@/views/form'

export default {
  name: 'Formlist',
  components: {
    Forms
  },
  data() {
    return {
      search1: '罗诗妮',
      tableData: [],
      visible: false
    }
  },
  methods: {
    searchClick() {
      findBoards({
        comName: '罗诗妮'
      }).then(res => {
        console.log(res)
        this.tableData = res.retData
      })
    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {

    },
    addList() {
      this.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  padding: 20px;
}
</style>

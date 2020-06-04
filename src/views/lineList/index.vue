<template>
  <div class="app-container">
    <div>
      <el-input v-model="search1" style="width:280px;margin:10px 0 15px 0" placeholder="请输入企业名" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh-right">重置</el-button>
    </div>

    <el-table v-loading="loadable" border :data="tableData">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="生产线组名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column label="组号" align="center">
        <template slot-scope="scope">
          {{ scope.row.groupNo }}
        </template>
      </el-table-column>
      <el-table-column label="是否使用中" align="center">
        <template slot-scope="scope">
          {{ scope.row.isUse ==true?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否测试数据" align="center">
        <template slot-scope="scope">
          {{ scope.row.isTest==true?'是':'否' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { selectAllGroups } from '@/api/table'
export default {
  name: 'LineList',
  data() {
    return {
      search1: '',
      loadable: true,
      tableData: []
    }
  },
  mounted() {
    this.selectAllGroups()
  },
  methods: {
    selectAllGroups() {
      this.loadable = true
      selectAllGroups({
        comId: ''
      }).then(res => {
        console.log(res)
        this.tableData = res.retData
        this.loadable = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    padding: 20px;
}
</style>

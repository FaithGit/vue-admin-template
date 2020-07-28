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
      <el-button type="primary" icon="el-icon-refresh-right" @click="restClick">重置</el-button>
      <el-button type="success" icon="el-icon-plus" @click="addLineList">添加</el-button>
    </div>

    <el-table v-loading="loadable" border :data="tableData" style="margin:10px 0px 0px 0px">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="企业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.com_name }}
        </template>
      </el-table-column>
      <el-table-column label="生产线组名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.group_name }}
        </template>
      </el-table-column>
      <el-table-column label="组号" align="center">
        <template slot-scope="scope">
          {{ scope.row.group_no }}
        </template>
      </el-table-column>
      <el-table-column label="是否使用中" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_use == true ?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否测试数据" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_test== true ?'是':'否' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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

    <el-dialog
      :title="lineTitle"
      :visible.sync="addVisible"
      width="700px"
    >
      <el-row :gutter="20">
        <el-col :span="12" style="margin:0px 0px 20px 0px">
          企业：
          <el-select v-model="comId" placeholder="请选择">
            <el-option
              v-for="item in comList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /></el-select>
        </el-col>
        <el-col :span="12" style="margin:0px 0px 20px 0px">
          <span>生产线组名称：</span>
          <el-input v-model="groupName" style="width:60%" />
        </el-col>
        <el-col :span="12" style="margin:0px 0px 20px 0px">
          <span>组号：</span>
          <el-input v-model="groupNo" style="width:70%" />
        </el-col>
        <el-col :span="12" style="margin:0px 0px 20px 0px">
          <span>是否使用中：</span>
          <el-select v-model="isUse" placeholder="请选择" style="width:70%">
            <el-option v-for="(isItem,index) in isList" :key="'key1'+index" :label="isItem.label" :value="isItem.value" />
          </el-select>
        </el-col>
        <el-col :span="12" style="margin:0px 0px 20px 0px">
          <span>是否测试数据：</span>
          <el-select v-model="isTest" placeholder="请选择" style="width:60%">
            <el-option v-for="(isItem,index) in isList" :key="'key2'+index" :label="isItem.label" :value="isItem.value" />
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button v-if="showUpdata" type="primary" icon="el-icon-refresh" @click="upSure">更 新</el-button>
        <el-button v-else type="primary" @click="addSure">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { findData, selectAllGroups, addGroup, deleteGroup, updateGroup } from '@/api/table'
import { getToken } from '@/utils/auth'
export default {
  name: 'LineList',
  data() {
    return {
      com: '',
      comList: [],
      searchReal: '',
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
      ]
    }
  },
  mounted() {
    this.findData()
    this.selectAllGroups()
  },
  methods: {
    selectAllGroups() {
      this.loadable = true
      selectAllGroups({
        comId: this.searchReal,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        this.tableData = res.retData.data
        this.total = res.retData.total
        this.loadable = false
      })
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.pageIndex = 1
      this.selectAllGroups()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.selectAllGroups()
    },
    addLineList() { // 添加
      this.addVisible = true
      this.lineTitle = '新增生产线信息表'
      this.comId = ''
      this.groupName = ''
      this.groupNo = ''
      this.isTest = true
      this.isUse = true
      this.showUpdata = false
    },
    searchClick() {
      this.searchReal = this.com
      this.pageIndex = 1
      this.selectAllGroups()
    },
    restClick() {
      this.com = ''
      this.searchReal = ''
      this.pageIndex = 1
      this.selectAllGroups()
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
      console.log(val)
      this.com = val
    },
    addSure() {
      if (this.comId === '' && this.groupName === '' && this.groupNo === '' && this.isTest === '' && this.isUse === '') {
        this.$message({
          type: 'info',
          message: '还有未填项'
        })
        return
      }
      addGroup({ comId: this.comId, groupName: this.groupName, groupNo: this.groupNo, isTest: this.isTest, isUse: this.isUse
      }).then(res => {
        console.log(res)
        this.addVisible = false
        this.selectAllGroups()
      })
    },
    handleEdit(index, item) {
      console.log(index, item)
      this.addVisible = true
      this.lineTitle = '编辑生产线'
      this.comId = item.com_id
      this.groupName = item.group_name
      this.groupNo = item.group_no
      this.isTest = item.is_test
      this.isUse = item.is_use
      this.showUpdata = true
      this.groupId = item.group_id
    },
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该生产线, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGroup({ groupId: item.group_id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.selectAllGroups()
        })
      }).catch(() => {
      })
    },
    upSure() {
      updateGroup({
        comId: this.comId,
        groupName: this.groupName,
        groupNo: this.groupNo,
        isTest: this.isTest,
        isUse: this.isUse,
        groupId: this.groupId
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.addVisible = false
        this.selectAllGroups()
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

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
          {{ scope.row.comName }}
        </template>
      </el-table-column>
      <el-table-column label="行业类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.busName }}
        </template>
      </el-table-column>
      <el-table-column label="企业地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.adress }}
        </template>
      </el-table-column>
      <el-table-column label="企业所在行政编码" align="center">
        <template slot-scope="scope">
          {{ scope.row.comAreaCode }}
        </template>
      </el-table-column>
      <el-table-column label="经纬度" align="center">
        <template slot-scope="scope">
          {{ scope.row.lonLat }}
        </template>
      </el-table-column>
      <el-table-column label="环保负责人" align="center">
        <template slot-scope="scope">
          {{ scope.row.envPerson }}
        </template>
      </el-table-column>

      <el-table-column label="环保负责人电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.envPersonTel }}
        </template>
      </el-table-column>
      <el-table-column label="是否开启短信报警通知" align="center">
        <template slot-scope="scope">
          {{ scope.row.envPersonTel }}
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
      width="60%"
    >
      <el-form ref="addCompanyForm" :model="companyForm" :rules="rules" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业名称" prop="comName">
              <el-input v-model="companyForm.comName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业简称" prop="comShortName">
              <el-input v-model="companyForm.comShortName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业地址" prop="adress">
              <el-input v-model="companyForm.adress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经纬度" prop="lonLat">
              <el-input v-model="companyForm.lonLat" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业所属行政区" prop="comAreaCode">
              <el-select v-model="companyForm.comAreaCode">
                <el-option label="南湖区" value="3304020" />
                <el-option label="秀洲区" value="3304110" />
                <el-option label="嘉善县" value="3304210" />
                <el-option label="海盐县" value="3304240" />
                <el-option label="海宁市" value="3304810" />
                <el-option label="海盐县" value="3304240" />
                <el-option label="平湖市" value="3304820" />
                <el-option label="桐乡市" value="3304830" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="socialCreditCode">
              <el-input v-model="companyForm.socialCreditCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="环保负责人" prop="envPerson">
              <el-input v-model="companyForm.envPerson" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="环保负责人电话" prop="envPersonTel">
              <el-input v-model="companyForm.envPersonTel" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业类型" prop="busName">
              <el-select-tree
                v-model="value"
                width="120px"
                placeholder="请选择内容"
                :data="treeData"
                :disabled-values="disabledValues"
              />

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否开启短信报警通知" prop="smsStatus ">
              <el-switch
                v-model="companyForm.smsStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button v-if="showUpdata" type="primary" icon="el-icon-refresh" @click="upSure">更 新</el-button>
        <el-button v-else type="primary" @click="addSure">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>
<script>
import { findData, selectAllCom, addGroup, deleteGroup, updateGroup, findSysBus } from '@/api/table'
import ElSelectTree from 'el-select-tree'
export default {
  name: 'Company',
  components: {
    ElSelectTree
  },
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
      ],
      companyForm: {

      },
      rules: {
        comName: '',
        comShortName: '',
        adress: '',
        lonLat: '',
        comAreaCode: '',
        socialCreditCode: '',
        envPerson: '',
        envPersonTel: '',
        busName: '',
        smsStatus: ''
      },
      treeData: [

      ],
      disabledValues: [3],
      value: 2
    }
  },

  mounted() {
    this.findData()
    this.selectAllCom()
    findSysBus().then(res => {
      this.treeData = res.retData
    })
  },
  methods: {
    selectAllCom() {
      this.loadable = true
      selectAllCom({
        comName: this.searchReal,
        comAreaCode: this.comAreaCode,
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
      this.selectAllCom()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.selectAllCom()
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
      this.selectAllCom()
    },
    restClick() {
      this.com = ''
      this.searchReal = ''
      this.pageIndex = 1
      this.selectAllCom()
    },
    findData() {
      findData({
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
        this.selectAllCom()
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
          this.selectAllCom()
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
        this.selectAllCom()
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

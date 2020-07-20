<template>
  <div class="app-container">
    <div>
      <span>用户名称：</span>
      <el-input v-model="search" class="userSeachInput" />
      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" @click="restClick">重置</el-button>
      <el-button type="success" icon="el-icon-plus" @click="addLineList">添加</el-button>
    </div>

    <el-table border :data="tableData" style="margin:10px 0px 0px 0px">
      <el-table-column
        type="index"
        width="50"
        label="#"
        align="center"
      />
      <el-table-column label="用户账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="所属行政区划" align="center">
        <template slot-scope="scope">
          {{ scope.row.areaName }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status== true ?'启用':'停用' }}
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
      <el-form ref="userForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户登录名" prop="userId">
          <el-input v-model="form.userId" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item v-if="lineTitle!='编辑用户'" label="登陆密码" prop="userPwd">
          <el-input v-model="form.userPwd" />
        </el-form-item>
        <el-form-item v-if="lineTitle!='编辑用户'" label="核实密码" prop="userPwd2">
          <el-input v-model="form.userPwd2" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId" @change="changeRole">
            <el-option v-for="(item,index) in roleList" :key="'role'+index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.roleld==='qy'" label="所属企业" prop="comId">
          <el-select v-model="form.comId">
            <el-option v-for="(item,index) in comList" :key="'comId'+index" :label="item.comShortName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="行政区域" prop="areaCode">
          <el-select-tree
            v-model="form.areaCode"
            width="120px"

            :data="comAreaCodeTree"
            :disabled-values="disabledValues"
          />
        </el-form-item>
        <div class="dialogButtonGroup">
          <el-button v-if="lineTitle!='编辑用户'" type="primary" @click="onSubmit">创建</el-button>
          <el-button v-else type="primary" @click="upDataSubmit">更新</el-button>
          <el-button @click="addVisible=false">取消</el-button>
        </div>

      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import { selectUserList, findAllRoles, findAlldAministrativeCode, findData, addUser, deleteUser, updateUser } from '@/api/table'
import { getToken } from '@/utils/auth'
import ElSelectTree from 'el-select-tree'
import { moblie, password } from '@/utils/asyncValidator'
export default {
  name: 'User',
  components: {
    ElSelectTree
  },
  data() {
    // 重复密码验证
    const passwordAgain = async(rule, value, callback) => {
      if (value.length < 1) {
        return callback(new Error('重复密码不能为空！'))
      } else if (this.form.userPwd !== this.form.userPwd2) {
        return callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }

    return {
      lineTitle: '',
      addVisible: false,
      pageSize: 10,
      total: 0,
      pageIndex: 1,
      tableData: [],
      roleList: [],
      search: '',
      comAreaCodeTree: [],
      disabledValues: [],
      form: {
        userId: '',
        userName: '',
        userPwd: '',
        userPwd2: '',
        telephone: '',
        roleId: '',
        areaCode: '',
        comId: -1,
        status: true
      },
      rules: {
        userId: [
          { required: true, message: '请输入用户登录名', trigger: 'blur' }
        ],
        telephone: [
          { required: false, validator: moblie, trigger: 'blur' }
        ],
        userPwd: [
          { required: true, validator: password, trigger: 'blur' }
        ],
        userPwd2: [
          { required: true, validator: passwordAgain, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请输入角色', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请输入行政区域', trigger: 'change' }
        ],
        comId: [
          { required: true, message: '请输入所属企业', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.selectUserList()
    findAllRoles().then(res => {
      this.roleList = res.retData
    })
    findAlldAministrativeCode().then(res => {
      this.comAreaCodeTree = res.retData
    })
    findData({
      comName: '',
      pageIndex: 1,
      pageSize: 999,
      token: getToken()
    }).then(res => {
      this.comList = res.retData.data
    })
  },
  methods: {
    selectUserList(search, pageIndex, pageSize) {
      selectUserList({
        token: getToken(),
        userName: search || this.search,
        pageIndex: pageIndex || this.pageIndex,
        pageSize: pageSize || this.pageSize
      }).then(res => {
        console.log(res)
        this.tableData = res.retData.data
        this.total = res.retData.total
      })
    },
    handleEdit(index, row) {
      this.form = row
      delete this.form.userPwd
      delete this.form.userPwd2
      delete this.form.createTime
      this.form.id = row.id
      this.addVisible = true
      this.lineTitle = '编辑用户'
      setTimeout(() => {
        this.$refs.userForm.clearValidate()
      }, 500)
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ userId: row.userId }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.selectUserList()
        })
      }).catch(() => {
      })
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.selectUserList()
    },
    handleCurrentChange(e) {
      this.pageIndex = e
      this.selectUserList()
    },
    changeRole(e) {
      console.log(e)
      if (e === 'qy') {
        this.form.comId = ''
      } else {
        this.form.comId = -1
      }
    },
    searchClick() {
      this.selectUserList(this.search, 1, this.pageSize)
    },
    restClick() {
      this.selectUserList(this.search = '', 1, this.pageSize)
    },
    addLineList() {
      this.addVisible = true
      this.form = {
        userId: '',
        userName: '',
        userPwd: '',
        userPwd2: '',
        telephone: '',
        roleId: '',
        areaCode: '',
        comId: -1,
        status: true
      }
      this.lineTitle = '新建用户'
      setTimeout(() => {
        this.$refs.userForm.clearValidate()
      }, 500)
    },
    onSubmit() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          delete this.form.userPwd2
          addUser(this.form).then(res => {
            this.addVisible = false
            this.selectUserList()
            this.$message({
              type: 'success',
              message: '用户添加成功'
            })
          })
        } else {
          return false
        }
      })
    },
    upDataSubmit() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateUser(this.form).then(res => {
            this.addVisible = false
            this.selectUserList()
            this.$message({
              type: 'success',
              message: '用户已更新'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    padding: 20px;
}
.userSeachInput{
    width:220px
}
.dialogButtonGroup{
    margin-top: 10px;
    text-align: center;
}
</style>

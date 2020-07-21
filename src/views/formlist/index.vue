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
      <el-table-column label="企业名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.comName }}
        </template>
      </el-table-column>
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
    <el-dialog
      :title="diglogTitle"
      :visible.sync="visible"
      width="90%"
      style="margin-top: 0vh;"
      @close="closeDialog"
      @opened="openDialog"
    >
      <Forms ref="fuForm" :form="form" :sprot="sprot" @fuclose="fuclose" />
    </el-dialog>
  </div>
</template>

<script>
import { findBoards, deleteBoards } from '@/api/table'
import Forms from '@/views/form'

export default {
  name: 'Formlist',
  components: {
    Forms
  },
  data() {
    return {
      sprot: 1,
      diglogTitle: '',
      search1: '',
      tableData: [],
      visible: false,
      form: {}
    }
  },
  mounted() {
    this.searchClick()
  },
  methods: {
    fuclose() {
      this.visible = false
      this.searchClick()
    },

    closeDialog() {
      this.$refs.fuForm.onCancel()
      this.searchClick()
    },
    openDialog() {
      var that = this
      setTimeout(function() {
        that.$refs.fuForm.onCancel()
      }, 500)
    },
    searchClick() {
      findBoards({
        comName: this.search1
      }).then(res => {
        console.log(res)
        this.tableData = res.retData
      })
    },
    handleEdit(index, row) {
      this.visible = true
      this.diglogTitle = '编辑配置表'
      this.sprot = 2 // 1新增 2编辑
      console.log(row)
      this.form = row
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该配置表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBoards({ mn: row.mn }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.searchClick()
        })
      }).catch(() => {
      })
    },
    addList() {
      this.visible = true
      this.sprot = 1 // 1新增 2编辑
      this.diglogTitle = '新增配置表'
      this.form = {
        mn: '',
        comId: '',
        sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '', deviceProcess: '', groupId: '', isWar: false, deviceStatus: true, isTest: false, orderNum: 1 }],
        sysConditions: [
          {
            modelNum: 1,
            ooStatus: false,
            ooToModel: '',
            ooHbCode: '',
            otStatus: false,
            otToModel: '',
            otHbCode: '',
            owStatus: false,
            owToModel: '',
            owHbCode: '',
            ofStatus: false,
            ofToModel: '',
            ofHbCode: '',
            aoStatus: false,
            aoToModel: '',
            aoHbCode: '',
            aoAcquisitionRangeMax: '',
            aoAcquisitionRangeMin: '',
            aoRealRangeMax: 1,
            aoRealRangeMin: '',
            aoCriticalValue: '',
            aoLoadCoefficient: 1,
            aoAir: '',
            atStatus: false,
            atToModel: '',
            atHbCode: '',
            atAcquisitionRangeMax: '',
            atAcquisitionRangeMin: '',
            atRealRangeMax: 1,
            atRealRangeMin: '',
            atCriticalValue: '',
            atLoadCoefficient: 1,
            atAir: '',
            awStatus: false,
            awToModel: '',
            awHbCode: '',
            awAcquisitionRangeMax: '',
            awAcquisitionRangeMin: '',
            awRealRangeMax: 1,
            awRealRangeMin: '',
            awCriticalValue: '',
            awLoadCoefficient: 1,
            awAir: '',
            afStatus: false,
            afToModel: '',
            afHbCode: '',
            afAcquisitionRangeMax: '',
            afAcquisitionRangeMin: '',
            afRealRangeMax: 1,
            afRealRangeMin: '',
            afCriticalValue: '',
            afLoadCoefficient: 1,
            afAir: ''
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  padding: 20px;
}
</style>

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
      :title="diglogTitle"
      :visible.sync="visible"
      width="80%"
      style="margin-top: 0vh;"
      @close="closeDialog"
    >
      <Forms ref="fuForm" :form="form" />
    </el-dialog>
  </div>
</template>

<script>
import { findBoards, deleteSysCondition } from '@/api/table'
import Forms from '@/views/form'

export default {
  name: 'Formlist',
  components: {
    Forms
  },
  data() {
    return {
      diglogTitle: '',
      search1: '海',
      tableData: [],
      visible: false,
      form: {
        mn: '',
        comId: '',
        sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '', deviceProcess: '', groupId: '' }],
        sysConditions: [
          {
            modelNum: '',
            ooStatus: 0,
            ooToModel: '',
            ooHbCode: '',
            otStatus: 0,
            otToModel: '',
            otHbCode: '',
            owStatus: 0,
            owToModel: '',
            owHbCode: '',
            ofStatus: 0,
            ofToModel: '',
            ofHbCode: '',
            aoStatus: 0,
            aoToModel: '',
            aoHbCode: '',
            aoAcquisitionRangeMax: '',
            aoAcquisitionRangeMin: '',
            aoRealRangeMax: 1,
            aoRealRangeMin: '',
            aoCriticalValue: '',
            aoLoadCoefficient: 1,
            aoAir: '',
            atStatus: 0,
            atToModel: '',
            atHbCode: '',
            atAcquisitionRangeMax: '',
            atAcquisitionRangeMin: '',
            atRealRangeMax: 1,
            atRealRangeMin: '',
            atCriticalValue: '',
            atLoadCoefficient: 1,
            atAir: '',
            awStatus: 0,
            awToModel: '',
            awHbCode: '',
            awAcquisitionRangeMax: '',
            awAcquisitionRangeMin: '',
            awRealRangeMax: 1,
            awRealRangeMin: '',
            awCriticalValue: '',
            awLoadCoefficient: 1,
            awAir: '',
            afStatus: 0,
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
  },
  methods: {
    closeDialog() {
      this.$refs.fuForm.onCancel()
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
      console.log(row)
      this.form = row
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该配置表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSysCondition({ mn: row.mn }).then(res => {
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
      this.diglogTitle = '新增配置表'
      this.form = {
        mn: '',
        comId: '',
        sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '', deviceProcess: '', groupId: '' }],
        sysConditions: [
          {
            modelNum: '',
            ooStatus: 0,
            ooToModel: '',
            ooHbCode: '',
            otStatus: 0,
            otToModel: '',
            otHbCode: '',
            owStatus: 0,
            owToModel: '',
            owHbCode: '',
            ofStatus: 0,
            ofToModel: '',
            ofHbCode: '',
            aoStatus: 0,
            aoToModel: '',
            aoHbCode: '',
            aoAcquisitionRangeMax: '',
            aoAcquisitionRangeMin: '',
            aoRealRangeMax: 1,
            aoRealRangeMin: '',
            aoCriticalValue: '',
            aoLoadCoefficient: 1,
            aoAir: '',
            atStatus: 0,
            atToModel: '',
            atHbCode: '',
            atAcquisitionRangeMax: '',
            atAcquisitionRangeMin: '',
            atRealRangeMax: 1,
            atRealRangeMin: '',
            atCriticalValue: '',
            atLoadCoefficient: 1,
            atAir: '',
            awStatus: 0,
            awToModel: '',
            awHbCode: '',
            awAcquisitionRangeMax: '',
            awAcquisitionRangeMin: '',
            awRealRangeMax: 1,
            awRealRangeMin: '',
            awCriticalValue: '',
            awLoadCoefficient: 1,
            awAir: '',
            afStatus: 0,
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

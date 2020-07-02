<template>
  <div class="app-container">
    <div>
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择" clearable @change="changeCom">
        <el-option
          v-for="item in comList"
          :key="item.value"
          :label="item.label"
          :value="item.label"
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
      <!-- <el-table-column label="行业类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.busName }}
          <el-select-tree
            v-model="scope.row.busName"
            width="120px"
            placeholder="请选择内容"
            :data="treeData"
            :disabled-values="disabledValues"
          />
        </template>
      </el-table-column> -->
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
      width="70%"
      :before-close="handleClose"
    >
      <el-form ref="addCompanyForm" :model="companyForm" :rules="rules" label-width="180px">
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
            <el-form-item label="是否停限产">
              <el-select v-model="companyForm.isSuspend">
                <el-option v-for="(isitem,index) in isList" :key="'xxxx1'+index" :label="isitem.label" :value="isitem.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否测试数据">
              <el-select v-model="companyForm.isTest">
                <el-option v-for="(isitem,index) in isList" :key="'xxxx2'+index" :label="isitem.label" :value="isitem.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业类型" prop="busName">
              <el-select-tree
                v-model="companyForm.busName"
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

          <el-col :span="24">
            <el-form-item label="短信报警通知人及电话号码">
              <el-row v-for="(item,index) in companyForm.sysSmsPersons" :key="'xxx'+index" style="text-align: center;margin-bottom:10px">
                <el-col :span="4">短信报警通知人</el-col>
                <el-col :span="6">
                  <el-input v-model="item.smsPerson" />
                </el-col>
                <el-col :span="2">电话号码</el-col>
                <el-col :span="4">
                  <el-input v-model="item.smsPersonTel" />
                </el-col>
                <el-col :span="2">备注</el-col>
                <el-col :span="4">
                  <el-input v-model="item.remark" />
                </el-col>
                <el-col :span="2">  <el-button type="danger" icon="el-icon-delete" circle size="small" @click="removeMessageList(index,item)" /></el-col>
              </el-row>
              <div style="text-align: center;margin-bottom:10px">
                <el-button type="success" icon="el-icon-plus" circle size="small" @click="addMessageList" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上传企业图片">

              <el-button v-show="companyForm.comImage==''" type="primary" @click="toggleShow">上传<i class="el-icon-upload el-icon--right" /></el-button>
              <div v-if="companyForm.comImage!=''" class="imgBox">
                <i class="el-icon-close innerImgClose" @click="delPic" />
                <img :src="companyForm.comImage" style="box-shadow: 1px 1px 4px rgba(0,0,0,0.4);">
              </div>

              <my-upload
                v-model="show"
                field="file"
                :width="500"
                :height="300"
                url="http://47.96.147.99:8081/hbjk/addPicture"
                :params="params"
                :headers="headers"
                img-format="png"
                :lang-ext="langExt"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
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
import { findData, selectAllCom, addCom, deleteCom, updateCom, deleteSmsPerson, deletePicture } from '@/api/table'
import { getToken } from '@/utils/auth'
import hyType from '@/utils/type.json'
import ElSelectTree from 'el-select-tree'
import myUpload from 'vue-image-crop-upload'
export default {
  name: 'Company',
  components: {
    ElSelectTree,
    myUpload
  },
  data() {
    var moblie = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      params: {

      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: '',
      langExt: {
        hint: '点击，或拖动图片至此处',
        loading: '正在上传……',
        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
        success: '上传成功',
        fail: '图片上传失败',
        preview: '图片预览',
        btn: {
          off: '取消',
          close: '关闭',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '仅限图片格式',
          outOfSize: '单文件大小不能超过 ',
          lowestPx: '图片最低像素为（宽*高）：'
        }
      },
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
        smsStatus: false,
        sysSmsPersons: [{
          smsPerson: '',
          smsPersonTel: '',
          remark: ''
        }]
      },
      temp: {},
      rules: {
        comName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        comShortName: [
          { required: true, message: '请输入企业简称', trigger: 'blur' }
        ],
        adress: [
          { required: true, message: '请输入企业地址', trigger: 'blur' }
        ],
        lonLat: [
          { required: true, message: '请输入经纬度', trigger: 'blur' }
        ],
        comAreaCode: [
          { required: true, message: '请输入企业所属行政区', trigger: 'blur' }
        ],
        socialCreditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        envPerson: [
          { required: true, message: '请输入环保负责人', trigger: 'blur' }
        ],
        envPersonTel: [
          { required: true, validator: moblie, trigger: 'blur' }
        ],
        busName: '',
        smsStatus: ''
      },
      treeData: [

      ],
      disabledValues: []
    }
  },

  mounted() {
    // console.log(hyType)
    this.findData()
    this.selectAllCom()
    // findSysBus().then(res => {
    this.treeData = hyType
    // })
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    // 删除图片
    delPic() {
      const str = this.companyForm.comImage
      deletePicture({
        'fileName': str.substr(str.lastIndexOf('/') + 1) // 截取文件名
      }).then(res => {
        this.companyForm.comImage = ''
        this.$message({
          type: 'success',
          message: '图片删除'
        })
      })
    },
    /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      // this.imgDataUrl = imgDataUrl
    },
    /**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData.retData)
      this.companyForm.comImage = jsonData.retData
      // console.log('field: ' + field)
    },
    /**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    selectAllCom() {
      // this.loadable = true
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
      this.lineTitle = '新增企业'
      this.companyForm = {
        comName: '',
        isSuspend: false,
        isTest: false,
        comShortName: '',
        adress: '',
        lonLat: '',
        comAreaCode: '',
        socialCreditCode: '',
        envPerson: '',
        envPersonTel: '',
        busName: '',
        smsStatus: false,
        sysSmsPersons: [{
          smsPerson: '',
          smsPersonTel: '',
          remark: ''
        }],
        comImage: ''
      }
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
      this.$refs['addCompanyForm'].validate((valid) => {
        if (valid) {
          addCom(this.companyForm).then(res => {
            if (res.retCode === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.selectAllCom()
              this.addVisible = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(index, item) {
      console.log(index, item)
      this.addVisible = true
      this.lineTitle = '编辑企业信息'
      this.showUpdata = true
      this.companyForm = {
        id: item.id,
        comName: item.comName,
        isSuspend: item.isSuspend,
        isTest: item.isTest,
        comShortName: item.comShortName,
        adress: item.adress,
        lonLat: item.lonLat,
        comAreaCode: item.comAreaCode,
        socialCreditCode: item.socialCreditCode,
        envPerson: item.envPerson,
        envPersonTel: item.envPersonTel,
        busName: item.busName,
        smsStatus: item.smsStatus,
        sysSmsPersons: item.sysSmsPersons,
        comImage: item.comImage
      }
    },
    handleDelete(index, item) {
      this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCom({ id: item.id }).then(res => {
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
      updateCom(this.companyForm).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.addVisible = false
        this.selectAllCom()
      })
    },
    addMessageList() {
      if (this.companyForm.sysSmsPersons.length >= 3) {
        this.$message({ type: 'info', message: '最多添加3个' })
        return
      }
      this.companyForm.sysSmsPersons.push({
        smsPerson: '',
        smsPersonTel: ''
      })
    },
    removeMessageList(index, item) {
      if (this.companyForm.sysSmsPersons.length === 1) {
        this.$message({ type: 'info', message: '短信联系最少一个' })
        return
      }
      this.companyForm.sysSmsPersons.splice(index, 1)
      console.log(item)
      if (item.id) {
        deleteSmsPerson({
          id: item.id
        }).then(res => {
          this.$message({ type: 'success', message: '已从服务器中删除' })
        })
      }
    },
    handleClose() {
      this.addVisible = false
      this.selectAllCom()
    }

  }
}
</script>
<style lang="scss" scoped>
.app-container {
    padding: 20px;
}
.imgBox{
  position: relative;
  display: inline-block;
}
.innerImgClose{
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 26px;
}
</style>

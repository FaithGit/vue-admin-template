<template>
  <div class="app-container">
    <div class="form-head">工况采集仪信息配置</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item label="MN号" prop="MN">
        <el-input v-model="form.MN" placeholder="17位数字不能为空" />
      </el-form-item>
      <!-- ######### 设备信息 表单块######### -->
      <div class="form-box">
        <div class="form-box-head">设备信息</div>
        <el-row :gutter="10" class="form-box-comp">
          <el-col v-for="(item,index) in form.device_info" :key="item.com_id" :span="24">
            <el-col :span="1" class="xuhao">{{ index +1 }}</el-col>
            <el-col :span="6">
              <el-form-item label="企业名称" :prop="`device_info[${index}].com_id`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                <el-select v-model="item.com_id" placeholder="请选择企业名称" style="width:100%">
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备名称" :prop="`device_info[${index}].device_name`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                <el-input v-model.trim="item.device_name" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="电表模块编号" :prop="`device_info[${index}].region`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                <el-select v-model="item.region" placeholder="请选择电表模块编号">
                  <el-option v-for="(length,_index) in form.device_info" :key="'length'+_index" :label="_index+1" :value="_index+1" />

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="设备类别" :prop="`device_info[${index}].device_style`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                <el-select v-model="item.device_style" placeholder="请选择设备类别">
                  <el-option label="生产" value="1" />
                  <el-option label="治理" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="xuhao">
              <el-button type="danger" icon="el-icon-delete" circle />
            </el-col>
          </el-col>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle />
          </div>
        </el-row>
      </div>

      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 检测MN
    var checkMN = (rule, value, callback) => {
      var reg = new RegExp('^[0-9]*$') // 纯数字
      console.log(reg.test(value))
      if (!(value.length === 17)) {
        return callback(new Error('请输入17位数字'))
      } else if (!reg.test(value)) {
        console.log(reg.test(value))
        return callback(new Error('不能包含字符串'))
      } else {
        callback()
      }
    }

    return {
      form: {
        MN: '',
        device_info: [
          { com_id: '', device_name: '', meter_num: '', device_style: '' },
          { com_id: '1', device_name: '', meter_num: '', device_style: '' }
        ],
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        MN: [{ validator: checkMN, required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.form-head {
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
}
.form-box {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.form-box-head {
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 20px 20px 20px;
  padding: 10px 5px;
}
.form-box-comp {
  padding: 0 20px;
}
.xuhao {
  line-height: 40px;
  padding: 0 12px 0 0;
  text-align: center;
}
</style>


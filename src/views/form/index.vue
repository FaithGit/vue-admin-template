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
          <el-col v-for="(item,index) in form.device_info" :key="'device_info'+index" :span="24">
            <el-col :span="1" class="xuhao" style="  border-left: 4px solid #ff8800;">{{ index +1 }}</el-col>
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
              <el-button type="danger" icon="el-icon-delete" circle @click="DelDeviceList(index)" />
            </el-col>
          </el-col>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle @click="addDeviceList" />
          </div>
        </el-row>
      </div>
      <!-- ######### 设备信息 表单块######### -->
      <div class="form-box">
        <div class="form-box-head">工况信息</div>
        <el-row :gutter="10" class="form-box-comp" style="padding:0 60px">
          <el-col v-for="(work,workindex) in form.work_info" :key="'work'+workindex" :span="24" class="card">
            <div class="card-close">
              <i class="el-icon-close" />
            </div>
            <el-row>
              <el-col :span="5" :offset="19">
                <el-form-item label="工况模块编号" label-width="124px">
                  <el-select v-model="work.model_num" placeholder="请选择对应电表模块编号" style="width:80%">
                    <el-option v-for="(length,_index) in form.work_info" :key="'lengthModel'+_index" :label="_index+1" :value="_index+1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="card-title">
              开关量1
            </div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="启用状态" :prop="`work_info[${index}].OO_status`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                    <el-select v-model.number="work.switch1.OO_status" placeholder="请选择启用状态">
                      <el-option v-for="_i in optionSwitch" :key="'optionSwitch'+_i.value" :label="_i.label" :value="_i.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="对应电表模块编号" label-width="124px" :prop="`work_info[${index}].OO_to_model`" :rules="{ required: true, message: 'Required', trigger: 'blur' }">
                    <el-select v-model="work.OO_to_model" placeholder="请选择对应电表模块编号">
                      <el-option v-for="(length,_index) in form.device_info" :key="'lengthDui'+_index" :label="_index+1" :value="_index+1" />

                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="检测因子">
                    <el-select v-model="form.MN" placeholder="请选择设备类别">
                      <el-option label="生产" value="1" />
                      <el-option label="治理" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-row>
      </div>
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
          { com_id: '', device_name: '', meter_num: '', device_style: '' }
        ],
        work_info: [
          {
            model_num: 1,
            switch1: {
              OO_status: 0,
              OO_to_model: '',
              OO_hb_code: ''
            },
            switch2: {
              OO_status: 0,
              OO_to_model: '',
              OO_hb_code: ''
            },
            switch3: {
              OO_status: 0,
              OO_to_model: '',
              OO_hb_code: ''
            },
            switch4: {
              OO_status: 0,
              OO_to_model: '',
              OO_hb_code: ''
            },
            simulation1: {
              AO_status: 0,
              AO_to_model: '',
              AO_hb_code: '',
              AO_acquisition_range_min: '',
              AO_acquisition_range_max: '',
              AO_real_range_min: '',
              AO_real_range_max: '',
              AO_critical_value: '',
              AO_load_coefficient: '',
              AO_air: ''
            },
            simulation2: {
              AO_status: 0,
              AO_to_model: '',
              AO_hb_code: '',
              AO_acquisition_range_min: '',
              AO_acquisition_range_max: '',
              AO_real_range_min: '',
              AO_real_range_max: '',
              AO_critical_value: '',
              AO_load_coefficient: '',
              AO_air: ''
            },
            simulation3: {
              AO_status: 0,
              AO_to_model: '',
              AO_hb_code: '',
              AO_acquisition_range_min: '',
              AO_acquisition_range_max: '',
              AO_real_range_min: '',
              AO_real_range_max: '',
              AO_critical_value: '',
              AO_load_coefficient: '',
              AO_air: ''
            }
          }
        ]
      },
      rules: {
        MN: [{ validator: checkMN, required: true, trigger: 'blur' }]
      },
      optionSwitch: [{
        value: 1,
        label: '开启'
      }, {
        value: 0,
        label: '关闭'
      }]
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
    },
    addDeviceList() {
      const _obj = { com_id: '', device_name: '', meter_num: '', device_style: '' }
      this.form.device_info.push(_obj)
    },
    DelDeviceList(index) {
      this.form.device_info.splice(index, 1)
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
  margin-bottom: 25px;
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
.card{
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
.card-close{
  font-size: 24px;
  text-align: right;
  margin: 5px 5px 0 0;
}
.card-number{
  font-size: 18px;
  width: 160px;
  border-bottom: 1px solid black;
  display: inline-block;
  text-align: center;
  margin-right: 20px;

}
.card-title{
    width: 120px;
    background: rgb(255, 136, 0);
    text-align: center;
    font-size: 16px;
    padding: 5px;
    margin: 5px 15px ;
}
.card-content{
  margin: 0 5px;
}

</style>


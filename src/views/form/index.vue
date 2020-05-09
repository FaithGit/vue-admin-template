<template>
  <div class="app-container">
    <div class="form-head">工况采集仪信息配置</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-row>
        <el-col :span="12">
          <el-form-item label="mn号" prop="mn" label-width="60px">
            <el-input v-model="form.mn" placeholder="17位数字不能为空" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业名称" prop="comId">
            <el-select v-model="form.comId" placeholder="请选择企业名称" style="width:100%">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ######### 设备信息 表单块######### -->
      <div class="form-box">
        <div class="form-box-head">设备信息</div>
        <el-row :gutter="10" class="form-box-comp">
          <el-col v-for="(item,index) in form.sysDevices" :key="'sysDevices'+index" :span="24">
            <el-col :span="1" class="xuhao" style="  border-left: 4px solid #ff8800;">{{ index +1 }}</el-col>
            <el-col :span="12">
              <el-form-item
                :key="'deviceName'+index"
                label-width="80px"
                label="设备名称"
                :prop="`sysDevices[${index}].deviceName`"
                :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
              >
                <el-input v-model.trim="item.deviceName" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                :key="'region'+index"
                label="电表模块编号"
                :prop="`sysDevices[${index}].region`"
                :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
              >
                <el-select v-model="item.region" placeholder="请选择电表模块编号">
                  <el-option
                    v-for="(length,_index) in form.sysDevices"
                    :key="'length'+_index"
                    :label="_index+1"
                    :value="_index+1"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                :key="'deviceStyle'+index"
                label="设备类别"
                :prop="`sysDevices[${index}].deviceStyle`"
                :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
              >
                <el-select v-model="item.deviceStyle" placeholder="请选择设备类别">
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
          <el-col
            v-for="(work,workindex) in form.sysConditions"
            :key="'work'+workindex"
            :span="24"
            class="card"
          >
            <div class="card-close">
              <i class="el-icon-close" />
            </div>
            <el-row>
              <el-col :span="5" :offset="19">
                <el-form-item
                  label="工况模块编号"
                  label-width="124px"
                  :prop="`sysConditions[${workindex}].modelNum`"
                  :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                >
                  <el-select v-model="work.modelNum" placeholder="请选择对应电表模块编号" style="width:80%">
                    <el-option
                      v-for="(length,_index) in form.sysConditions"
                      :key="'lengthModel'+_index"
                      :label="_index+1"
                      :value="_index+1"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="card-title">开关量1</div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="启用状态"
                    :prop="`sysConditions[${workindex}].ooStatus`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select
                      v-model.number="work.ooStatus"
                      placeholder="请选择启用状态"
                      @change="changeWorkStatus($event,workindex)"
                    >
                      <el-option
                        v-for="_i in optionSwitch"
                        :key="'optionSwitch'+_i.value"
                        :label="_i.label"
                        :value="_i.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel`"
                    label="对应电表模块编号"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].ooToMode`"
                    :rules="work.ooStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.ooToMode " clearable placeholder="请选择对应电表模块编号">
                      <el-option
                        v-for="(length,_index) in form.sysDevices"
                        :key="'lengthDui'+_index"
                        :label="_index+1"
                        :value="_index+1"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workcode`"
                    label="监测因子"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].ooHbCode`"
                    :rules="work.ooStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.ooHbCode" clearable placeholder="请选择对应监测因子">
                      <el-option
                        v-for="(hbcode,hbcodeIndex) in hb_code_list"
                        :key="'hb_code_list'+hbcodeIndex"
                        :label="hbcode.label"
                        :value="hbcode.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="card-title">开关量2</div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="启用状态"
                    :prop="`sysConditions[${workindex}].otStatus`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select
                      v-model.number="work.otStatus"
                      placeholder="请选择启用状态"
                      @change="changeWorkStatus($event,workindex)"
                    >
                      <el-option
                        v-for="_i in optionSwitch"
                        :key="'optionSwitch'+_i.value"
                        :label="_i.label"
                        :value="_i.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel`"
                    label="对应电表模块编号"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].otToMode`"
                    :rules="work.otStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.otToMode " clearable placeholder="请选择对应电表模块编号">
                      <el-option
                        v-for="(length,_index) in form.sysDevices"
                        :key="'lengthDui'+_index"
                        :label="_index+1"
                        :value="_index+1"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workcode`"
                    label="监测因子"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].otHbCode`"
                    :rules="work.otStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.otHbCode" clearable placeholder="请选择对应监测因子">
                      <el-option
                        v-for="(hbcode,hbcodeIndex) in hb_code_list"
                        :key="'hb_code_list'+hbcodeIndex"
                        :label="hbcode.label"
                        :value="hbcode.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="card-title">开关量3</div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="启用状态"
                    :prop="`sysConditions[${workindex}].owStatus`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select
                      v-model.number="work.owStatus"
                      placeholder="请选择启用状态"
                      @change="changeWorkStatus($event,workindex)"
                    >
                      <el-option
                        v-for="_i in optionSwitch"
                        :key="'optionSwitch'+_i.value"
                        :label="_i.label"
                        :value="_i.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel`"
                    label="对应电表模块编号"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].owToMode`"
                    :rules="work.owStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.owToMode " clearable placeholder="请选择对应电表模块编号">
                      <el-option
                        v-for="(length,_index) in form.sysDevices"
                        :key="'lengthDui'+_index"
                        :label="_index+1"
                        :value="_index+1"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workcode`"
                    label="监测因子"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].owHbCode`"
                    :rules="work.owStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.owHbCode" clearable placeholder="请选择对应监测因子">
                      <el-option
                        v-for="(hbcode,hbcodeIndex) in hb_code_list"
                        :key="'hb_code_list'+hbcodeIndex"
                        :label="hbcode.label"
                        :value="hbcode.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="card-title">开关量4</div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="启用状态"
                    :prop="`sysConditions[${workindex}].ofStatus`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select
                      v-model.number="work.ofStatus"
                      placeholder="请选择启用状态"
                      @change="changeWorkStatus($event,workindex)"
                    >
                      <el-option
                        v-for="_i in optionSwitch"
                        :key="'optionSwitch'+_i.value"
                        :label="_i.label"
                        :value="_i.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel`"
                    label="对应电表模块编号"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].ofToMode`"
                    :rules="work.ofStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.ofToMode " clearable placeholder="请选择对应电表模块编号">
                      <el-option
                        v-for="(length,_index) in form.sysDevices"
                        :key="'lengthDui'+_index"
                        :label="_index+1"
                        :value="_index+1"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workcode`"
                    label="监测因子"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].ofHbCode`"
                    :rules="work.ofStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.ofHbCode" clearable placeholder="请选择对应监测因子">
                      <el-option
                        v-for="(hbcode,hbcodeIndex) in hb_code_list"
                        :key="'hb_code_list'+hbcodeIndex"
                        :label="hbcode.label"
                        :value="hbcode.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="card-title">模拟量1</div>
            <div class="card-content">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="启用状态"
                    :prop="`sysConditions[${workindex}].aoStatus`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select
                      v-model.number="work.aoStatus"
                      placeholder="请选择启用状态"
                      @change="changeWorkStatus($event,workindex)"
                    >
                      <el-option
                        v-for="_i in optionSwitch"
                        :key="'optionSwitch'+_i.value"
                        :label="_i.label"
                        :value="_i.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel2`"
                    label="对应电表模块编号"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoToModel`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.aoToModel" clearable placeholder="请选择对应电表模块编号">
                      <el-option
                        v-for="(length,_index) in form.sysDevices"
                        :key="'lengthDui'+_index"
                        :label="_index+1"
                        :value="_index+1"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="监测因子"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoHbCode`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-select v-model="work.aoHbCode" clearable placeholder="请选择对应监测因子">
                      <el-option
                        v-for="(hbcode,hbcodeIndex) in hb_code_list"
                        :key="'hb_code_list'+hbcodeIndex"
                        :label="hbcode.label"
                        :value="hbcode.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="电气量程低"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoAcquisitionRangeMin`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoAcquisitionRangeMin" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="电气量程高"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoAcquisitionRangeMax`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoAcquisitionRangeMax" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="监测量程低"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoRealRangeMin`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoRealRangeMin" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="监测量程高"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoRealRangeMax`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoRealRangeMax" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="临界值"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoCriticalValue`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoCriticalValue" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="负荷系数"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoLoadCoefficient`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoLoadCoefficient" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :ref="`${workindex}workmodel3`"
                    label="风量"
                    label-width="134px"
                    :prop="`sysConditions[${workindex}].aoAir`"
                    :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                  >
                    <el-input-number v-model.number="work.aoAir" />
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
    // 检测mn
    var checkmn = (rule, value, callback) => {
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
        mn: '',
        comId: '',
        sysDevices: [{ deviceName: '', modelName: '', deviceStyle: '' }],
        sysConditions: [
          {
            modelNum: '',
            ooStatus: 0,
            ooToModel: '',
            ooHbCode: '',
            otStatus: 1,
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
            aoRealRangeMax: '',
            aoRealRangeMin: '',
            aoCriticalValue: '',
            aoLoadCoefficient: 1,
            aoAir: '',
            atStatus: 0,
            atToModel: '',
            atHbCode: '',
            atAcquisitionRangeMax: '',
            atAcquisitionRangeMin: '',
            atRealRangeMax: '',
            atRealRangeMin: '',
            atCriticalValue: '',
            atLoadCoefficient: 1,
            atAir: '',
            awStatus: 0,
            awToModel: '',
            awHbCode: '',
            awAcquisitionRangeMax: '',
            awAcquisitionRangeMin: '',
            awRealRangeMax: '',
            awRealRangeMin: '',
            awCriticalValue: '',
            awLoadCoefficient: 1,
            awAir: ''
          }
        ]
      },
      rules: {
        mn: [{ validator: checkmn, required: true, trigger: 'blur' }],
        comId: [{ required: true, trigger: 'blur' }]
      },
      requiredRules: {
        required: true,
        message: '此为必填项',
        trigger: ['blur', 'change']
      },
      NorequiredRules: {
        required: false,
        message: '此为必填项',
        trigger: ['blur', 'change']
      },
      optionSwitch: [
        {
          value: 1,
          label: '开启'
        },
        {
          value: 0,
          label: '关闭'
        }
      ],
      hb_code_list: [
        {
          value: 1,
          label: '生产'
        },
        {
          value: 2,
          label: '治理'
        }
      ]
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
      const _obj = {
        comId: '',
        deviceName: '',
        modelName: '',
        deviceStyle: ''
      }
      this.form.sysDevices.push(_obj)
    },
    DelDeviceList(index) {
      this.form.sysDevices.splice(index, 1)
      this.$forceUpdate()
    },
    changeWorkStatus($event, workindex) {
      const getRef1 = workindex + 'workmodel'
      const getRef2 = workindex + 'workcode'

      console.log($event)
      console.log(workindex)
      this.$refs[getRef1][0].clearValidate()
      this.$refs[getRef2][0].clearValidate()
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
  margin-bottom: 30px;
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
.card {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}
.card-close {
  font-size: 24px;
  text-align: right;
  margin: 5px 5px 0 0;
}
.card-number {
  font-size: 18px;
  width: 160px;
  border-bottom: 1px solid black;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
}
.card-title {
  width: 120px;
  background: rgb(255, 136, 0);
  text-align: center;
  font-size: 16px;
  padding: 5px;
  margin: 5px 15px;
}
.card-content {
  margin: 0 5px;
}
</style>


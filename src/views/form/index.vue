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
              <el-option v-for="com in com_list" :key="com.id" :label="com.com_name" :value="com.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ######### 设备信息 表单块######### -->
      <div class="form-box">
        <div class="form-box-head">设备信息</div>
        <el-row :gutter="10" class="form-box-comp">
          <div v-show="!form.sysDevices.length>0" style="text-align:center">
            <img src="@img/none.png" style="width:150px;margin:10px">
          </div>

          <transition-group
            enter-active-class="animate__fadeInDown"
            leave-active-class="animate__fadeOutUp animate__faster "
          >
            <el-col v-for="(item,index) in form.sysDevices" :key="'sysDevices'+index" :span="24" class="animate__animated ">
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
                  :key="'modelNum'+index"
                  label="电表模块编号"
                  :prop="`sysDevices[${index}].modelNum`"
                  :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                >
                  <el-select v-model="item.modelNum" placeholder="请选择电表模块编号" clearable @change="changeListDisable" @clear="clearListDisable">
                    <el-option
                      v-for="(length,_index) in form.sysDevices"
                      :key="'length'+_index"
                      :label="_index+1"
                      :value="_index+1"
                      :disabled="length.listDisabled==1"
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
                    <el-option v-for="(decice,deciceIndex) in deviceStyle_list" :key="'device'+deciceIndex" :label="decice.label" :value="decice.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="xuhao">
                <el-button type="danger" icon="el-icon-delete" circle @click="DelDeviceList(index)" />
              </el-col>
            </el-col>
          </transition-group>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle @click="addDeviceList" />
          </div>
        </el-row>
      </div>
      <!-- ######### 设备信息 表单块######### -->
      <div class="form-box">
        <div class="form-box-head">工况信息</div>
        <el-row :gutter="10" class="form-box-comp" style="padding:0 60px">
          <div v-show="!form.sysConditions.length>0" style="text-align:center">
            <img src="@img/none.png" style="width:150px;margin:10px">
          </div>
          <transition-group
            enter-active-class="animate__fadeInDown"
            leave-active-class="animate__fadeOutUp animate__faster "
          >
            <el-col
              v-for="(work,workindex) in form.sysConditions"
              :key="'work'+workindex"
              :span="24"
              class="card animate__animated"
            >
              <div class="card-close" @click="DelModelList(workindex)">
                <i class="el-icon-close" />
              </div>
              <el-row>
                <el-col :span="6" :offset="18">
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
                        @change="changeWorkStatus(workindex,'ooStatus1','ooStatus2')"
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
                      :ref="`${workindex}ooStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].ooToModel`"
                      :rules="work.ooStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.ooToModel " clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}ooStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].ooHbCode`"
                      :rules="work.ooStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.ooHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
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
                        @change="changeWorkStatus(workindex,'otStatus1','otStatus2')"
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
                      :ref="`${workindex}otStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].otToModel`"
                      :rules="work.otStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.otToModel " clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}otStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].otHbCode`"
                      :rules="work.otStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.otHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
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
                        @change="changeWorkStatus(workindex,'owStatus1','owStatus2')"
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
                      :ref="`${workindex}owStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].owToModel`"
                      :rules="work.owStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.owToModel " clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}owStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].owHbCode`"
                      :rules="work.owStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.owHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
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
                        @change="changeWorkStatus(workindex,'ofStatus1','ofStatus2')"
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
                      :ref="`${workindex}ofStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].ofToModel`"
                      :rules="work.ofStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.ofToModel " clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}ofStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].ofHbCode`"
                      :rules="work.ofStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.ofHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
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
                        @change="changeWorkStatus(workindex,'aoStatus1','aoStatus2')"
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
                      :ref="`${workindex}aoStatus1`"
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
                      :ref="`${workindex}aoStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].aoHbCode`"
                      :rules="work.aoStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.aoHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
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
              <div class="card-title">模拟量2</div>
              <div class="card-content">
                <el-row>
                  <el-col :span="6">
                    <el-form-item
                      label="启用状态"
                      :prop="`sysConditions[${workindex}].atStatus`"
                      :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                    >
                      <el-select
                        v-model.number="work.atStatus"
                        placeholder="请选择启用状态"
                        @change="changeWorkStatus(workindex,'atStatus1','atStatus2')"
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
                      :ref="`${workindex}atStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atToModel`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.atToModel" clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}atStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atHbCode`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.atHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atAcquisitionRangeMin`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atAcquisitionRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atAcquisitionRangeMax`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atAcquisitionRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atRealRangeMin`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atRealRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atRealRangeMax`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atRealRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="临界值"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atCriticalValue`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atCriticalValue" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="负荷系数"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atLoadCoefficient`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atLoadCoefficient" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="风量"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].atAir`"
                      :rules="work.atStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.atAir" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="card-title">模拟量3</div>
              <div class="card-content">
                <el-row>
                  <el-col :span="6">
                    <el-form-item
                      label="启用状态"
                      :prop="`sysConditions[${workindex}].awStatus`"
                      :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                    >
                      <el-select
                        v-model.number="work.awStatus"
                        placeholder="请选择启用状态"
                        @change="changeWorkStatus(workindex,'awStatus1','awStatus2')"
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
                      :ref="`${workindex}awStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awToModel`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.awToModel" clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}awStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awHbCode`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.awHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awAcquisitionRangeMin`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awAcquisitionRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awAcquisitionRangeMax`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awAcquisitionRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awRealRangeMin`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awRealRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awRealRangeMax`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awRealRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="临界值"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awCriticalValue`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awCriticalValue" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="负荷系数"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awLoadCoefficient`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awLoadCoefficient" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="风量"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].awAir`"
                      :rules="work.awStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.awAir" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="card-title">模拟量4</div>
              <div class="card-content">
                <el-row>
                  <el-col :span="6">
                    <el-form-item
                      label="启用状态"
                      :prop="`sysConditions[${workindex}].afStatus`"
                      :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                    >
                      <el-select
                        v-model.number="work.afStatus"
                        placeholder="请选择启用状态"
                        @change="changeWorkStatus(workindex,'afStatus1','afStatus2')"
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
                      :ref="`${workindex}afStatus1`"
                      label="对应电表模块编号"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afToModel`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.afToModel" clearable placeholder="请选择对应电表模块编号">
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
                      :ref="`${workindex}afStatus2`"
                      label="监测因子"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afHbCode`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-select v-model="work.afHbCode" clearable placeholder="请选择对应监测因子">
                        <el-option
                          v-for="(hbcode,hbcodeIndex) in hb_code_list"
                          :key="'hb_code_list'+hbcodeIndex"
                          :label="hbcode.codeName"
                          :value="hbcode.hbCode"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afAcquisitionRangeMin`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afAcquisitionRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="电气量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afAcquisitionRangeMax`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afAcquisitionRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程低"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afRealRangeMin`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afRealRangeMin" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="监测量程高"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afRealRangeMax`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afRealRangeMax" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="临界值"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afCriticalValue`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afCriticalValue" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="负荷系数"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afLoadCoefficient`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afLoadCoefficient" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      :ref="`${workindex}workmodel3`"
                      label="风量"
                      label-width="134px"
                      :prop="`sysConditions[${workindex}].afAir`"
                      :rules="work.afStatus!=0? requiredRules: NorequiredRules"
                    >
                      <el-input-number v-model.number="work.afAir" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </transition-group>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle @click="addModelList" />
          </div>
        </el-row>
      </div>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findAllCom, findAllCode, testJson } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Form',
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
        sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '' }],
        sysConditions: [
          {
            modelNum: 1,
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
            aoAcquisitionRangeMax: 1,
            aoAcquisitionRangeMin: '',
            aoRealRangeMax: 1,
            aoRealRangeMin: '',
            aoCriticalValue: '',
            aoLoadCoefficient: 1,
            aoAir: '',
            atStatus: 0,
            atToModel: '',
            atHbCode: '',
            atAcquisitionRangeMax: 1,
            atAcquisitionRangeMin: '',
            atRealRangeMax: 1,
            atRealRangeMin: '',
            atCriticalValue: '',
            atLoadCoefficient: 1,
            atAir: '',
            awStatus: 0,
            awToModel: '',
            awHbCode: '',
            awAcquisitionRangeMax: 1,
            awAcquisitionRangeMin: '',
            awRealRangeMax: 1,
            awRealRangeMin: '',
            awCriticalValue: '',
            awLoadCoefficient: 1,
            awAir: '',
            afStatus: 0,
            afToModel: '',
            afHbCode: '',
            afAcquisitionRangeMax: 1,
            afAcquisitionRangeMin: '',
            afRealRangeMax: 1,
            afRealRangeMin: '',
            afCriticalValue: '',
            afLoadCoefficient: 1,
            afAir: ''
          }
        ]
      },
      rules: {
        mn: [{ validator: checkmn, required: true, trigger: 'blur' }],
        comId: [{ required: true, trigger: 'blur', message: '此为必填项' }]
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
      ],
      deviceStyle_list: [
        {
          value: 1,
          label: '生产'
        },
        {
          value: 2,
          label: '治理'
        }
      ],
      com_list: []
    }
  },
  mounted() {
    findAllCom({
      token: getToken()
    }).then(res => {
      this.com_list = res.retData
    }).catch(res => {

    })
    findAllCode({}).then(res => {
      this.hb_code_list = res.retData
    }).catch(res => {
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('submit!')
          testJson(this.form).then(res => {
            this.$notify({
              title: '成功',
              message: res.retMsg,
              type: 'success'
            })
            console.log(res)
          })
        } else {
          // console.log('error submit!!')
          this.$notify.error({
            title: '错误',
            message: '请检查无错误项后再次提交'
          })
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: '重置成功!',
        type: 'success'
      })
      this.form = {
        mn: '',
        comId: '',
        sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '' }],
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
      this.$refs.form.clearValidate()
    },
    addDeviceList() {
      const _obj = {
        comId: '',
        deviceName: '',
        modelNum: '',
        deviceStyle: '',
        listDisabled: ''
      }
      this.form.sysDevices.push(_obj)
    },
    addModelList() {
      const _obj = {
        modelNum: this.form.sysConditions.length + 1,
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
        aoAcquisitionRangeMax: 1,
        aoAcquisitionRangeMin: '',
        aoRealRangeMax: 1,
        aoRealRangeMin: '',
        aoCriticalValue: '',
        aoLoadCoefficient: 1,
        aoAir: '',
        atStatus: 0,
        atToModel: '',
        atHbCode: '',
        atAcquisitionRangeMax: 1,
        atAcquisitionRangeMin: '',
        atRealRangeMax: 1,
        atRealRangeMin: '',
        atCriticalValue: '',
        atLoadCoefficient: 1,
        atAir: '',
        awStatus: 0,
        awToModel: '',
        awHbCode: '',
        awAcquisitionRangeMax: 1,
        awAcquisitionRangeMin: '',
        awRealRangeMax: 1,
        awRealRangeMin: '',
        awCriticalValue: '',
        awLoadCoefficient: 1,
        awAir: '',
        afStatus: 0,
        afToModel: '',
        afHbCode: '',
        afAcquisitionRangeMax: 1,
        afAcquisitionRangeMin: '',
        afRealRangeMax: 1,
        afRealRangeMin: '',
        afCriticalValue: '',
        afLoadCoefficient: 1,
        afAir: ''
      }
      this.form.sysConditions.push(_obj)
    },
    DelDeviceList(index) {
      this.form.sysDevices.splice(index, 1)
      // this.$forceUpdate()
    },
    DelModelList(index) {
      this.form.sysConditions.splice(index, 1)
      // this.$forceUpdate()
    },
    changeWorkStatus(workindex, value1, value2) {
      const getRef1 = workindex + value1
      const getRef2 = workindex + value2
      this.$refs[getRef1][0].clearValidate()
      this.$refs[getRef2][0].clearValidate()
    },
    changeListDisable(val) {
      if (val != null && val !== '') {
        console.log(val)
        this.form.sysDevices[val - 1].listDisabled = 1
      } else {
        console.log('没有值')
      }
    },
    clearListDisable() {
      console.log(this.form.sysDevices)
      this.form.sysDevices.forEach((value) => {
        value.listDisabled = 0
      })
      for (var i = 0; i < this.form.sysDevices.length; i++) {
        if (this.form.sysDevices[i].modelNum !== '') {
          const temp = this.form.sysDevices[i].modelNum - 1
          this.form.sysDevices[temp].listDisabled = 1
        }
      }
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
  margin: 15px 15px 10px 0;
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
  background: #0292ff;
  color:white;
  text-align: center;
  font-size: 16px;
  padding: 5px;
  margin: 5px 15px;
}
.card-content {
  margin: 0 5px;
}
</style>


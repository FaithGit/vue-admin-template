<template>
  <div class="app-container">
    <div class="form-head">工况采集仪信息配置</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="mn号" prop="mn" label-width="60px">
            <el-input v-model="form.mn" placeholder="20位数字不能为空" :disabled="sprot==2" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业名称" prop="comId">
            <el-select v-model="form.comId" placeholder="请选择企业名称" style="width:100%" :disabled="sprot==2" @change="changeLine">
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
            <el-col v-for="(item,index) in form.sysDevices" :key="'sysDevices'+index" :span="24" class="animate__animated xuxuankuang">
              <el-col :span="1" class="xuhao" style="  border-left: 4px solid #ff8800;">{{ index +1 }}</el-col>
              <el-col :span="4">
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
              <el-col :span="4">
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
              <el-col :span="4">
                <el-form-item
                  :key="'deviceProcess'+index"
                  label-width="80px"
                  label="工艺类型"
                  :prop="`sysDevices[${index}].deviceProcess`"
                  :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
                >
                  <el-select v-if="item.deviceStyle == 1" v-model="item.deviceProcess" clearable placeholder="请选择对应生产工艺">
                    <el-option
                      v-for="(gy,gyIndex) in createList"
                      :key="'gy'+gyIndex"
                      :label="gy.label"
                      :value="gy.value"
                    />
                  </el-select>
                  <el-select v-else-if="item.deviceStyle == 2" v-model="item.deviceProcess" clearable placeholder="请选择对应治理工艺">
                    <el-option
                      v-for="(zl,zlIndex) in zlList"
                      :key="'zl'+zlIndex"
                      :label="zl.label"
                      :value="zl.value"
                    />
                  </el-select>
                  <el-select v-else v-model="item.deviceProcess" clearable placeholder="请选择设备类别" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  :key="'groupId'+index"
                  label-width="80px"
                  label="生产线"
                  :prop="`sysDevices[${index}].groupId`"
                  :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
                >
                  <el-select v-model="item.groupId" clearable placeholder="请选择生产线">
                    <el-option
                      v-for="(line,lineIndex) in createLine"
                      :key="'line'+lineIndex"
                      :label="line.group_name"
                      :value="line.group_id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2 " class="xuhao">
                <el-button type="danger" icon="el-icon-delete" circle @click="DelDeviceList(index)" />
              </el-col>
              <el-col :span="4" :offset="1">
                <el-form-item
                  :key="'isWar'+index"
                  label-width="80px"
                  label="是否异常"
                  :prop="`sysDevices[${index}].isWar`"
                  :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
                >
                  <el-select v-model="item.isWar" clearable placeholder="请选择是否异常">
                    <el-option
                      v-for="(war,warIndex) in isWarList"
                      :key="'war'+warIndex"
                      :label="war.label"
                      :value="war.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  :key="'deviceStatus'+index"
                  label-width="120px"
                  label="设备状态"
                  :prop="`sysDevices[${index}].deviceStatus`"
                  :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
                >
                  <el-select v-model="item.deviceStatus" clearable placeholder="请选择设备状态">
                    <el-option
                      v-for="(ds,dsIndex) in deviceStatusList"
                      :key="'ds'+dsIndex"
                      :label="ds.label"
                      :value="ds.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  :key="'isTest'+index"
                  label-width="120px"
                  label="测试数据"
                  :prop="`sysDevices[${index}].isTest`"
                  :rules="{ required: true, message: '此为必填项', trigger: 'blur' }"
                >
                  <el-select v-model="item.isTest" clearable placeholder="请选择是否测试数据">
                    <el-option
                      v-for="(ist,istIndex) in isTestList"
                      :key="'ist'+istIndex"
                      :label="ist.label"
                      :value="ist.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- <el-col v-if="sprot==2" :span="1" class="xuhao">
                <el-button type="danger" icon="el-icon-delete" circle @click="DelDeviceListCloud(item,index)" />
              </el-col> -->

              <!-- <el-col v-if="sprot==2" :span="1" class="xuhao">
                <el-button type="success" circle @click="saveOrUp(item,index)">
                  <svg-icon :icon-class="item.deviceId?'save':'up'" />
                </el-button>
              </el-col> -->
              <div class="xuxian" />
            </el-col>
          </transition-group>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle @click="addDeviceList" />
            <el-button type="success" circle @click="saveClick">
              <svg-icon icon-class="save" />
            </el-button>
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
            leave-active-class="animate__zoomOut  animate__faster "
          >
            <el-col
              v-for="(work,workindex) in form.sysConditions"
              :key="'work'+workindex"
              :span="24"
              class="card animate__animated"
            >
              <div class="card-close">
                <i class="el-icon-close" @click="DelModelList(workindex,work)" />
                <!-- <span v-if="sprot==2&&work.id" @click=" saveModelListCloud(workindex,work)">
                  <svg-icon icon-class="save" />
                </span>
                <span v-if="sprot==2&&!work.id" @click="addModelListCloud(workindex,work)">
                  <svg-icon icon-class="up" />
                </span> -->
              </div>
              <el-row>
                <el-col :span="6" :offset="18">
                  <el-form-item
                    label="工况模块编号"
                    label-width="124px"
                    :prop="`sysConditions[${workindex}].modelNum`"
                    :rules="{ required: true, message: '此为必填项', trigger: ['blur','change'] }"
                  >
                    <el-select v-model="work.modelNum" placeholder="请选择工况模块编号" style="width:80%">
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.ooToModel) }}</span>
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.otToModel) }}</span>
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.owToModel) }}</span>
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.ofToModel) }}</span>
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.aoToModel) }}</span>
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.atToModel) }}</span>

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
                      <el-input-number v-model.number="work.atAcquisitionRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.atAcquisitionRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.atRealRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.atRealRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.atCriticalValue" controls-position="right" />
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
                      <el-input-number v-model.number="work.atLoadCoefficient" controls-position="right" />
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
                      <el-input-number v-model.number="work.atAir" controls-position="right" />
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.awToModel) }}</span>

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
                      <el-input-number v-model.number="work.awAcquisitionRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.awAcquisitionRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.awRealRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.awRealRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.awCriticalValue" controls-position="right" />
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
                      <el-input-number v-model.number="work.awLoadCoefficient" controls-position="right" />
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
                      <el-input-number v-model.number="work.awAir" controls-position="right" />
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
                      <span :class="{smallTitle:deviceName(work.ooToModel)!='没有匹配项',smallTitlered:deviceName(work.ooToModel)=='没有匹配项'}">{{ deviceName(work.afToModel) }}</span>

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
                      <el-input-number v-model.number="work.afAcquisitionRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.afAcquisitionRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.afRealRangeMin" controls-position="right" />
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
                      <el-input-number v-model.number="work.afRealRangeMax" controls-position="right" />
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
                      <el-input-number v-model.number="work.afCriticalValue" controls-position="right" />
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
                      <el-input-number v-model.number="work.afLoadCoefficient" controls-position="right" />
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
                      <el-input-number v-model.number="work.afAir" controls-position="right" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </transition-group>
          <div style="text-align:center;margin-bottom:20px">
            <el-button type="success" icon="el-icon-plus" circle @click="addModelList" />
            <el-button type="success" circle @click="saveModeClick">
              <svg-icon icon-class="save" />
            </el-button>
          </div>

        </el-row>
      </div>
      <el-form-item v-if="sprot==1" style="text-align:center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <!-- <el-button @click="onCancel">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findAllCom, findAllCode, addBoard, findProncess, selectAllGroups, addSysCondition, updateSysCondition, updateAllDevice, updateAllCondition } from '@/api/table'
// import { findAllCom, findAllCode, addBoard, findProncess, selectAllGroups, deleteSysdevice, addSysdevice, updateByDeviceId, addSysCondition, deleteSysCondition, updateSysCondition } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Form',
  props: {
    form: {
      type: Object,
      required: true
    },
    sprot: {
      type: Number,
      required: true
    }
  },
  data() {
    // 检测mn
    var checkmn = (rule, value, callback) => {
      var reg = new RegExp('^[0-9]*$') // 纯数字
      // console.log(reg.test(value))
      if (!(value.length === 20)) {
        return callback(new Error('请输入20位数字'))
      } else if (!reg.test(value)) {
        console.log(reg.test(value))
        return callback(new Error('不能包含字符串'))
      } else {
        callback()
      }
    }
    return {
      // form: {
      //   mn: '',
      //   comId: '',
      //   sysDevices: [{ deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '', groupId: '', deviceProcess: '' }],
      //   sysConditions: [
      //     {
      //       modelNum: 1,
      //       ooStatus: false,
      //       ooToModel: '',
      //       ooHbCode: '',
      //       otStatus: false,
      //       otToModel: '',
      //       otHbCode: '',
      //       owStatus: false,
      //       owToModel: '',
      //       owHbCode: '',
      //       ofStatus: false,
      //       ofToModel: '',
      //       ofHbCode: '',
      //       aoStatus: false,
      //       aoToModel: '',
      //       aoHbCode: '',
      //       aoAcquisitionRangeMax: 1,
      //       aoAcquisitionRangeMin: '',
      //       aoRealRangeMax: 1,
      //       aoRealRangeMin: '',
      //       aoCriticalValue: '',
      //       aoLoadCoefficient: 1,
      //       aoAir: '',
      //       atStatus: false,
      //       atToModel: '',
      //       atHbCode: '',
      //       atAcquisitionRangeMax: 1,
      //       atAcquisitionRangeMin: '',
      //       atRealRangeMax: 1,
      //       atRealRangeMin: '',
      //       atCriticalValue: '',
      //       atLoadCoefficient: 1,
      //       atAir: '',
      //       awStatus: false,
      //       awToModel: '',
      //       awHbCode: '',
      //       awAcquisitionRangeMax: 1,
      //       awAcquisitionRangeMin: '',
      //       awRealRangeMax: 1,
      //       awRealRangeMin: '',
      //       awCriticalValue: '',
      //       awLoadCoefficient: 1,
      //       awAir: '',
      //       afStatus: false,
      //       afToModel: '',
      //       afHbCode: '',
      //       afAcquisitionRangeMax: 1,
      //       afAcquisitionRangeMin: '',
      //       afRealRangeMax: 1,
      //       afRealRangeMin: '',
      //       afCriticalValue: '',
      //       afLoadCoefficient: 1,
      //       afAir: ''
      //     }
      //   ]
      // },
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
          value: true,
          label: '开启'
        },
        {
          value: false,
          label: '关闭'
        }
      ],
      isWarList: [
        {
          value: true,
          label: '异常'
        },
        {
          value: false,
          label: '正常'
        }
      ],
      deviceStatusList: [
        {
          value: true,
          label: '使用中'
        },
        {
          value: false,
          label: '废用'
        }
      ],
      isTestList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      hb_code_list: [],
      deviceStyle_list: [
        {
          value: '1',
          label: '生产'
        },
        {
          value: '2',
          label: '治理'
        }
      ],
      com_list: [],
      createList: [], // 生产工艺类型
      zlList: [], // 治理工艺类型
      createLine: [] // 生产线
    }
  },
  watch: {
    'form.comId': function(val) {
      this.changeLine(val)
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
    findProncess({ deviceStyle: 1 }).then(res => {
      this.createList = res.retData
    })
    findProncess({ deviceStyle: 2 }).then(res => {
      this.zlList = res.retData
    })
    this.changeLine(this.form.comId)
  },
  methods: {
    saveClick() {
      // console.log(this.form.sysDevices)
      // console.log(this.form.mn)
      // console.log(this.form.comId)
      // console.log(this.form.sysDevices)
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('submit!')
          this.form.sysDevices.forEach((item, index) => {
            item.mn = this.form.mn
            item.comId = this.form.comId
          })
          updateAllDevice(this.form.sysDevices).then(res => {
            this.form.sysDevices = res.retData
            this.$message({
              type: 'success',
              message: res.retMsg
            })
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
      // updateAllDevice
    },
    saveModeClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('submit!')
          this.form.sysConditions.forEach((item, index) => {
            item.mn = this.form.mn
            item.comId = this.form.comId
          })
          updateAllCondition(this.form.sysConditions).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: res.retMsg
            })
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
    deviceName(value) {
      if (value === '' || value === null) { // 未选对应电表模块编号时
        return ''
      } else {
        for (var i = 0; i < this.form.sysDevices.length; i++) {
          if (this.form.sysDevices[i].modelNum === value) {
            if (this.form.sysDevices[i].deviceName === '') {
              return '(未填写设备名)'
            } else {
              return this.form.sysDevices[i].deviceName
            }
          }
        }
        return '没有匹配项'
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('submit!')
          addBoard(this.form).then(res => {
            this.$notify({
              title: '成功',
              message: res.retMsg,
              type: 'success'
            })
            this.$emit('fuclose')
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
      this.$refs.form.clearValidate()
    },
    addDeviceList() {
      const _obj = { deviceName: '', modelNum: '', deviceStyle: '', listDisabled: '', deviceProcess: '', groupId: '', isWar: false, deviceStatus: true, isTest: false, orderNum: 1 }
      this.form.sysDevices.push(_obj)
    },
    addModelListCloud(index, item) {
      item.mn = this.form.mn
      addSysCondition(item).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$set(this.form.sysConditions[index], 'id', res.retData)
      })
    },
    saveModelListCloud(index, item) {
      item.mn = this.form.mn
      updateSysCondition(item).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      })
    },
    addModelList() {
      const _obj = {
        modelNum: this.form.sysConditions.length + 1,
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
        aoAcquisitionRangeMax: 1,
        aoAcquisitionRangeMin: '',
        aoRealRangeMax: 1,
        aoRealRangeMin: '',
        aoCriticalValue: '',
        aoLoadCoefficient: 1,
        aoAir: '',
        atStatus: false,
        atToModel: '',
        atHbCode: '',
        atAcquisitionRangeMax: 1,
        atAcquisitionRangeMin: '',
        atRealRangeMax: 1,
        atRealRangeMin: '',
        atCriticalValue: '',
        atLoadCoefficient: 1,
        atAir: '',
        awStatus: false,
        awToModel: '',
        awHbCode: '',
        awAcquisitionRangeMax: 1,
        awAcquisitionRangeMin: '',
        awRealRangeMax: 1,
        awRealRangeMin: '',
        awCriticalValue: '',
        awLoadCoefficient: 1,
        awAir: '',
        afStatus: false,
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
    // DelDeviceListCloud(item, index) {
    //   if (item.id) {
    //     deleteSysdevice({
    //       deviceId: item.deviceId
    //     }).then(res => {
    //       console.log(res)
    //       if (res.retData === 1) {
    //         this.$message({
    //           type: 'success',
    //           message: '已从服务器中删除'
    //         })
    //         this.DelDeviceList(index)
    //       }
    //     })
    //   } else {
    //     this.DelDeviceList(index)
    //   }
    // },
    // saveOrUp(item, index) {
    //   item.mn = this.form.mn
    //   if (item.deviceId) {
    //     updateByDeviceId(item).then(res => {
    //       this.$message({
    //         type: 'success',
    //         message: '设备信息已经更新'
    //       })
    //       console.log('更新', res)
    //     })
    //   } else {
    //     addSysdevice(item).then(res => {
    //       console.log(res)
    //       this.$set(this.form.sysDevices[index], 'deviceId', res.retData.deviceId)
    //       this.$message({
    //         type: 'success',
    //         message: '设备信息已经添加'
    //       })
    //     })
    //   }
    // },
    DelModelList(index, item) {
      // if (item.id) {
      //   item.mn = this.form.mn
      //   deleteSysCondition(item).then(res => {
      //     this.form.sysConditions.splice(index, 1)
      //     this.$message({
      //       type: 'success',
      //       message: '工况信息已经从服务器中删除'
      //     })
      //   })
      // } else {
      this.form.sysConditions.splice(index, 1)
      // }
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
    },
    changeLine(val) {
      if (val) {
        selectAllGroups({
          'comId': val,
          'pageIndex': 1,
          'pageSize': 999
        }).then(res => {
          this.createLine = res.retData.data
        })
      } else {
        this.createLine = []
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
.smallTitle{
    font-size: 10px;
    color: #46d8d1;
    position: absolute;
    top: 0px;
    left: 52px;
}
.smallTitlered{
  font-size: 10px;
    color: #df4040;
    position: absolute;
    top: 0px;
    left: 52px;
}
.xuxuankuang{
  position: relative;
}
.xuxian{
  width: 96%;
  height: 2px;
  position: absolute;
  bottom: 10px;
  border-bottom: 1px  dashed #3e3e3e30;
  left: 50%;
  transform: translateX(-50%);
}
</style>


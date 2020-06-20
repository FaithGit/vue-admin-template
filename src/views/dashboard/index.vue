<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="8">{{ comName }}</el-col>
      <el-col :span="8">123</el-col>
      <el-col :span="8">123</el-col>
    </el-row>
  </div>
</template>

<script>
import { findComBasicData } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Dashboard',
  data() {
    return {
      comName: ''
    }
  },
  mounted() {
    findComBasicData({
      token: getToken()
    }).then(res => {
      console.log(res)
      this.comName = res.retData.comName
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  padding: 20px;
}
</style>

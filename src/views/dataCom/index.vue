<template>
  <div class="app-container">
    <div>
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择" clearable @change="changeCom">
        <el-option
          v-for="item in comList"
          :key="item.value+'x'"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class="scx">生产线：</span>
      <el-select v-model="scx" placeholder="请选择" clearable @change="changeCom">
        <el-option
          v-for="item in scxList"
          :key="item.value+'y'"
          :label="item.group_name"
          :value="item.group_id"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>

  </div>
</template>
<script>
import { findData, selectAllGroups } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'DataCom',
  data() {
    return {
      comList: [],
      com: '',
      scxList: [],
      scx: ''
    }
  },
  mounted() {
    this.findData()
  },
  methods: {
    changeCom() {
      this.selectAllGroups()
    },
    searchClick() {

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
    selectAllGroups() {
      selectAllGroups({
        pageIndex: 1,
        pageSize: 999,
        comId: this.com || ''
      }).then(res => {
        this.scxList = res.retData.data
        this.scx = ''
        try {
          this.scx = this.scxList[0].group_id
        } catch (error) {
          console.log('这个公司未添加生产线')
          console.log(error)
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
.scx{
  margin: 0 0 0 10px;
}

</style>

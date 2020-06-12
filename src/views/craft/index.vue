<template>
  <div class="app-container">
    <div class="head-com">
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择" @change="changeCom">
        <el-option
          v-for="item in comList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>
    <div class="card-body">
      <div v-for="(item ,index) in tableData[0].groups" :key="'groups'+index" :class="{cardSmall:!tableDataStyle[index],cardSmallBig:tableDataStyle[index]}" @dblclick="big(index)">
        <div class="card">
          <div class="createLineName">{{ tableData[0].comName }}-{{ item.groupName }}</div>
          <div class="createLineTime">时间：{{ item.groupName }}</div>
          <img src="@img/left-creat.png">
        </div>
        <div v-if="index%3==0" style="clear:both" />
      </div>
    </div>

  </div>
</template>

<script>
import { findData, selectByComId } from '@/api/table'

export default {
  data() {
    return {
      comList: [],
      com: '',
      magnify: false,
      tableDataStyle: [
        false, false, false, false
      ],
      tableData: [
        {
          'groups': [
            {
              'groupName': '1#线',
              'groupId': '0edb2d3d-7a41-4970-9664-d0a8128b096b',
              'scData': [
                {
                  'switch_data': 0,
                  'pro_tem': 0.00,
                  'device_name': '压延机1#',
                  'device_id': 'ae1ec053-3987-4449-9185-0a1600b65ca1',
                  'active_power': 108.36
                }
              ],
              'groupNo': 1,
              'zlData': [
                {
                  'device_name': '治理设施1#',
                  'device_id': 'aa7cd955-80da-4bef-9a28-b59aa2b35ab8',
                  'active_power': 29.55
                }
              ]
            },
            {
              'groupName': '3#线',
              'groupId': '4503093d-4e41-420e-b932-96b2e9ac4c93',
              'scData': [
                {
                  'switch_data': 0,
                  'pro_tem': 0.00,
                  'device_name': '压延机3#',
                  'device_id': '57e0f5c5-0d6b-4d00-ab61-359fa7954b3d',
                  'active_power': 126.26
                }
              ],
              'groupNo': 3,
              'zlData': [
                {
                  'device_name': '治理设施3#',
                  'device_id': 'cb005fc9-cb2b-4812-b5e1-4f6ee2ee746a',
                  'active_power': 26.25
                }
              ]
            },
            {
              'groupName': '4#线',
              'groupId': '4503093d-4e41-420e-b932-96b2e9ac4c93',
              'scData': [
                {
                  'switch_data': 0,
                  'pro_tem': 0.00,
                  'device_name': '压延机4#',
                  'device_id': '57e0f5c5-0d6b-4d00-ab61-359fa7954b3d',
                  'active_power': 126.26
                }
              ],
              'groupNo': 4,
              'zlData': [
                {
                  'device_name': '治理设施4#',
                  'device_id': 'cb005fc9-cb2b-4812-b5e1-4f6ee2ee746a',
                  'active_power': 26.25
                }
              ]
            },
            {
              'groupName': '5#线',
              'groupId': '4503093d-4e41-420e-b932-96b2e9ac4c93',
              'scData': [
                {
                  'switch_data': 0,
                  'pro_tem': 0.00,
                  'device_name': '压延机5#',
                  'device_id': '57e0f5c5-0d6b-4d00-ab61-359fa7954b3d',
                  'active_power': 126.26
                }
              ],
              'groupNo': 5,
              'zlData': [
                {
                  'device_name': '治理设施5#',
                  'device_id': 'cb005fc9-cb2b-4812-b5e1-4f6ee2ee746a',
                  'active_power': 26.25
                }
              ]
            }
          ],
          'comId': '714bcde8-a7b4-11ea-a177-b8599f0536c0',
          'comName': '浙江罗诗妮新材料有限公司'
        }
      ]
    }
  },
  mounted() {
    this.findData()
  },
  methods: {
    findData() {
      this.loadable = true
      findData({
        comName: '',
        pageIndex: 1,
        pageSize: 9999
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
    searchClick() {
      this.search = this.search1
      this.findData(this.search, 1, this.pageSize)
    },

    changeCom(val) {
      console.log(val)
      selectByComId({
        comId: val
      }).then(res => {
        console.log(res)
      })
    },
    big(index) {
      // this.tableDataStyle[index] = !this.tableDataStyle[index]
      this.$set(this.tableDataStyle, index, !this.tableDataStyle[index])
      console.log(this.tableDataStyle)
    }
  }
}
</script>
<style lang="scss" scoped>

.card-body{
  background: #6b6b6b;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.cardSmall{
  width:33%;
  height:731px ;
  float: left;
}
.cardSmallBig{
  widows: 100VW;;
  height:inherit ;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1002;
}
.card{
  width: 1420px;
  height: 2194px;
  background: white;
  transform: scale(0.33,0.33);
  transform-origin: 50px 0%;
  margin: 0 auto;
}

.cardNo{
  width: 1420px;
  height: 2194px;
  background: purple;

}
.createLineName{
  text-align: center;
  font-size: 36px;
  padding-top: 20px;
}
.createLineTime{
  width: 250px;
  text-align: center;
  padding: 0 10px;
  background: #304156;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  line-height: 30px;
  margin: 20px auto 0;

}
.app-container{
  padding: 0;
}
.head-com{
  background: #6e6e6e;
  padding: 10px;
}

</style>

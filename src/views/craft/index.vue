<template>
  <div class="app-container">
    <div class="head-com">
      <span>企业：</span>
      <el-select v-model="com" placeholder="请选择">
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
      <div
        v-for="(item ,index) in tableData[0].groups"
        :key="'groups'+index"
        :class="{cardSmall:!tableDataStyle[index],cardSmallBig:tableDataStyle[index]}"
        @dblclick="big(index)"
      >
        <div :class="{card:!tableDataStyle[index],cardNo:tableDataStyle[index]}">
          <div class="createLineName">{{ tableData[0].comName }}-{{ item.groupName }}</div>
          <div class="createLineTime">时间：{{ item.dataTime }}</div>

          <div class="imgBody">
            <div class="imgBlock">
              <div v-for="(_item,_index) in item.scData" :key="'xxxxxx'+_index" class="leftIMG">
                <img src="@img/left-creat.png">

                <img src="@img/gyticon.png" :class="{gyticon1:true,rotation:_item.switch_data!=0}">
                <img src="@img/gyticon.png" :class="{gyticon2:true,rotation:_item.switch_data!=0}">
                <img src="@img/gyticon.png" :class="{gyticon3:true,rotation:_item.switch_data!=0}">

                <div class="leftGuan" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true}" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true}" />
                <div class="left-content">
                  <div>监测仪：{{ _item.device_name }}</div>
                  <div>设备状态：
                    <svg-icon icon-class="swtich" :class="{greenSvg:_item.switch_data!=0,redSvg:_item.switch_data==0}" />
                  </div>
                  <div v-if="_item.switch_data!=0">生产温度：{{ _item.pro_tem }} ℃</div>
                  <div v-if="_item.switch_data!=0">功率：{{ _item.active_power }} kw</div>
                </div>
              </div>

              <img src="@img/right-zl.png" class="right-zl">
              <div class="middle-zl">
                <img src="@img/middle-zl.png">
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true}" style="right: -24px;transform: scale(1.3) rotate(180deg);top:-148px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="right: -24px;transform: scale(1.3) rotate(180deg);top: 48px;" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true} " style="right: -24px;transform: scale(1.3) rotate(180deg);top: 228px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="right: -24px;transform: scale(1.3) rotate(180deg);top: 328px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="right: -24px;transform: scale(1.3) rotate(180deg);top: 368px;" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true} " style="left: 29px;transform: scale(1) rotate(-90deg);top: 214px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="left: 99px;transform: scale(1) rotate(-90deg);top: 214px;" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true} " style="left: 488px;transform: scale(1.3) rotate(-90deg);top: 265px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="left: 592px;transform: scale(1.3) rotate(-90deg);top: 265px;" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true} " style="left: 370px;transform: scale(1) rotate(-90deg);top:10px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="left: 430px;transform: scale(1) rotate(-90deg);top: 10px;" />
                <div :class="{jiantou:true,opacityFu:tableDataCss[index]==true} " style="left: 456px;transform: scale(1);top:80px;" />
                <div :class="{jiantou2:true,opacityFu2:tableDataCss[index]==true} " style="left: 456px;transform: scale(1);top: 180px;" />

                <div class="left-content left-content-zl">
                  <div>监测仪：{{ item.zlData[0].device_name }}</div>
                  <div v-if="item.zlData[0].active_power!=null">功率：{{ item.zlData[0].active_power }} kw</div>
                  <div v-if="item.zlData[0].ph_value!=null">ph值：{{ item.zlData[0].ph_value }}</div>
                  <div v-if="item.zlData[0].purifier_load!=null">净化器负荷：{{ item.zlData[0].purifier_load }} Hz</div>
                  <div v-if="item.zlData[0].purifier_current!=null">净化器电流：{{ item.zlData[0].purifier_current }} A</div>
                  <div v-if="item.zlData[0].fans_load!=null">风机负荷：{{ item.zlData[0].fans_load }} Hz</div>
                  <div v-if="item.zlData[0].fans_current!=null">风机电流：{{ item.zlData[0].fans_current }} A</div>
                  <div v-if="item.zlData[0].water_spray!=null">水喷淋开关：
                    <svg-icon icon-class="water_switch" :class="[item.zlData[0].water_spray!==true?'redSvg':'greenSvg']" />
                  </div>
                  <div v-if="item.zlData[0].emission_tem_out!=null">排放口温度：{{ item.zlData[0].emission_tem_out }} ℃</div>
                  <div v-if="item.zlData[0].emission_tem_in!=null">净化温度：{{ item.zlData[0].emission_tem_in }} ℃</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="index%3==0" style="clear:both" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { findData, findDataGyt } from '@/api/table'
import { getToken } from '@/utils/auth'

export default {
  name: 'Craft',
  data() {
    return {
      comList: [],
      com: '',
      tableDataStyle: [],
      tableDataCss: [],
      tableData: [
        {
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
        token: getToken(),
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
        this.com = this.comList[0].value
        this.searchClick()
      })
    },
    searchClick() {
      console.log(this.com)
      findDataGyt({
        comId: this.com,
        token: getToken()
      }).then(res => {
        console.log(res)
        this.tableData = res.retData
        const _arr = []
        const _arr2 = []
        for (var i = 0; i < this.tableData[0].groups.length; i++) {
          _arr[i] = false
          _arr2[i] = false
        }
        this.tableDataStyle = _arr
        this.tableDataCss = _arr2

        for (var j = 0; j < this.tableData[0].groups.length; j++) {
          for (var z = 0; z < this.tableData[0].groups[j].scData.length; z++) {
            if (this.tableData[0].groups[j].scData[z].switch_data === 1) {
              this.tableDataCss[j] = true
            }
          }
        }

        console.log(this.tableDataCss)
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

@-webkit-keyframes rotation {
	from {
	-webkit-transform:rotate(0deg);
}
to {
	-webkit-transform:rotate(360deg);
}
}.rotation {
	-webkit-transform:rotate(360deg);
	animation:rotation 2.7s linear infinite;
}

@-webkit-keyframes opacityFu {
	from {
	opacity: 1;
}
to {
	opacity: 0;
}
}.opacityFu {
	opacity: 1;
	animation:opacityFu 0.8s linear infinite;
}

@-webkit-keyframes opacityFu2 {
	from {
	opacity: 0;
}
to {
	opacity: 1;
}
}.opacityFu2 {
	opacity: 0;
	animation:opacityFu2 0.8s linear infinite;
}

.card-body {
  background: #9c9c9c;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.cardSmall {
  width: 33%;
  height: 731px;
  float: left;
  margin: 5px 0;
}
.cardSmallBig {
  width: 100vw;
  height: inherit;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1002;
  overflow: auto;
  background: #9c9c9c;
}
.card {
  width: 1420px;
  height: 2194px;
  background: white;
  transform: scale(0.33, 0.33);
  transform-origin: 50px 0%;
  margin: 0 auto;
}

.cardNo {
  width: 1420px;
  height: 2194px;
  background: white;
  margin: 50px auto;
}
.createLineName {
  text-align: center;
  font-size: 36px;
  padding-top: 20px;
}
.createLineTime {
  width: 250px;
  text-align: center;
  padding: 0 10px;
  background: #304156;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  line-height: 30px;
  margin: 50px auto 0;
}
.app-container {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #9c9c9c;
  padding: 0;
}
.head-com {
  background: #9c9c9c;
  padding: 10px;
}
.imgBody {
  width: 1200px;
  height: 2000px;
  margin: 0 auto;
  overflow: auto;
}
.leftIMG{
  width: 371px;
  height: 217px;
  position: relative;
}
.imgBlock{
  position: relative;
  margin: 150px 0 0 100px;
}
.middle-zl{
  position: absolute;
  left: 371px;
  bottom: -110px;
}
.leftGuan{
  height: 217px;
  width: 20px;
  background: #bdbdbd;
  position: absolute;
  right: 0px;
  z-index: 2;
  top: 40px;
}
.left-content{
    width: 180px;
    padding: 0 10px;
    background: #304156;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    line-height: 30px;
    position: absolute;
    z-index: 5;
    top: 80px;
    left: -80px;
}
.left-content-zl{
   width: 200px;
    top: -120px;
    left: 85px;
    max-height: 180px;
    overflow: auto;
}
.right-zl{
  position: absolute;
  bottom: -94px;
  right: 20px;
  z-index: 5;
}
.gyticon1{
    position: absolute;
    z-index: 9;
    width: 50px;
    left: 146px;
    top: 149px;
}
.gyticon2{
    position: absolute;
    z-index: 9;
    width: 14px;
    left: 142px;
    top: 109px;
}
.gyticon3{
    position: absolute;
    z-index: 9;
    width: 25px;
    left: 117px;
    top: 127px;
}
.jiantou{
  width: 6px;
  height: 22px;
  background: #555;
  position: absolute;
  z-index: 99;
  top: 73px;
  right: 7px;
}
.jiantou::after{
    content: '';
    border-width: 8px 8px 8px 8px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    position: absolute;
    bottom: -16px;
    left: -5px;
}
.jiantou2{
  width: 6px;
  height: 22px;
  background: #555;
  position: absolute;
  z-index: 99;
  top: 170px;
  right: 7px;
  opacity: 0;
}
.jiantou2::after{
    content: '';
    border-width: 8px 8px 8px 8px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    position: absolute;
    bottom: -16px;
    left: -5px;
}
.greenSvg{
  font-size: 20px;
  color: #68ff68;
}
.redSvg{
  font-size: 20px;
  color: #ff3c3c;
}

</style>

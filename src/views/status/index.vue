<template>
  <div class="app-container">
    <div v-for="(item,index) in list" :key="'item'+index" class="comBody">
      <div class="comTitle">{{ item.comName }}</div>
      <div class="comContent">
        <div v-for="(listItem,listIndex) in item.list" :key="'listItem'+listIndex" :span="4" class="kuang" :class="{comBodyon:listItem.switchData,off:listItem.deviceStatus==0,isWar:listItem.isWar}">
          <div v-if="listItem.isWar!=true" class="devicek">
            <svg-icon :icon-class="listItem.deviceStatus!=0?'device':'off'" :class="{device:listItem.deviceStatus!=0,device12:listItem.deviceStatus==0}" />
          </div>
          <div v-if="listItem.deviceStatus!=0" class="switchK">
            <svg-icon icon-class="switch1" :class="{switchoff:listItem.switchData==false,switchon:listItem.switchData==true,switch:true}" />
          </div>
          <div class="deviceName">
            {{ listItem.deviceName }}
          </div>
          <div v-if="listItem.activePower&&listItem.deviceStatus!=0" class="activePower">
            {{ listItem.activePower }}KW
          </div>
          <div v-if="listItem.deviceStatus==0" class="activePower">
            离线
          </div>
          <div class="percentage">
            <el-progress :percentage="jisuan(listItem.openTime)" :show-text="false" :color="customColors" />
          </div>
          <el-popover
            placement="top-start"
            title="今日开启时长"
            width="200"
            trigger="hover"
            :content="(listItem.openTime!=undefined?listItem.openTime:'0')+'小时'"
          >

            <div slot="reference" class="popoverTime" />
          </el-popover>

          <div />
        </div>
        <div v-if="item.list.length==0" class="imgK">
          <img src="@img/none2.png" alt="" style="vertical-align: middle;">
          未添加设备
        </div>

      </div>
    </div>
  </div></template>
<script>
import { findSysComDeviceStatus } from '@/api/table'
import { getToken } from '@/utils/auth'
export default {
  name: 'Status2',
  data() {
    return {
      list: [],
      customColors: [
        { color: '#5cb87a', percentage: 20 },
        { color: '#6f7ad3', percentage: 40 },
        { color: '#1989fa', percentage: 60 },
        { color: '#e6a23c', percentage: 80 },
        { color: '#f56c6c', percentage: 100 }
      ]
    }
  },
  mounted() {
    findSysComDeviceStatus({
      token: getToken()
    }).then(res => {
      console.log(res)
      this.list = res.retData
    })
  },
  methods: {
    jisuan(value) {
      if (value) {
        if (value / 0.24 < 0) {
          return 0
        } else if (value / 0.24 > 100) {
          return 100
        } else {
          return value / 0.24
        }
      } else {
        return 0
      }
    }
  }
}
// #27b72780;
</script>
<style lang="scss" scoped >
  .app-container{
    padding: 20px;
     column-count: 2;
     column-gap: 10px;//列间距

  }
  .comBody{
    border: 1px solid #dedeea;
    break-inside: avoid;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .comTitle{
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #dedeea;
    padding-left: 10px;
  }
  .comContent{
    margin-top: 10px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .kuang{
    border: 1px solid #e0e0e0;
    height: 116px;
    flex: 100px;
    border-radius: 5px;
    min-width: 100px;
    max-width: 100px;
    margin: 1px;
    box-shadow: 0px 1px 5px #d8d8d8;
    position: relative;
  }
  .devicek{
    text-align: center;
    margin-top: 5px;
  }
  .device{
    font-size: 1.7rem
  }
  .device12{
    font-size: 1.2rem
  }
  .deviceName{
       text-align: center;
       margin-top: 8px;
       font-size: 14px;
  }
  .activePower{
      position: absolute;
      bottom: 20px;
             font-size: 14px;
      transform: translateX(-50%);
      left: 50%;
  }
  .switchK{
    position: absolute;
    top: 8px;
    left: 9px;
  }
  .switch{
     font-size: 21px;
  }
  .switchon{
    font-size: 21px;
    color: #389648;
  }
  .switchoff{
    font-size: 21px;
    color: #737373;
  }
  .percentage{
    position: absolute;
    width: 80px;
    bottom: 5px;
      transform: translateX(-50%);
      left: 50%;
  }
  .imgK{
    position: relative;
    transform: translateX(-50%);
    left: 50%;
  }
  .comBodyon{
    background:#27b72780;
  }
  .isWar{
    background:#ff0000c4;
  }
  .off{
    background:#c4c4c4;

    background-image:

                                     /*下三角向下移动至下一个三角，向下形成正方形*/

                                     linear-gradient(45deg,hsla(0,0%,100%,0.2) 25%, transparent 0),

                                     linear-gradient(45deg,transparent 75%, hsla(0,0%,100%,0.2) 0),
                                            linear-gradient(45deg,transparent 75%, hsla(0,0%,100%,0.2) 0),

                                     linear-gradient(45deg,hsla(0,0%,100%,0.2) 25%, transparent 0);
                                         background-size: 30px 30px;

    background-position: 0 0,15px 15px;
  }
  .popoverTime{
    width: 100px;
    height: 116px;
    position: absolute;
    bottom: 0;
  }
</style>


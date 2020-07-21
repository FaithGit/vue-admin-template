<template>
  <div class="app-container">
    <div class="hangyeTitle">
      【印染】
    </div>
    <el-row :gutter="20">
      <el-col :span="6" class="">
        <div class="comCard">
          <div class="comName">海宁牛仔织造有限公司</div>
          <div class="com">
            <img src="http://47.96.147.99:8080/MQJK/images/login/mq_2.jpg" alt="" class="imgCard">
            <div class="comContent">
              <div>正常</div>
              1<br>
              异常点位
            </div>
          </div>
          <div style="margin:20px 0 0 20px">
            生产设施：0开启 1关闭<br>
            治理设施：0开启 1关闭
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="">
        <div class="comCard"> 123</div>
      </el-col>
      <el-col :span="6" class="">
        <div class="comCard"> 123</div>
      </el-col>
      <el-col :span="6" class="">
        <div class="comCard"> 123</div>
      </el-col>
      <el-col :span="6" class="">
        <div class="comCard"> 123</div>
      </el-col>

    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Status',
  data() {
    return {
      retData: [
        {
          type: '印染',
          list: [
            {
              com: '海宁牛仔织造有限公司',
              comImg: '',
              status: '',
              errorPoint: 1,
              createDevicesOn: 1,
              createDevicesOff: 0,
              governDevicesOn: 0,
              governDevicesOff: 0
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container{
    padding: 20px;
  }
  .hangyeTitle{
    font-size: 22px;
    font-weight: 700;
    color: #03b6b1;
  }
  .comCard{
    height: 240px;
    margin-top: 10px;
    background: rgb(35, 206, 120);
    position: relative;
  }
  .imgCard{
    width: 200px;
    height:120px;
    background: rgb(0, 0, 0);
    margin-left: 20px;
  }
  .comName{
    font-size: 16px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    color: white;
  }
  .comContent{
    display: inline-block;
    text-align: center;
    width: calc(100% - 225px);
  }
  .com{
    vertical-align: middle;
  }
</style>

<template>
  <div class="app-container">
    <div class="hangyeTitle">
      【全部】
    </div>
    <el-row :gutter="20">
      <el-col :span="8" class="">
        <div class="comCard">
          <div class="comName">
            <svg-icon icon-class="comName" style="margin: 0 5px" />海宁牛仔织造有限公司 <span style="color:green">[ 正常 ]</span>
          </div>
          <div class="com">
            <img src="http://47.96.147.99:8080/MQJK/images/login/mq_2.jpg" alt="" class="imgCard">
            <div class="comContent">
              <svg-icon icon-class="errorPoint" style="margin: 0 5px;font-size:24px" />异常点位<br>
              <div class="errorPoint">1</div>
              生产设施：0开启 1关闭<br>
              治理设施：0开启 1关闭
            </div>
          </div>
          <vue2-org-tree :data="data" :horizontal="true" :judge="judge" :node-class="NodeClass" />
        </div>

      </el-col>
      <el-col :span="8" class="">
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
      <el-col :span="8" class="">
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

    </el-row>

  </div>
</template>
<script>
import Vue2OrgTree from 'vue-tree-color'
export default {
  name: 'Status',
  components: {
    Vue2OrgTree
  },
  data() {
    return {
      judge: {
        swtich: true
      },
      NodeClass: [
        'myred',
        'mygreen',
        'mywhite'
      ],
      data: {
        id: 0,
        label: '浙江罗诗妮新材料有限公司',
        swtich: 'mywhite',
        children: [
          {
            label: '1#线',
            swtich: 'myred',
            children: [
              {

                label: '压延机1#',
                swtich: 'mygreen'
              },
              {
                label: '治理设施1#',
                swtich: 'myred'
              }
            ]
          },
          {
            label: '3#线',
            swtich: 'mygreen',
            children: [
              {

                label: '压延机3#',
                swtich: 'mygreen'
              },
              {
                label: '治理设施3#',
                swtich: 'mygreen'
              }
            ]
          },
          {
            label: '1#线',
            swtich: 'mygreen',
            children: [
              {

                label: '喷漆主机',
                swtich: 'mygreen'
              },
              {
                label: '治理1#',
                swtich: 'mygreen'
              }
            ]
          }

        ]
      }
    }
  }
}
</script>
<style lang="scss" >
  .app-container{
    padding: 20px;

  }
  .hangyeTitle{
    font-size: 22px;
    font-weight: 700;
    color:#f3a2a2
  }
  .comCard{
    margin-top: 10px;
    background: #eaeaea;
    position: relative;
    border-radius: 5px;
    box-shadow: 2px 7px 12px #f1f1f1;
  }
  .imgCard{
    width: 227px;
    height:136px;
    background: rgb(0, 0, 0);
    margin-left: 20px;
    vertical-align: top;
  }
  .comName{
    font-size: 16px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    color: #174040;

  }
  .comContent{
    display: inline-block;
    text-align: center;
    width: calc(100% - 252px);
  }
  .com{
    vertical-align: middle;
  }
  .myred{
    background: #ff2f2f;;
    color:white
  }
  .mygreen{
    background:#3ade35;;
    color:white
  }
  .mywhite{
    background: #fff;
    color:#000000
  }
  .org-tree-container{
    background-color: transparent;
  }
  .errorPoint{
    font-size: 26px;
    line-height: 82px;
    color: #ea2e2e;
    font-weight: bold;
  }
</style>

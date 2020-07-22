<template>
  <div class="app-container">
    <div class="hangyeTitle">
      【印染】
    </div>
    <el-row :gutter="20">
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
        'myger',
        'myblue'
      ],
      data: {
        id: 0,
        label: 'XXX科技有限公司',
        children: [
          {
            id: 2,
            label: '产品研发部',
            children: [
              {
                id: 5,
                label: '研发-前端',
                swtich: 'myger'
              },
              {
                id: 6,
                label: '研发-后端'
              },
              {
                id: 9,
                label: 'UI设计'
              },
              {
                id: 10,
                label: '产品经理'
              }
            ]
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部'
              },
              {
                id: 8,
                label: '销售二部'
              }
            ]
          },
          {
            id: 4,
            label: '财务部'
          },
          {
            id: 9,
            label: 'HR人事'
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
    color: #03b6b1;
  }
  .comCard{
    margin-top: 10px;
    background: #c7c7c7;;
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
  .myger{
    background: red;
    color:white
  }
</style>

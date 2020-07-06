<template>
  <div class="paihangBody">
    <div v-for="(item,index) in phList" :key="'phlist'+index">
      <div class="phlist"><span class="itemList3" :class="{itemList:index<3}">{{ index+1 }}</span>{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phList: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.paihangBody{
    overflow: auto;
    height: 100%;
}
.phlist{
    margin: 15px 0px 15px 35px;
}

.itemList3{
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    padding-top: 6px;
    margin-right: 10px;
    background: #eaeaea;
}
.itemList{
    background: rgb(49, 70, 89);
    color: white;
}
</style>

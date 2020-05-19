<template>
  <div class="dashboard-container">
    <div class="dashboardHead">
      <img src="@img/hs_logo.png">
    </div>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
.dashboardHead{
  background:linear-gradient(to right,#1047ab 55%,#041752);
  height: 70px;

}
</style>

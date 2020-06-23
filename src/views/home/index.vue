<template>
  <div />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  },
  mounted() {
    var that = this
    setTimeout(function() {
      if (that.roles[0] === 'qy') {
        that.$router.replace({ name: 'Dashboard' })
      } else if (that.roles[0] === 'gly') {
        that.$router.replace({ name: 'Company' })
      } else if (that.roles[0] === 'kf') {
        that.$router.replace({ name: 'Company' })
      } else if (that.roles[0] === 'yw') {
        that.$router.replace({ name: 'Table' })
      } else if (that.roles[0] === 'sjfx') {
        that.$router.replace({ name: 'Table' })
      } else if (that.roles[0] === 'az') {
        that.$router.replace({ name: 'Formlist' })
      } else if (that.roles[0] === 'kf') {
        that.$router.replace({ name: 'Pandect' })
      }
    }, 100)
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>

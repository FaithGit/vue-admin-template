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
      }
    }, 100)
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>

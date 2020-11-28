<script>
export default {
  created () {
    // window.localStorage.clear()
    // this.$nextTick(() => this.$router.go('/'))
    this.$axios.setToken(false)
    this.$store.commit('deleteUser')
    this.$router.push('/')
    // this.$axios.setHeader('', null)
  }
}
</script>

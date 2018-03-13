export default {
  data () {
    return { struct: {} }
  },
  created () {
    this.$root.$on('params:change', () => this.update ? this.update() : null)
  },
  mounted () {
    this.$nextTick(() => this.update ? this.update() : null)
  },
  computed: {
    source () {
      var obj = this.walkUp(vue => vue.isSource)
      return obj ? obj.sourceIndex : ''
    }
  }
}

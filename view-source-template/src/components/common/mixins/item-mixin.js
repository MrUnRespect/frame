export default {
  data () {
    return {
      options: {},
      chart: null,
      struct: {}
    }
  },
  computed: {
    size () {
      return this.walkUp(vue => vue.isInner).size
    },
    source () {
      var obj = this.walkUp(vue => vue.isSource)
      return obj ? obj.sourceIndex : '1'
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.chart) {
        this.chart = this.$echarts.init(this.$refs.chart)
      }
      this.on()
      this.$nextTick(() => this.update ? this.update() : null)
    }, 500)
  },
  beforeDestroy () {
    this.off()
  },
  methods: {
    on () {
      this.$on('resize', () => this.resize())
      this.resizeHandler = () => this.$emit('resize')
      this.$root.$on('resize', () => this.resizeHandler())
      this.$root.$on('params:change', () => this.update ? this.update() : null)
    },
    off () {
      this.$root.$off('resize', this.resizeHandler)
    },
    resize () {
      this.chart ? this.chart.resize() : null
    }
  }
}

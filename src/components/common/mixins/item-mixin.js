export default {
  data () {
    return {
      options: {},
      chart: null,
      struct: {}
    }
  },
  watch: {
    'currentValue.setting': {
      handler: function () {
        this.update ? this.update() : null
      },
      deep: true
    },
    'source': {
      handler: function () {
        this.update ? this.update() : null
      }
    }
  },
  computed: {
    size () {
      return this.walkUp(vue => vue.isInner).size
    },
    source () {
      var obj = this.walkUp(vue => vue.isSource)
      return obj ? obj.sourceIndex : ''
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
      this.paramsChangeHandler = () => this.update ? this.update() : null
      this.$root.$on('params:change', this.paramsChangeHandler)
      this.resizeHandler = () => this.$emit('resize')
      this.$root.$on('resize', this.resizeHandler)
      this.$on('resize', () => this.resize())
    },
    off () {
      this.$root.$off('resize', this.resizeHandler)
      this.$root.$off('params:change', this.paramsChangeHandler)
    },
    resize () {
      this.chart ? this.chart.resize() : null
    }
  }
}

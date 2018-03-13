import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      originalSize: state => state.setting.size,
      originalMarginSize: state => state.setting.marginSize,
      realSize: state => state.systemSetting.realSize
    }),
    realMarginSize () {
      return this.calcRealSize(this.originalMarginSize)
    }
  },
  methods: {
    calcRealSize (size) {
      return size * this.realSize / this.originalSize
    },
    unit (size, unit = 'px') {
      if (size === 'auto' || size.toString().indexOf('%') > -1) {
        return size
      } else {
        return size * this.realSize / this.originalSize + unit
      }
    },
    unitSize (size, unit = 'px') {
      return this.unit(size, unit)
    }
  }
}

import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      originalSize: state => state.setting.size,
      originalMarginSize: state => state.setting.marginSize,

      realSize: state => state.systemSetting.realSize,
      editModeMargin: state => state.systemSetting.editModeMarginSize
    }),
    realMarginSize() {
      return this.calcRealSize(this.originalMarginSize)
    },
    topContainerNumber() {
      let parent = this.$parent
      let res = 0
      let tres = 0
      do {
        if (parent.currentValue) {
          if (parent.currentValue.type === 'row' || parent.currentValue.type === 'col' || parent.isInner) {
            tres++
          }
          if (parent.isInner) {
            res += tres
            tres = 0
          }
        }
      } while ((parent = parent.$parent))
      return res
    }
  },
  methods: {
    calcRealSize(size) {
      return size * this.realSize / this.originalSize
    },
    unit(size, unit = 'px') {
      if (size === 'auto' || size.toString().indexOf('%') > -1) {
        return size
      } else {
        return size * this.realSize / this.originalSize + unit
      }
    },
    unitSize(size, unit = 'px') {
      if (size === 'auto' || size.toString().indexOf('%') > -1) {
        return size
      } else {
        return size * this.realSize / this.originalSize - (this.$root.preview ? 0 : 1) * this.topContainerNumber * 2 * this.editModeMargin + unit
      }
    }
  }
}

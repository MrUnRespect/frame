<template>
    <div class="box-container" :style="marginStyle">
      <slot></slot>
    </div>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
window.d = 0;
export default {
  mixins: [controlMixin],
  data() {
    return {
      isControl: false
    };
  },
  computed: {
    marginStyle() {
      return {
        marginTop:
          this.calcRealSize(
            this.$parent.currentValue.setting.margin[0] !== null
              ? this.$parent.currentValue.setting.margin[0]
              : this.originalMarginSize
          ) + "px",
        marginRight:
          this.calcRealSize(
            this.$parent.currentValue.setting.margin[1] !== null
              ? this.$parent.currentValue.setting.margin[1]
              : this.originalMarginSize
          ) + "px",
        marginBottom:
          this.calcRealSize(
            this.$parent.currentValue.setting.margin[2] !== null
              ? this.$parent.currentValue.setting.margin[2]
              : this.originalMarginSize
          ) + "px",
        marginLeft:
          this.calcRealSize(
            this.$parent.currentValue.setting.margin[3] !== null
              ? this.$parent.currentValue.setting.margin[3]
              : this.originalMarginSize
          ) + "px"
      };
    },
  }
};
</script>
<style lang="stylus">
.box-container {
  padding-bottom: 0;
}
</style>


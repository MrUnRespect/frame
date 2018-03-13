<template>
  <tools-container :tools="tools" style="height: 100%;">
    <div class="item-container">
      <slot></slot>
    </div>
  </tools-container>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
export default {
  data() {
    return {
      isControl: false
    };
  },
  computed: {
    tools() {
      let res = [];

      if (Object.keys(this.$parent.currentValue.setting).length !== 0) {
        res.push({
          name: "参数",
          handler: () => {
            this.$modal.show("setting-modal", {
              value: this.$parent.currentValue.setting,
              title: "修改参数"
            });
          }
        });
      }

      return res;
    }
  }
};
</script>
<style lang="stylus">
.item-container {
  height: s('calc(100% - %s)', editModeMargin);

  .preview & {
    height: 100%;
  }
}
</style>



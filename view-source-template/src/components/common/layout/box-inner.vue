<template>
  <div class="inner-box" :style="{ height: unitSize(size) }">
    <component v-for="(item, index) in currentValue.children"
      :key="index"
      :is="item.name"
      v-model="currentValue.children[index]"
      :index="index"
      ></component>
  </div>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
export default {
  props: {
    size: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      isControl: false,
      isInner: true
    };
  },
  mixins: [controlMixin],
  created() {
    let parent = this.$parent;
    do {
      if (parent.isControl) {
        parent.$refs.inner = this;
        this.currentValue = parent.currentValue;
      }
    } while (!parent.isControl && (parent = parent.$parent));
  }
};
</script>
<style lang="stylus">
.inner-box {
  position: relative;
  padding-top: 1px;
  box-sizing: content-box;
  transform: translateY(-1px);
}
</style>




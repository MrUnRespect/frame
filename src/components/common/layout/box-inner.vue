<template>
  <div class="inner-box" :data-size="currentValue.children.length == 0 ? ~~size :''" :style="{ height: unitSize(size) }">
    <component v-for="(item, index) in currentValue.children"
      :key="index"
      :is="item.name"
      v-model="currentValue.children[index]"
      :index="index"
      :count="currentValue.children.length"
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
  box-sizing: border-box;
  transform: translateY(-1px);

  &:before {
    content: attr(data-size);
    position: absolute;
    z-index: -1;
    line-height: 80px;
    font-size: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: invert(alpha(baseColor, 0.2));
  }

  .preview-print &:before, .preview &:before {
    content: '';
  }
}
</style>




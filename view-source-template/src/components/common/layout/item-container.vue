<template>
    <div class="item-container">
      <slot></slot>
    </div>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
export default {
  data() {
    return {
      isControl: false
    };
  }
};
</script>
<style lang="stylus">
.item-container {
  height: 100%;
}
</style>



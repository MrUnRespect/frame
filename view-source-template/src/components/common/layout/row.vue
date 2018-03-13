<template>
    <div class="row">
      <component v-for="(item, index) in currentValue.children"
      :key="item.id"
      :is="item.name"
      v-model="currentValue.children[index]"
      :index="index"
      :count="count"
      :real-count="currentValue.children.length"
      ></component>
    </div>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
export default {
  mixins: [controlMixin],
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    this.calcCount();
  },
  methods: {
    calcCount() {
      this.count = this.currentValue.children.reduce(
        (previousValue, current) => previousValue + current.colspan,
        0
      );
      this.$root.resize();
    }
  }
};
</script>
<style lang="stylus">
.row {
  font-size: 0;
  white-space: nowrap;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>




<template>
  <tools-container :tools="tools" :style="marginStyle">
    <div class="row">
      <component v-for="(item, index) in currentValue.children"
      :key="item.id"
      :is="item.name"
      v-model="currentValue.children[index]"
      :index="index"
      :col-count="colCount"
      :real-count="currentValue.children.length"
      ></component>
    </div>
  </tools-container>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
export default {
  mixins: [controlMixin],
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tools: [
        {
          name: "列",
          handler: e => this.addCol(e)
        }
      ],
      colCount: 0
    };
  },
  computed: {
    marginStyle() {
      return {
        marginBottom:
          (this.$root.preview || this.count - 1 == this.index
            ? 0
            : this.editModeMargin) + "px"
      };
    }
  },
  mounted() {
    this.calcCount();
  },
  beforeDestroy() {},
  methods: {
    calcCount() {
      this.colCount = this.currentValue.children.reduce(
        (previousValue, current) => previousValue + current.colspan,
        0
      );
      this.$root.resize();
    },
    mergeRightColSpan(index) {
      if (index !== this.currentValue.children.length - 1) {
        let child = this.currentValue.children.splice(index + 1, 1)[0];
        let current = this.currentValue.children[index];
        current.colspan = current.colspan + child.colspan;
      } else this.currentValue.children[index].colspan++;
    },
    mergeLeftColSpan(index) {
      if (this.currentValue.children.length !== 0) {
        let child = this.currentValue.children.splice(index - 1, 1)[0];
        let current = this.currentValue.children[index - 1];
        current.colspan = current.colspan + child.colspan;
      }
    },
    addCol({ clientX, clientY }) {
      this.currentValue.children.push({
        id: Math.round(Math.random() * 1e5),
        name: "layout-col",
        type: "col",
        children: [],
        colspan: 1
      });
      this.calcCount();
      this.toolsResize(clientX, clientY);
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




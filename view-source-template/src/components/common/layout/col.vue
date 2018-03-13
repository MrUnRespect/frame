<template>
    <div class="col-container col" :class="coluid">
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
import { mapState } from "vuex";
let coluid = 0;
export default {
  props: { count: Number, realCount: Number },
  mixins: [controlMixin],
  data() {
    return {
      coluid: "coluid-" + coluid++
    };
  },
  watch: {
    realMarginSize() {
      this.calcRuntime();
    },
    count() {
      this.calcRuntime();
    },
    realCount() {
      this.calcRuntime();
    }
  },
  mounted() {
    this.calcRuntime();
  },
  beforeDestroy() {
    let style = document.querySelector(`#${this.coluid}`);
    if (style) style.parentNode.removeChild(style);
  },
  methods: {
    callParentCalcCount() {
      this.$parent.$parent.calcCount();
    },
    calcRuntime() {
      let style = document.querySelector(`#${this.coluid}`);
      if (!style) {
        style = document.createElement("style");
        style.id = this.coluid;
        style.type = "text/css";
        document.head.appendChild(style);
      }
      let pe = 100 / this.count * this.currentValue.colspan;
      style.innerHTML = `.col-container.${this.coluid}{ width: ${pe}%;}`;
    }
  }
};
</script>
<style lang="stylus">
.col-container {
  display: inline-block;
  width: auto;
  vertical-align: top;

  .row & {
    margin-left: 0;
  }
}

.col {
  width: 100%;
}
</style>


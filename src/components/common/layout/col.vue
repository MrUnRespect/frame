<template>
  <tools-container
    @delete-current="callParentCalcCount"
    :tools="tools"
    class="col-container"
    :position="this.index === this.realCount - 1 && this.index !== 0 ? 'right':'left'"
    :class="coluid"
    :style="widthStyle">
    <div class="col">
      <component v-for="(item, index) in currentValue.children"
      :key="index"
      :is="item.name"
      v-model="currentValue.children[index]"
      :index="index"
      :count="currentValue.children.length"
      ></component>
    </div>
  </tools-container>
</template>
<script>
import controlMixin from "./../mixins/control-mixin/index";
import analysisSetting from "@/common/analysisSetting";
import { mapState } from "vuex";
import { getStyle } from "wind-dom";
import when from "@/common/when";
let coluid = 0;
export default {
  props: { colCount: Number, realCount: Number },
  mixins: [controlMixin],
  data() {
    return {
      coluid: "coluid-" + coluid++
    };
  },
  computed: {
    tools() {
      let tools = [
        {
          name: "行",
          handler: e => this.addRow(e)
        },
        {
          name: "框",
          handler: e => this.addBox(e)
        }
      ];

      if (this.index === 0 && this.index !== this.realCount - 1) {
        tools.push({
          name: "并右",
          handler: e => this.mergeRight(e)
        });
      } else if (this.index === this.realCount - 1 && this.index !== 0) {
        tools.push({
          name: "并左",
          handler: e => this.mergeLeft(e)
        });
      } else if (this.index !== 0 && this.index !== this.realCount - 1) {
        tools.push(
          {
            name: "并左",
            handler: e => this.mergeLeft(e)
          },
          {
            name: "并右",
            handler: e => this.mergeRight(e)
          }
        );
      }

      return tools;
    },
    widthStyle() {
      return {
        width: `(${100 / this.colCount * this.currentValue.colspan}% - ${this
          .realMarginSize}px)`
      };
    }
  },
  watch: {
    realMarginSize() {
      this.calcRuntime();
    },
    colCount() {
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
      if (this.$root.preview) {
        let pe = 100 / this.colCount * this.currentValue.colspan;
        style.innerHTML = `.col-container.${this.coluid}{ width: ${pe}%;}`;
      } else {
        if (this.realCount > 1) {
          let fix = this.editModeMargin / this.colCount;
          let pe = 100 / this.colCount * this.currentValue.colspan;
          style.innerHTML = `.col-container.${this
            .coluid}{ width: calc(${pe}% + ${(this.currentValue.colspan - 1) *
            this.editModeMargin -
            (this.editModeMargin - fix) * this.currentValue.colspan}px); }`;
        } else {
          style.innerHTML = `.col-container.${this.coluid}{ width: 100%; }`;
        }
      }
    },
    mergeLeft({ clientX, clientY }) {
      this.$parent.$parent.mergeLeftColSpan(this.index);
      // this.toolsResize(clientX, clientY);
    },
    mergeRight({ clientX, clientY }) {
      this.$parent.$parent.mergeRightColSpan(this.index);
      // this.toolsResize(clientX, clientY);
    },
    addRow({ clientX, clientY }) {
      this.currentValue.children.push({
        name: "layout-row",
        type: "row",
        children: []
      });
      this.toolsResize(clientX, clientY);
    },
    addBox({ clientX, clientY }) {
      this.$root.$once("box-modal-close", ({ componentName, component }) => {
        let setting = analysisSetting(component.setting);
        let parentControl = this.walkUp(
          vue =>
            vue.isControl &&
            vue.currentValue.type &&
            vue.currentValue.type == "box"
        );
        if (parentControl) {
          let inner = parentControl.$refs.inner;
          setting.size =
            inner.size -
            (setting.margin[0] == null
              ? this.realMarginSize
              : setting.margin[0]) -
            (setting.margin[2] == null
              ? this.realMarginSize
              : setting.margin[2]);
        }
        this.currentValue.children.push({
          name: componentName,
          type: "box",
          setting,
          children: []
        });
      });

      this.$modal.show("box-modal");
      this.toolsResize(clientX, clientY);
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
    margin-left: editModeMargin;

    &:first-child {
      margin-left: 0;
    }
  }

  .preview .row & {
    margin-left: 0;

    &:first-child {
      margin-left: 0;
    }
  }
}

.col {
  width: 100%;
}
</style>


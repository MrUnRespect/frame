<template>
  <tools-container :tools="tools" :style="marginStyle">
    <div class="box-container">
      <slot></slot>
    </div>
  </tools-container>
</template>
<script>
  import controlMixin from "./../mixins/control-mixin/index";
  import analysisSetting from "@/common/analysisSetting";
  export default {
    mixins: [controlMixin],
    data() {
      return {
        isControl: false
      };
    },
    computed: {
      marginStyle() {
        let $parent = this.walkUp(vue => vue.isControl);
        let index = $parent.index;
        let count = $parent.count;
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
          ) +
          (this.$root.preview || count - 1 == index ? 0 : this.editModeMargin) +
          "px",
          marginLeft:
          this.calcRealSize(
            this.$parent.currentValue.setting.margin[3] !== null
              ? this.$parent.currentValue.setting.margin[3]
              : this.originalMarginSize
          ) + "px"
        };
      },
      tools() {
        let res = [
          {
            name: "行",
            handler: e => this.addRow(e)
          },
          {
            name: "框",
            handler: e => this.addBox(e)
          },
          {
            name: "内容",
            handler: e => this.addItem(e)
          }
        ];
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
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // 寻找父亲box控件
        let parentControl = this.walkUp(
          vue =>
            vue.isControl &&
            vue.currentValue.type &&
            vue.currentValue.type == "box"
        );

        // 监听父亲box的margin改变事件
        parentControl.$watch("currentValue.setting.margin", function () {
          this.$emit("box-self:sizeChange", { isMargin: true });
        });

        // 监听父亲box的size改变事件
        parentControl.$watch("currentValue.setting.size", function () {
          this.$emit("box-children:sizeChange");
        });

        parentControl.$on("box-children:sizeChange", function () {
          let list = this.walkDown(
            vue => vue.isControl && vue.walkUp(o => o.isControl) == parentControl,
            true
          );
          list.forEach(
            (vue, index, arr) =>
              vue.currentValue.type == "box"
                ? vue.$emit("box-self:sizeChange", { isMargin: false })
                : vue.$emit("resize")
          );
        });
        // 注册父亲box的marginChange事件

        // 这里的isMargin是用来标记是否为修改margin值
        parentControl.$on("box-self:sizeChange", function ({ isMargin = false }) {
          let inner = this.walkUp(vue => vue.isInner);
          if (!isMargin) {
            this.currentValue.setting.size =
              inner.size -
              (this.currentValue.setting.margin[0] == null
                ? this.realMarginSize
                : this.currentValue.setting.margin[0]) -
              (this.currentValue.setting.margin[2] == null
                ? this.realMarginSize
                : this.currentValue.setting.margin[2]);
          }
        });
      },
      addRow({ clientX, clientY }) {
        this.$parent.currentValue.children.push({
          name: "layout-row",
          type: "row",
          children: []
        });
        this.toolsResize(clientX, clientY);
      },
      addBox({ clientX, clientY }) {
        this.$root.$once("box-modal-close", ({ componentName, component }) => {
          let setting = analysisSetting(component.setting);
          let parentControl = this.walkUp(vue => vue.isControl);
          let inner = parentControl.$refs.inner;
          setting.size =
            inner.size -
            (setting.margin[0] == null
              ? this.realMarginSize
              : setting.margin[0]) -
            (setting.margin[2] == null ? this.realMarginSize : setting.margin[2]);
          this.$parent.currentValue.children.push({
            name: componentName,
            setting,
            type: "box",
            children: []
          });
        });
        this.$modal.show("box-modal");
        this.toolsResize(clientX, clientY);
      },
      addItem({ clientX, clientY }) {
        this.$root.$once("item-modal-close", ({ componentName, component }) => {
          let setting = analysisSetting(component.setting);
          this.$parent.currentValue.children.push({
            name: componentName,
            type: "item",
            setting
          });
        });
        this.$modal.show("item-modal");
        this.toolsResize(clientX, clientY);
      }
    }
  };

</script>
<style lang="stylus">
  .box-container {
    .preview & {
      padding-bottom: 0;
    }
  }
</style>
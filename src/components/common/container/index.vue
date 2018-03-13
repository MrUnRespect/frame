<template>
  <div class="control-item" :class="{ 'no-padding': noPadding, visible: visible }">
    <div class="control-border-vertical"></div>
    <div class="control-tools" :style="positionStyle">
      <span>
        {{ parent.currentValue.type ? parent.currentValue.type.replace(/^\w/ig,m=>m.toLocaleUpperCase()) : 'Frame' }}
        <i v-if="parent.currentValue.type == 'box' || parent.currentValue.type == 'item'">[ {{ parent.currentValue.name.replace('default-','@') }} ]</i>
        <i v-if="parent.currentValue.type == 'box' && parent.currentValue.name == 'default-source-base'">( {{ parent.currentValue.setting.sourceIndex }} )</i> 
      </span>
      <a v-if="hasDefault" href="javascript:;" class="tool" @click="del">删除</a>
      <a href="javascript:;" v-for="(item, index) in tools" class="tool" :key="index" @click="item.handler" v-text="item.name"></a>
    </div>
    <slot></slot>
    <div class="control-border-horizontal"></div>
  </div>
</template>
<script>
import elementFormPoint from "./elementFromPoint";
export default {
  data() {
    return {
      isControl: false,
      visible: false,
      instance: null
    };
  },
  props: {
    position: {
      type: String,
      default: "left",
      validator: function(value) {
        return ["left", "right"].indexOf(value) > -1;
      }
    },
    noPadding: {
      type: Boolean,
      default: false
    },
    hasDefault: {
      type: Boolean,
      default: true
    },
    tools: {
      type: Array,
      default: function() {
        [];
      }
    }
  },
  computed: {
    positionStyle() {
      if (this.position == "left") {
        return { left: 0 };
      } else return { right: 0 };
    },
    parent() {
      return this.walkUp(vue => vue.isControl);
    }
  },
  mounted() {
    elementFormPoint.add(this);
    this.$el.addEventListener("contextmenu", e => {
      let { clientX, clientY } = e;
      e.stopPropagation();
      e.returnValue = false;
      elementFormPoint.trigger(clientX, clientY, this);
      return false;
    });
    this.$el
      .querySelector(".control-tools")
      .addEventListener(
        "ontransitionend" in window ? "transitionend" : "webkitTransitionEnd",
        () => this.$emit("visible", this.visible)
      );
  },
  methods: {
    trigger(posx, posy) {
      elementFormPoint.trigger(posx, posy);
    },
    del({ clientX, clientY }) {
      let parent = this.$parent.$parent.$parent;
      do {
        if (parent.isControl) {
          parent.currentValue.children.splice(this.$parent.index, 1);
          break;
        }
      } while ((parent = parent.$parent));
      this.$emit("delete-current");
      this.$nextTick(() => this.trigger(clientX, clientY));
    },
    mouseenter(instance) {
      this.instance = instance;
      if (this.visible === false) this.visible = true;
    },
    mouseout() {
      if (this.instance) this.instance.destroyExcept();
      if (this.visible === true) this.visible = false;
    }
  }
};
</script>
<style lang="stylus">
.control-item {
  position: relative;
  min-height: 28px;
  background: alpha(baseColor, 0.1);
  padding: editModeMargin;
  box-sizing: border-box;
  transition: box-shado 0.2s ease;

  &.no-padding {
    padding: 0;
  }

  .control-border-horizontal, .control-border-vertical {
    &:after, &:before {
      transition: background 0.2s ease;
    }
  }

  .control-border-vertical {
    &:before, &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: baseColor;
    }

    &:after {
      right: -0.5px;
    }

    &:before {
      left: -0.5px;
    }
  }

  &.root-frame .control-border-vertical:before {
    left: 0px;
  }

  &.root-frame .control-border-vertical:after {
    right: 0px;
  }

  .control-border-horizontal {
    &:before, &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background: baseColor;
    }

    &:after {
      bottom: -0.5px;
    }

    &:before {
      top: -0.5px;
    }
  }

  &.root-frame .control-border-horizontal:after {
    bottom: 0px;
  }

  &.root-frame .control-border-horizontal:before {
    top: 0px;
  }

  &.visible {
    box-shadow: 0 0 5px darken(baseColor, 30);
    z-index: 999;

    &>.control-border-horizontal, &>.control-border-vertical {
      &:before, &:after {
        background: darken(baseColor, 30);
      }
    }

    &>.control-tools {
      border: 1px solid darken(baseColor, 30);
      height: 20px;
      margin-top: 0px;
      border-left-width: 1px;

      a {
        margin-top: 0px;
      }
    }
  }

  .preview & {
    border: 0px;
    padding: 0px;
    min-height: auto;
    margin: 0;
    background: transparent;

    .control-border-horizontal, .control-border-vertical {
      &:after, &:before {
        content: none;
      }
    }
  }

  .preview-print & {
    border: 0px;
    padding: 0px;
    min-height: auto;
    margin: 0;
    background: transparent;

    &.visible {
      box-shadow: none;
    }

    .control-tools {
      display: none;
    }

    .control-border-horizontal, .control-border-vertical {
      &:after, &:before {
        content: none;
      }
    }
  }

  &.is-full {
    height: 100%;
  }

  .control-tools {
    z-index: 1;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 0px;
    overflow: hidden;
    transition: height transitionDuration ease;
    font-size: 0px;
    white-space: nowrap;

    span {
      display: inline-block;
      vertical-align: top;
      height: 20px;
      line-height: 18px;
      font-size: 12px;
      padding: 0 10px;
      background: darken(baseColor, 30);
      color: white;
      cursor: pointer;

      i {
        color: baseColor;
      }
    }

    a {
      display: inline-block;
      vertical-align: top;
      height: 20px;
      line-height: 18px;
      padding: 0 5px;
      font-size: 12px;
      color: white;
      text-decoration: none;
      background: baseColor;
      margin-top: -20px;
      transition: margin-top transitionDuration ease;

      &:hover {
        background: baseColor + 50%;
      }
    }
  }
}
</style>



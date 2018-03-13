<template>
  <box-container>
    <div class="box-title-top-panel" :style="{
      background: background
    }">
      <div class="box-title-top-panel-title" :style="{ 
        height: unit(40), 
        lineHeight: unit(40),
        fontSize: unit(16),
        paddingLeft: unit(20),
        paddingRight: unit(20),
        background: titleColor
      }">{{ title }}</div>
      <box-inner :size="size - 40"></box-inner>
    </div>
  </box-container>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "测试标题"
    },
    titleColor: {
      type: String,
      default: "rgba(255,255,255,0.1)"
    },
    size: {
      type: Number,
      default: 400
    },
    background: {
      type: String,
      default: "transparent"
    },
    margin: {
      type: Array,
      default: function() {
        return [null, null, null, null];
      }
    }
  }
};
</script>
<style>
.box-title-top-panel {
  position: relative;
}

.box-title-top-panel-default {
  box-sizing: border-box;
  color: rgba(207, 221, 241, 0.5);
}
</style>
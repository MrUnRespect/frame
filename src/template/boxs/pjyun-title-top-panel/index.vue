<template>
  <box-container>
    <div class="pjyun-tile-top-panel">
      <div class="pjyun-tile-top-panel-title" :style="{
        top: unit(25),
        height: unit(38),
        lineHeight: unit(38),
        minWidth: unit(190),
        paddingLeft: unit(40),
        fontSize: unit(18)
      }">{{ title }}</div>
      <box-inner :size="size"></box-inner>
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
    size: {
      type: Number,
      default: 580
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
.pjyun-tile-top-panel {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
}
.pjyun-tile-top-panel-title {
  font-family: "幼体";
  position: absolute;
  left: 0;
  background: #0a375f;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
}
</style>
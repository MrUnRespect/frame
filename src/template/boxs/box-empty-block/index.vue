<template>
  <box-container>
    <div class="style-blank-panel" :style="{background:background}">
    <box-inner :size="size"></box-inner>
    </div>
  </box-container>
</template>
<script>
export default {
  props: {
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
.style-blank-panel {
  position: relative;
}

.style-blank-panel-default {
  /* background-color: rgba(64, 131, 229, 0.04); */
  /* border: 1px solid rgba(65, 133, 230, 0.23); */
  box-sizing: border-box;
  color: rgba(207, 221, 241, 0.5);
}
</style>
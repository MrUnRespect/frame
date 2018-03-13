<template>
  <box-container class="source-base" :data-source-index="sourceIndex">
    <box-inner :size="size"></box-inner>
  </box-container>
</template>
<script>
export default {
  props: {
    sourceIndex: {
      type: String,
      default: "1"
    },
    size: {
      type: Number,
      default: 400
    },
    margin: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0];
      }
    }
  },
  data() {
    return {
      isSource: true
    };
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
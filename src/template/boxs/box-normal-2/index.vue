<template>
  <box-container>
    <div class="panel-2">
        <div class="panel-2-title" :style="{ height: unit(lineHeight), lineHeight: unit(lineHeight),fontSize:unit(16) }">{{ title }}</div>
        <div class="panel-2-default">
          <box-inner :size="size"></box-inner>
        </div>
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
    title: {
      type: String,
      default: "style-one"
    },
    lineHeight: {
      type: Number,
      default: 30
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
.panel-2 {
  position: relative;
}

.panel-2-title {
  position: absolute;
  background-color: #2f5793;
  border-radius: 5px;
  font-size: 14px;
  padding: 0 10px;
  margin-left: 18px;
  transform: translate(0, -50%);
  color: #fff;
}

.panel-2-default {
  box-sizing: border-box;
  /* color: rgba(207, 221, 241, 0.5); */
}
</style>



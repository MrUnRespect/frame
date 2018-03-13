<template>
  <box-container>
    <div class="pjyun-margin">
      <box-inner :size="size"></box-inner>
    </div>
  </box-container>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 580
    },
    margin: {
      type: Array,
      default: function() {
        return [80, 20, 20, 20];
      }
    }
  }
};
</script>
<style>
</style>
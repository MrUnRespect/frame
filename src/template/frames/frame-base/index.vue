<template>
<div class="main">
  <h1 class="main-header">hello world!</h1>
  <div class="main-container" :style="{ width: unit(contentSize) }">
    <layout-base></layout-base>
    <layout-base></layout-base>
    <layout-base></layout-base>
    <layout-base></layout-base>
  </div>
</div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 1920
    },
    contentSize: {
      type: Number,
      default: 800
    },
    marginSize: {
      type: Number,
      default: 20
    }
  }
};
</script>

<style>
html {
  height: 100%;
}

body {
  min-height: 100%;
  height: auto;
  /* overflow-x: hidden; */
  background: url("/static/assets/test/bg.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.main {
  height: 100%;
  padding-top: 1px;
}
h1.main-header {
  height: 40px;
  padding: 20px;
  font-size: 20px;
  line-height: 20px;
}
.main-container {
  margin: 0 auto;
}
</style>


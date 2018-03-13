<template>
<div class="pjyun">
  <h1 class="pjyun-header" :style="{
    height: unit(90)
  }"></h1>
  <div class="pjyun-container" :style="{ width: unit(contentSize) }">
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
      default: 1854
    },
    marginSize: {
      type: Number,
      default: 6
    }
  }
};
</script>

<style>

@font-face {
  font-family: 'digital-font';
  src: url('/static/assets/pjyun/font/font.eot');
  src: url('/static/assets/pjyun/font/font.eot?#iefix') format('embedded-opentype'), url('/static/assets/pjyun/font/font.woff') format('woff'), url('/static/assets/pjyun/font/font.ttf') format('truetype'), url('/static/assets/pjyun/font/font.svg#font') format('svg');
}

.digital-font{
  font-family: 'digital-font'
}

html {
  height: 100%;
  font: 'Microsoft YaHei' #ffffff;
}

body {
  min-height: 100%;
  height: auto;
  /* overflow-x: hidden; */
  background: url("/static/assets/pjyun/background.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.pjyun {
  height: 100%;
  padding-top: 1px;
}
h1.pjyun-header {
  font-size: 0px;
  line-height: 0px;
  background: url("/static/assets/pjyun/title.png") no-repeat center;
}
.pjyun-container {
  margin: 0 auto;
}
</style>


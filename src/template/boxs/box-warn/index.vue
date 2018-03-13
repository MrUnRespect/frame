<template>
  <box-container>
    <div class="warn-panel">
      <div class="warn-panel-title" :style="{fontSize:unit(20),height:unit(30),lineHeight:unit(30),paddingLeft:unit(20),textAlign:'center'==titleCenter?'center':'left'}">
        <img src="/static/assets/icon-warn.png" :style="{width:unit(7),marginRight:unit(5),top:unit(-2)}"> 预警值：
      </div>
      <div class="warn-panel-default" :style="{ background: color }">
        <box-inner :size="size - 30"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    props: {
      titleCenter: {
        type: String,
        default: "left"
      },
      size: {
        type: Number,
        default: 400
      },
      color: {
        type: String,
        default: "transparent"
      },
      margin: {
        type: Array,
        default: function () {
          return [null, null, null, null];
        }
      }
    }
  };

</script>

<style>
  .warn-panel {
    position: relative;
  }

  .warn-panel-title {
    color: rgb(214, 80, 77);
  }

  .warn-panel-title img {
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .warn-panel-default {
    box-sizing: border-box;
  }
</style>
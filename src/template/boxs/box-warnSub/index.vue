<template>
  <box-container>
    <div class="warnSub-panel">
      <div class="warnSub-panel-title" :style="{fontSize:unit(16)}">
        <p class="warnSub-1" :style="{lineHeight:unit(20),paddingTop:unit(10),paddingBottom:unit(10)}">
          {{data.name}}
        </p>
        <p class="warnSub-2" :style="{lineHeight:unit(20)}">
          {{data.value}}% &nbsp; 较去年 <img src="/static/assets/icon-add.png" class="warnSub-icon" :style="{width:unit(11),top:unit(-2)}"> {{data.change}}
        </p>
      </div>
      <div class="warnSub-panel-default" :style="{ background: color }">
        <box-inner :size="size - 60"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          name: "",
          value: "",
          change: "",
          icon: ""
        },
        struct: {
          name: "完成率s",
          value: 50,
          change: "24%",
          icon: "/static/assets/icon-add.png"
        }
      }
    },
    props: {
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
      },
      sourcekey: {
        type: String,
        default: "data3"
      }
    }, methods: {
      update() {
        DataUtil.getData(this.source, this, data => {
          this.data = data[this.sourcekey];
        });
      }
    }
  };

</script>

<style>
  .warnSub-panel h1,
  .warnSub-panel p,
  .warnSub-panel ul {
    margin: 0;
    padding: 0;
  }

  .warnSub-panel {
    position: relative;
  }

  .warnSub-panel-title {
    color: rgb(214, 214, 214);
    width: 100%;
    text-align: center;
  }

  .warnSub-icon {
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .warnSub-panel-default {
    box-sizing: border-box;
  }
</style>
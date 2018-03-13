<template>
  <box-container>
    <div class="box-title-left-panel clearfix" :style="{ background: background }">
      <h1 class="box-title-left-panel-title" :style="{ 
        lineHeight: unit(lineHeight), 
        height: unitSize(size), 
        width: unit(30), 
        paddingLeft: unit(10), 
        paddingRight: unit(10),
        background: titleBackground
      }">
        <span class="box-title-left-panel-title-span" :style="{
          fontSize: unit(20),
          width: unit(30),
          paddingLeft: unit(10),
          paddingRight: unit(10)
        }">
          {{ title }}
        </span>
        <a :name="'item'+step"></a>
      </h1>
      <div class="box-title-left-panel-default" :style="{ marginLeft: unit(50) }">
        <box-inner :size="size"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
var step = 0;
export default {
  props: {
    size: {
      type: Number,
      default: 400
    },
    title: {
      type: String,
      default: "教 师 综  合  成  长  画  像"
    },
    lineHeight: {
      type: Number,
      default: 30
    },
    background: {
      type: String,
      default: "transparent"
    },
    titleBackground: {
      type: String,
      default: "rgba(0,0,0,0.5)"
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
      step: step++
    };
  }
};
</script>
<style>
.box-title-left-panel {
  position: relative;
}

.box-title-left-panel-title {
  position: absolute;
  left: 0;
  top: 0;
  background: red;
  color: #fff;
  margin: 0;
  white-space: initial;
  text-align: center;
  overflow: hidden;
  font-weight: normal;
}

.box-title-left-panel-title-span {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.box-title-left-panel-default {
  background-color: rgba(64, 131, 229, 0.04);
  box-sizing: border-box;
  color: rgba(207, 221, 241, 0.5);
  border: 1px solid rgba(65, 133, 230, 0.23);
}
</style>
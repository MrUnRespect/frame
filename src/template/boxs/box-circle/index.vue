<template>
  <box-container>
    <div class="circle-panel" :style="{ background:background}">
      <div class="circle-panel-title" :style="{fontSize:unit(16),height:unit(30),lineHeight:unit(30),color:titleColor,paddingBottom:unit(10)}">
        <div class="circle-left" :style="{marginLeft:unit(20)}">
          <img :src="iconUrl[iconIndex]" :style="{width:unit(18),marginRight:unit(5),top:unit(-2)}">  <span :style="{fontSize:unit(18)}">{{circleTitle}}</span>
        </div>
        <div class="circle-right" :style="{marginRight:unit(20)}" v-if="'1'==titleRightControl">
          <div class="circle-icon" :style="{width:unit(8),height:unit(8),top:unit(-1)}"></div>
          全院
        </div>
        <div class="circle-right" :style="{marginRight:unit(20)}" v-if="'2'==titleRightControl">
          个人评价 <span :style="{color:chooseColor(evaluate.index)}">{{evaluate.name}}</span>
        </div>

      </div>

      <div class="circle-panel-default">
        <box-inner :size="size - 40"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    data() {
      return {
        iconUrl: [
          "/static/assets/icon-1.png",
          "/static/assets/icon-2.png",
          "/static/assets/icon-3.png",
          "/static/assets/icon-4.png",
          "/static/assets/icon-5.png",
          "/static/assets/icon-6.png",
          "/static/assets/icon-7.png",
          "/static/assets/icon-8.png",

        ],
        evaluate: {
          name: "",
          index: 0
        },
        struct: {
       
          evaluate: {
            name: "B",
            index: 1
          }
        }
      }
    },
    props: {
      sourcekey: {
        type: String,
        default: "data1"
      },
      iconIndex: {
        type: Number,
        default: 0
      },
      titleRightControl: {
        type: String,
        default: "0"
      },
      circleTitle: {
        type: String,
        default: "社团指导"
      },
      titleColor: {
        type: String,
        default: "rgb(214, 80, 77)"
      },
      background: {
        type: String,
        default: "rgba(82,96,117,0.08)"
      },
      size: {
        type: Number,
        default: 400
      },
      margin: {
        type: Array,
        default: function () {
          return [null, null, null, null];
        }
      }
    },

    methods: {
      chooseColor(i) {
        var color = ["rgb(116,221,208)", "rgb(191,98,95)", "rgb(102,177,221)", "rgb(173,94,205)", "rgb(250,216,124)"]
        i = i % color.length
        return color[i]
      },
      update() {

        DataUtil.getData(this.source, this, data => {
          data = data[this.sourcekey];
          this.evaluate = data.evaluate
        });
      }
    }
  };

</script>

<style>
  .circle-panel {
    position: relative;
  }


  .circle-panel-default {
    box-sizing: border-box;
  }

  .circle-left {
    float: left;
    height: 100%;
  }

  .circle-left img {
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .circle-right {
    float: right;
    height: 100%;
    color: white;
  }

  .circle-icon {
    display: inline-block;
    vertical-align: middle;
    background: rgb(91, 195, 161);
    border-radius: 50%;
    position: relative;
  }
</style>
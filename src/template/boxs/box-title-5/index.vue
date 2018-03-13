<template>
  <box-container>
    <div class="box-title-5-panel" :style="{fontSize:unit(16)}">
      <div class="box-title-5-areaTitle" :style="{lineHeight:unit(40),paddingTop:unit(20),fontSize:unit(18),textAlign:areaTitleAlign,paddingLeft:areaPaddingLeft}"
        v-if="isAreaTitle">
        {{struct.areaTitle}}
      </div>
      <div class="box-title-5-msg">
        <div class="box-title-5-item" :style="{lineHeight:unit(40),color:'rgb(235,235,235)',textAlign:itemAlign,paddingLeft:itemPaddingLeft,fontSize:unit(16)}"
          v-for="item in titles">
          <span >{{item.name}}</span>
          <span class="box-title5-c1">{{item.num}}</span>
          <span>{{item.name2}}</span>
          <span class="box-title5-c2">{{item.per}}</span>
          <span>{{item.name3}}</span>
          <span class="box-title5-c3">{{item.per2}}</span>
          <img :src="item.icon" v-if="Img(item.icon)" class="box-title-5-icon" :style="{top:unit(-2)}">
          <span class="box-title5-c3"> {{item.tb}}</span>
        </div>
      </div>
      <div class="box-title-5-default" :size="size" :ss="size-40*floor-60">
        <box-inner :size="size-40*floor-areaSize"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    data() {
      return {
        struct: {
          areaTitle: "主持或参与重点课程建设项目",
          boxTitle: [
            {
              name: "国家级精品课程 XX门1 ", //nonecessary
              num: "XX", //nonecessary
              name2: "XX", //nonecessary
              per: "2%", //nonecessary
              name3: "XX", //nonecessary
              icon: "/static/assets/icon-add.png", //nonecessary
              tb: "XX" //nonecessary
            },
          ],
        }
      }
    },
    computed: {
      isAreaTitle() {
        return this.struct.areaTitle ? true : false
      },
      titles() {
        return this.struct.boxTitle ? this.struct.boxTitle : [];
      },
      areaSize() {
        return this.struct.areaTitle ? 60 : 0
      },
      floor() {
        return this.struct.boxTitle ? this.struct.boxTitle.length : 0
      }
    },
    props: {
      size: {
        type: Number,
        default: 400
      },
      margin: {
        type: Array,
        default: function () {
          return [0, 0, 0, 0];
        }
      },
      sourcekey: {
        type: String,
        default: "data1"
      },
      areaTitleAlign: {
        type: String,
        default: "left"
      },
      itemAlign: {
        type: String,
        default: "left"
      },
      itemPaddingLeft: {
        type: String,
        default: "10%"
      },
      areaPaddingLeft: {
        type: String,
        default: "10%"
      }
    }, methods: {
      Img(o) {
        return o ? true : false
      },
      update() {
        DataUtil.getData(this.source, this, data => {
          this.struct = data[this.sourcekey]
        });
      }
    }
  };

</script>

<style>

  .box-title-5-item {
    /* width: 48%; */
    box-sizing: border-box;
    width: 100%;
  }

  .box-title-5-areaTitle {
    color: rgb(211, 174, 72);
    box-sizing: border-box;
  }

  .box-title5-c1 {
    color: rgb(228, 112, 172);
  }

  .box-title5-c2 {
    color: rgb(162, 131, 46);
  }

  .box-title5-c3 {
    color: rgb(4, 160, 216);
  }

  .box-title-5-icon {
    position: relative;
    vertical-align: middle;
  }
</style>
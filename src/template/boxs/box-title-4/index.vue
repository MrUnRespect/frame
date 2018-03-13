<template>
  <box-container>
    <div class="box-title-4-panel" :style="{fontSize:unit(16)}">
      <div class="box-title-4-areaTitle" :style="{lineHeight:unit(40),paddingTop:unit(20),fontSize:unit(18),textAlign:areaTitleAlign}"
        v-if="isAreaTitle">
        {{struct.areaTitle}}
      </div>
      <div class="box-title-4-msg">
        <div class="box-title-4-item" :style="{lineHeight:unit(40),color:'rgb(235,235,235)',textAlign:itemAlign}"
          v-for="item in titles">
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
          <span>{{item.name2}}</span>
          <span>{{item.per}}</span>
          <img :src="item.icon" v-if="Img(item.icon)" class="box-title-4-icon" :style="{top:unit(-1)}">
          <span> {{item.tb}}</span>
        </div>
      </div>
      <div class="box-title-4-default" :size="size" :ss="size-40*floor-60">
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
              name: "国家级精品课程 XX门1 ",
              per: "2%",
              icon: "/static/assets/icon-add.png"
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
        return this.struct.boxTitle ? Math.ceil(this.struct.boxTitle.length / 2) : 0
      }
    },
    props: {
      size: {
        type: Number,
        default: 400
      },
      titleWidth: {
        type: String,
        default: "40%"
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
        default: "center"
      },
      itemAlign: {
        type: String,
        default: "center"
      }
    }, methods: {
      Img(o) {
        return o ? true : false
      },
      update() {
        DataUtil.getData(this.source, this, data => {
          this.struct = data[this.sourcekey]
          window.a = this.struct
        });
      }
    }
  };

</script>

<style>
  .box-title-4-item {
    display: inline-block;
    /* width: 48%; */
    box-sizing: border-box;
    width: 100%;
  }

  .box-title-4-areaTitle {
    color: rgb(211, 174, 72);
    box-sizing: border-box;
  }
  .box-title-4-icon{
    position: relative;
    vertical-align: middle;
  }
</style>
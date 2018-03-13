<template>
  <box-container>
    <div class="box-title-2-panel" :style="{fontSize:unit(16)}">
      <div class="box-title-2-msg">
        <p :style="{color:'rgb(211,174,72)',lineHeight:unit(30),fontSize:unit(18)}">
          {{areaTitle}}
        </p>
        <p v-for="item in data" :style="{lineHeight:unit(30),color:'rgb(215,215,215)'}">
          <span  class="box-title-2-name">
            {{item.name}}
          </span>
          <span class="box-title2-c2">{{item.num}}</span>
          <span   class="box-title-2-per box-title2-c1">{{item.per}}</span>
          <span  >{{item.name2}}</span>
          <span class="box-title2-c3">{{item.per2}}</span>
          <img :src="item.icon" :style="{width:unit(11),top:unit(-1)}" class="box-title-2-icon">
          <span  class="box-title2-c3">{{item.tb}}</span>
        </p>

      </div>
      <div class="box-title-2-default">
        <box-inner :size="size"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          areaTitle: ""
        },
        struct: {
          areaTitle: "科研成果获奖：",
          boxTitle: [
            {
              name: "国家品课程 XX门2 ",
              per: "2%",
              icon: "/static/assets/icon-add.png",
              ytitle: "科研成果获奖："
            },
            {
              name: "国家级精品课程 XX门2 ",
              per: "2%",
              icon: "/static/assets/icon-add.png"
            },
            {
              name: "国家级精品课程 XX门3 ",
              per: "2%",
              icon: "/static/assets/icon-add.png"
            },
          ],
        }
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
          return [20, 20, 20, 20];
        }
      },
      sourcekey: {
        type: String,
        default: "data1"
      }
    }, methods: {
      update() {
        DataUtil.getData(this.source, this, data => {
          this.data = data[this.sourcekey].boxTitle;
          this.areaTitle = data[this.sourcekey].areaTitle
        });
      }
    }
  };

</script>

<style>
  .box-title-2-panel {
    position: relative;
    color: rgb(213, 213, 213)
  }

  .box-title-2-panel p {
    margin: 0;
    padding: 0;
  }

  .box-title-2-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* width: 95%; */
  }

  .box-title-2-per,
  .box-title-2-icon {
    /* float: left; */
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .box-title-2-name{
    display: inline-block;
  }
  .box-title2-c1 {
    color: rgb(228,112,172);
  }

  .box-title2-c2 {
    color: rgb(228,112,172);
  }
  .box-title2-c3 {
    color: rgb(4,160,216);
  }
</style>
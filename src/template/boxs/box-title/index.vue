<template>
  <box-container>
    <div class="box-title-panel" :style="{fontSize:unit(16)}">
      <p class="box-title-areaTitle" :style="{lineHeight:unit(30),textAlign:'left',paddingLeft:'10%',color:'rgb(232,190,75)',fontSize:unit(18)}" v-if="isAreaTitle">{{struct.areaTitle}}</p>
      <div class="box-title-msg" :style="{lineHeight:unit(30),paddingTop:unit(10)}">
        <span v-for="item in data" :style="{width:titleWidth,color:'rgb(215,215,215)'}">
          <span class="box-title-b">
            <span :class="{'box-title-yellow':item.deep}">{{item.name}}</span>
        <span class="box-title-c1">{{item.num}}</span>
        </span>
        <span>{{item.name2}}</span>
        <span class="box-title-c2">{{item.per}}</span>
        <img :src="item.icon" :style="{width:unit(11),top:unit(-1)}" class="box-title-icon">
        <span>{{item.name3}}</span>
        <span class="box-title-c3">{{item.tb}}</span>
        </span>
      </div>
      <div class="box-title-default" :data-a="floor">
        <box-inner :size="areaSize"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
  export default {
    data() {
      return {
        data: {

        },
        floor: 0,
        struct: {
          areaTitle: "主持或参与重点课程建设项目",
          boxTitle: [
            {
              name: "国家级精品课程 XX门1 ",
              per: "2%",
              icon: "/static/assets/icon-add.png"
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
          ]
        }
      }
    },
    computed: {
      areaSize() {
        return this.size - this.floor * 30 - 10 - (this.isAreaTitle ? 30 : 0)
      },
      isAreaTitle() {
        return !!this.struct.areaTitle
      }
    },
    props: {
      areapaddingleft: {
        type: String,
        default: "10%"
      },
      areaTextAlign: {
        type: String,
        default: "left"
      },
      size: {
        type: Number,
        default: 400
      },
      titleWidth: {
        type: String,
        default: "50%"
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
      }
    }, methods: {
      update() {
        DataUtil.getData(this.source, this, data => {
          this.data = data[this.sourcekey].boxTitle;
          var num = this.data.length;
          this.floor = Math.ceil(num / 2);
          this.struct = data[this.sourcekey];
        });
      }
    }
  };

</script>

<style>
  .box-title-panel .box-title-msg .box-title-yellow {
    color: rgb(211, 174, 72) !important;
  }

  .box-title-panel P {
    margin: 0;
    padding: 0;
  }

  .box-title-panel .box-title-msg {
    width: 80%;
    margin-left: 10%;
  }

  .box-title-panel .box-title-msg>span {
    color: rgb(214, 214, 214);
    float: left;
    text-align: left;
    /* width: 40%; */
    /* margin: 0 5%; */
  }

  .box-title-panel .box-title-msg span b,
  .box-title-panel .box-title-msg span i {
    font-weight: normal;
    font-style: normal;
  }

  .box-title-panel .box-title-msg span img,
  .box-title-panel .box-title-msg span span {
    /* float: right; */
    display: inline-block;
  }



  .box-title-panel .box-title-msg span img {
    /* margin-right: 2% */
    /* float: left; */
  }

  .box-title-msg:after {
    content: "";
    display: table;
    clear: both;
  }

  .box-title-content img {
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  .box-title-panel .box-title-msg .box-title-c1 {
    color: rgb(228, 112, 172);
  }

  .box-title-panel .box-title-msg .box-title-c2 {
    color: rgb(4, 160, 216);
  }

  .box-title-panel .box-title-msg .box-title-c3 {
    color: rgb(211, 174, 72);
  }

  .box-title-icon {
    position: relative;
    vertical-align: middle;
    display: inline-block
  }
</style>
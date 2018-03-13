<template>
  <box-container>
    <div class="box-broken-2-panel">
      <div class="box-broken-2-panel-title" :style="{fontSize:unit(16),height:unit(50),paddingLeft:unit(20),paddingBottom:unit(10)}">
        <p :style="{lineHeight:unit(30)}" >
          <span :style="{color:'rgb(232, 190, 75)'}">教师个人综合成长指数：</span>
           <span style="color:rgb(204,167,70)">
             {{data.title.per}}
             </span> 同比：
            <img :src="data.title.icon" :style="{top:unit(-2)}">         
            <span style="color:rgb(187,94,93)">{{data.title.tb}}</span>
            <span :style="{color:'rgb(232, 190, 75)',marginLeft:unit(5)}">
               {{data.title.title1}}
            </span>
            <span>
              {{data.title.sub1}}
            </span>
            <span :style="{color:'rgb(232, 190, 75)',marginLeft:unit(5)}">
               {{data.title.title2}}
            </span>
            <span>
               {{data.title.sub2}}
            </span>
        </p>
        <p :style="{lineHeight:unit(20)}">
          (注:教师综合成长指数由学生管理与社会服务、教学能力、科研能力、成长 能力、考核评价五个层面指标评分加权平均得出。)
        </p>
      </div>
      <div class="box-broken-2-panel-default" :style="{ background: color }">
        <box-inner :size="size-60"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
export default {
  data() {
    return {
      data: {
        title: {
          per: "XX",
          tb: "XXX",
          icon: "/static/assets/icon-reduce.png"
        }
      },
      struct: {
        title: {
          per: "XX",
          tb: "XXX",
          icon: "/static/assets/icon-reduce.png"
        }
      }
    };
  },
  props: {
    sourcekey: {
      type: String,
      default: "data1"
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
      default: function() {
        return [null, null, null, null];
      }
    }
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        this.data = data[this.sourcekey];
      });
    }
  }
};
</script>

<style>
.box-broken-2-panel {
  position: relative;
}

.box-broken-2-panel p {
  margin: 0;
  padding: 0;
}

.box-broken-2-panel-title {
  color: rgb(245, 245, 245);
}

.box-broken-2-panel-title p:nth-child(2) {
  color: rgb(148, 148, 148);
}

.box-broken-2-panel-title img {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.box-broken-2-panel-default {
  box-sizing: border-box;
}
.box-broken-2-panel-title span {
  display: inline-block;
}
</style>
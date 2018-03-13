<template>
  <box-container>
    <div class="box-broken-panel">
      <div class="box-broken-panel-title" :style="{fontSize:unit(16),height:unit(30),lineHeight:unit(30),paddingLeft:unit(20),paddingBottom:unit(10)}">
        任职5年及以上：<span>{{data.number}}人</span> ，占比： <span>{{data.per}}</span> ，同比：<img :src="data.icon" :style="{width:unit(11),marginRight:unit(5),top:unit(-2)}">        <span>{{data.tb}}</span>
      </div>
      <div class="box-broken-panel-default" :style="{ background: color }">
        <box-inner :size="size-40"></box-inner>
      </div>
    </div>
  </box-container>
</template>
<script>
export default {
  props: {
    sourcekey: {
      type: String,
      default: "data2"
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
  data() {
    return {
      data: {
        number: "",
        per: "",
        tb: "",
        icon: ""
      }
    };
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, res => {
        var data = res[this.sourcekey];
        this.data = data.title;
      });
    }
  }
};
</script>

<style>
.box-broken-panel {
  position: relative;
}

.box-broken-panel-title {
  color: rgb(245, 245, 245);
}

.box-broken-panel-title span:nth-child(1) {
  color: rgb(102, 194, 184);
}

.box-broken-panel-title span:nth-child(2) {
  color: rgb(184, 151, 65);
}

.box-broken-panel-title span:nth-child(3) {
  color: rgb(98, 170, 203);
}

.box-broken-panel-title img {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.box-broken-panel-default {
  box-sizing: border-box;
}
</style>
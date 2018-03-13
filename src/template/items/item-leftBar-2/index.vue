<template>
    <item-container>
      <div class="item-leftBar-2-one" :style="{fontSize:unit(16)}" v-for="item in struct">
          <div class="item-leftBar-2-title" :style="{lineHeight:unit(40)}" :style="{fontSize:unit(20)}">{{item.title}}</div>
          <div class="item-leftBar-2-msg" :style="{lineHeight:unit(40),paddingLeft:unit(20),paddingRight:unit(20),marginTop:unit(20)}">{{item.msg}}</div>
      </div>
    </item-container>
</template>
<script>
export default {
  data() {
    return {
      struct: {}
    };
  },
  props: {
    sourcekey: {
      type: String,
      default: "data1"
    }
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        this.struct = data[this.sourcekey];
      });
    }
  }
};
</script>
<style>
.item-leftBar-2-one {
  display: inline-block;
  width: 30%;
  text-align: center;
}
.item-leftBar-2-title {
  color: rgb(211, 174, 72);
}
.item-leftBar-2-msg {
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  background: rgba(33, 131, 236,0.3);
  color: rgb(235, 235, 235);
}
</style>
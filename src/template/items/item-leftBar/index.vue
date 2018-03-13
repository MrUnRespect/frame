<template>
    <item-container>
         <div class="item-leftBar" :style="{fontSize:unit(16)}">
      <div class="item-leftBar-title" :style="{fontSize:unit(20),marginTop:unit(10),marginBottom:unit(20)}">
          {{
              struct.title
          }}
      </div>
      <div class="item-leftBar-msg" :style="{lineHeight:unit(40),paddingLeft:unit(20),paddingRight:unit(20)}">
          {{struct.msg}}
      </div>
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
.item-leftBar-title {
  color: rgb(211, 174, 72);
  margin-left: 2%;
}
.item-leftBar-msg {
  background: rgba(33, 131, 236,0.3);
  border-radius: 5px;
  margin-left: 4%;
  display: inline-block;
  color: rgb(235, 235, 235);
}
</style>
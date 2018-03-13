<template>
    <item-container>
        <div class="leftbar-3" :style="{fontSize:unit(20)}">
           <div class="leftbar-3-title">{{struct.areaTitle}}</div>
           <div class="leftBar-3-msg">
             <li  :key="i" v-for="(item,i) in struct.school" >
                <a :href="item.href" :style="{minWidth:unit(100), fontSize:unit(16),paddingLeft:unit(8),paddingRight:unit(8),lineHeight:unit(40),marginRight:unit(20),marginTop:unit(20)}">
                 {{item.name}}
                </a>
            </li>
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
.leftbar-3-title {
  color: rgb(211, 174, 72);
}
.leftBar-3-msg :after {
  content: "";
  display: table;
  clear: both;
}
.leftBar-3-msg > li {
  float: left;
  width: 33%;
  text-align: center;
}
.leftBar-3-msg a {
  display: inline-block;
  background: rgb(56, 87, 35);
  color: white;
  border-radius: 5px;
  color: rgb(213, 213, 213);
  text-decoration: none;
  text-align: center;
}
</style>
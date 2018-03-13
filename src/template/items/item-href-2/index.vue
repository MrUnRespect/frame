<template>
<item-container>
    <div class="item-href-2" :style="{fontSize:unit(16)}">
        <div class="item-href-2-top" :style="{marginTop:unit(20),marginBottom:unit(15)}">
            <a :href="item.href" :style="{lineHeight:unit(30),fontSize:unit(20)}" v-for="item in struct.list1">{{item.name}}</a>
        </div>
        <h1 class="item-href2-color" :style="{fontSize:unit(20)}">部门</h1>
        <div class="item-href-2-left">
            <a :href="item.href" v-for="item in struct.list2" :style="{lineHeight:unit(30),marginLeft:unit(10)}">{{item.name}}</a>

        </div>
        <h1 class="item-href2-color" :style="{fontSize:unit(20)}">学院</h1>
        <div class="item-href-2-right">
            <a v-for="item in struct.list3" :href="item.href" :style="{lineHeight:unit(30),marginLeft:unit(10)}">{{item.name}}</a>
        </div>
</item-container>
</template>
<script>
export default {
  props: {
    sourcekey: {
      type: String,
      default: "data1"
    }
  },
  data: function() {
    return {
      struct: {
        list1: [
          {
            name: "",
            href: ""
          }
        ],
        list2: [
          {
            name: "",
            href: ""
          }
        ],
        list3: [
          {
            name: "",
            href: ""
          }
        ]
      }
    };
  },
  methods: {
    update: function() {
      var t = this;
      DataUtil.getData(this.source, this, function(e) {
        t.struct = e[t.sourcekey];
      });
    }
  }
};
</script>

<style>
.item-href-2 {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.item-href-2-top a {
  color: rgb(240, 189, 39);
  text-decoration: none;
  font-weight: bold;
}

.item-href-2-left,
.item-href-2-right {
  float: left;
  white-space: normal;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}

.item-href-2-left:after,
.item-href-2-right:after {
  content: "";
  clear: both;
  display: table;
}

.item-href-2-left a,
.item-href-2-right a {
  float: left;
  color: #00addc;
  text-decoration: none;
}

.item-href2-color {
  color: rgb(240, 189, 39);
  float: left;
  margin-left: 10.7%;
}
.item-href-2-top {
  text-align: left;
  padding-left: 10.7%;
}
</style>
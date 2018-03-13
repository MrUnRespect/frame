<template>
    <item-container>
        <div class="page2-msg" :style="{fontSize:unit(16)}">
            <div class="page2-msg-item" :style="{marginTop:unit(20)}" v-for="(item,i) in struct.msg" :key="i" >
                <div class="page2-msg-title">
                    <span :style="{paddingLeft:unit(10),paddingRight:unit(10),height:unit(35),lineHeight:unit(35)}">
                        {{item.title}}
                    </span>
                </div>
                <div class="page2-msg-sub" :style="{marginTop:unit(10)}">
                    <span :style="{paddingLeft:unit(10),paddingRight:unit(10),height:unit(35),lineHeight:unit(35)}">
                        {{item.sub}}
                    </span>
                </div>
            </div>
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

  data() {
    return {
      struct: {
        msg: [
          {
            title: "项目",
            sub: "学生管理与社会服务"
          },
          {
            title: "个人得分",
            sub: "18"
          },
          {
            title: "全院排名",
            sub: "18"
          },
          {
            title: "全校排名",
            sub: "18"
          }
        ]
      }
    };
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        this.struct = data[this.sourcekey];
        console.log("!!!!");
        console.log(this.struct);
      });
    }
  }
};
</script>
<style>
h1,
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.page2-msg {
  color: rgb(213, 213, 213);
}
.page2-msg-title {
  text-align: center;
}
.page2-msg-title span {
  background: rgb(0, 112, 192);
  display: inline-block;
  border-radius: 5px;
}
.page2-msg-sub {
  text-align: center;
}
.page2-msg-sub span {
  display: inline-block;
  border: 1px solid rgb(213,213,213);
}
</style>
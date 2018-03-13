<template>

  <div class="cs-wrapper cs-common">
    <div class="cs-head" :style="{height:unit(160),lineHeight:unit(160)}">
      <!-- <img src="/static/assets/title-2.png" class="cs-title" :style="{width:unit(698)}"> -->
      <h1  class="cs-title" :style="{fontSize:unit(40)}">{{title}}</h1>
      <a name="top"></a>
    </div>
    <div class="cs-person" :style="{fontSize:unit(20),lineHeight:unit(60),width:unit(contentSize-40),marginLeft:'auto',marginRight:'auto',marginBottom:unit(30)}">
      个人信息
    </div>
    <div class="cs-top" :style="{ width: unit(contentSize)}">
      <layout-base></layout-base>
    </div>
    <!-- menu -->
    <ul class="cs-menu" :style="{ width: unit(contentSize-40)}">
      <li :style="{marginRight:unit(marginR(i)),fontSize:unit(16) }" v-for="(item,i) in menuMsg" @click="goItem(i)">
        <a :href="'#'+'item'+i" :style="{ width:unit(200),height:unit(45),lineHeight:unit(45)}">
          {{item}}
        </a>
      </li>
    </ul>

 <ul class="cs-menu-left" :style="{top:unit(247),fontSize:unit(16)}">
        <li class="on" :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教师概况</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教学成果</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教学能力</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教师成长</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">学生管理与 社会服务</li>
      </ul>

    <a class="cs-goTop" href="#top">
      <img src="/static/assets/goTop.png" alt="">
    </a>
    <div class="cs-main" :style="{ width: unit(contentSize)}">
      <layout-base></layout-base>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      menuMsg: ["导航", "教师综合成长画像", "学生管理与社会服务", "教学能力", "科研能力", "成长能力", "考核评价"]
    };
  },
  methods: {
    marginR(i) {
      if (i < 6) {
        return 40;
      } else {
        return 0;
      }
    },
    goItem(i) {
      console.log(i);
    }
  },
  props: {
    title: {
      type: String,
      default: "南京工业职业技术学院教师个人画像"
    },
    size: {
      type: Number,
      default: 1920
    },
    contentSize: {
      type: Number,
      default: 1680
    },
    marginSize: {
      type: Number,
      default: 20
    }
  }
};
</script>

<style>
html {
  height: 100%;
}

.cs-head {
  margin: 0;
}

body {
  min-height: 100%;
  height: auto;
  /* overflow-x: hidden; */
  background: url("/static/assets/bg.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

h1,
h2,
h3,
h4,
h5,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

.cs-wrapper .cs-top {
  margin: 0 auto;
}

.cs-wrapper .cs-head {
  height: 160px;
  line-height: 160px;
  text-align: center;
  position: relative;
}

.cs-wrapper .cs-title {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: rgb(37, 116, 205);
  width: 100%;
}

.cs-main {
  /* border: 1px solid red; */
  min-height: 200px;
  margin: 0 auto;
  /* margin-top: 40px; */
}

.cs-person {
  color: rgb(235, 235, 235);
  text-align: center;
  background: rgba(64, 131, 229, 0.5);
}

.cs-menu {
  margin: 0 auto;
  /* text-align: center; */
  /* margin-bottom: 25px; */
}

.cs-menu > li {
  display: inline-block;
  color: white;
  overflow: hidden;
  text-align: center;
}
.cs-menu a {
  display: inline-block;
  color: white;
  text-decoration: none;
}
.cs-menu > li:nth-child(1) {
  background: rgba(64, 131, 229, 0.5);
}

.cs-menu > li:nth-child(2) {
  background: rgba(232, 190, 75, 0.26);
}

.cs-menu > li:nth-child(3) {
  background: rgba(137, 239, 228, 0.26);
}

.cs-menu > li:nth-child(4) {
  background: rgba(108, 176, 243, 0.26);
}

.cs-menu > li:nth-child(5) {
  background: rgba(124, 153, 91, 0.26);
}

.cs-menu > li:nth-child(6) {
  background: rgba(237, 116, 178, 0.26);
}

.cs-menu > li:nth-child(7) {
  background: rgba(64, 131, 229, 0.26);
}
.cs-goTop {
  position: fixed;
  right: 2%;
  bottom: 5%;
  cursor: pointer;
}

.cs-menu-left {
  position: absolute;
  list-style: none;
  padding: 0;
}

.cs-menu-left > li {
  /* width: 90px;
    margin-top: 3px;
    padding: 20px 0; */
  text-align: center;
  background: rgba(82, 96, 117, 0.26);
  color: rgb(235, 235, 235);
}

.cs-menu-left > li.on {
  background: #7c995b;
}
</style>
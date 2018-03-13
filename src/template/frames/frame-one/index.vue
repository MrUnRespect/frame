<template>
  <!-- <div class="main">
    <h1 class="main-header">123123</h1>
    <div class="main-container">
      <layout-base></layout-base>
    </div>
  </div> -->
  <div class="cs-wrapper cs-common">
    <div class="cs-head" :style="{height:unit(160),lineHeight:unit(160)}">
      <!-- <img src="/static/assets/title.png" class="cs-title" :style="{width:unit(698)}"> -->
      <h1 class="cs-title" :style="{fontSize:unit(40)}">{{title||'南京工业职业技术学院教师概况'}}</h1>
    </div>
    <ul class="cs-menu-top" :style="{ width: unit(contentSize),height:unit(45)}">
      <li v-for="x in 15" :key="x" :class="{ on: x == 1 }" :style="{ fontSize: unit(16) ,width: unit((contentSize - (18 * 14)) / 15),height:unit(45),lineHeight:unit(45),marginLeft: x == 1 ? 0 : unit(18)}">{{ x===1 ? '全校':'学院'}}</li>

    </ul>
    <div class="clearfix">
      <ul class="cs-menu-left" :style="{top:unit(247),fontSize:unit(16)}">
        <li class="on" :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教师概况</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教学成果</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教学能力</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">教师成长</li>
        <li :style="{width:unit(90),paddingTop:unit(20),paddingBottom:unit(20),marginTop:5}">学生管理与 社会服务</li>
      </ul>
      <div class="cs-main" :style="{ width: unit(contentSize), marginRight: unit(116),marginTop:unit(20) }">
        <layout-base></layout-base>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: "南京工业职业技术学院教师概况"
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

  ul,
  h1,
  h2,
  h3 {
    padding: 0;
    margin: 0;
  }

  .cs-main {
    float: right;
  }

  .cs-head {
    margin: 0;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  body {
    min-height: 100%;
    height: auto;
    /* overflow-x: hidden; */
    background: url("/static/assets/bg.jpg") no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  .cs-wrapper .cs-head {
    /* height: 160px; */
    /* line-height: 160px; */
    text-align: center;
  }

  .cs-wrapper .cs-title {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: rgb(37, 116, 205);
  }

  .cs-menu-top {
    /* width: 1680px; */
    /* height: 45px; */
    margin: 0 auto;
  }

  .cs-menu-top>li {
    float: left;
    list-style: none;
    /* width: 95px; */
    /* height: 45px; */
    /* line-height: 45px; */
    color: rgb(235, 235, 235);
    background: rgba(82, 96, 117, .26);
    text-align: center;
    /* margin-left: 18.21px; */
    position: relative;
    /* overflow: hidden; */
    border-radius: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cs-menu-top>li:nth-child(1) {
    margin-left: 0;
  }

  .cs-menu-top>li:hover {
    background: rgb(64, 131, 229)
  }

  .cs-menu-top>li.on {
    background: rgb(64, 131, 229)
  }

  .cs-menu-top>li:hover:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid rgb(64, 131, 229);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
  }

  .cs-menu-left {
    float: left;
    list-style: none;
    padding: 0
  }

  .cs-menu-left>li {
    /* width: 90px;
    margin-top: 3px;
    padding: 20px 0; */
    text-align: center;
    background: rgba(82, 96, 117, .26);
    color: rgb(235, 235, 235);
  }

  .cs-menu-left>li.on {
    background: #7c995b;
  }
</style>
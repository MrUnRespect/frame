<template>
  <item-container>
    <div class="pjyun-warn-panel">
      <div class="pjyum-warn-panel-title" :style="{
        height: unit(headerSize)
      }">
      <div class="pjyum-warn-panel-warn-icon begin-warn" :class="{'begin-warn': begindWarn}" :style="{
        width: unit(20),
        height: unit(23),
        right: unit(30)
      }">
        <span class="warn-animate-background"></span>
        <span class="warn-animate" :style="{
          width: unit(10),
          height: unit(13)
        }"></span>

      </div>
      </div>
      <div class="pjyum-warn-panel-default" :style="{
        height: computedSize - calcRealSize(headerSize) + 'px'
      }">
      <transition-group name="roll" v-on:after-leave="afterLeave">
      <div class="pjyum-warn-panel-default-item" v-for="page in pageCount" :key="page" v-show="(page - 1) == pageIndex">
        <template  v-for="rowIndex in 3">
        <div class="row"  :key="'row' + rowIndex + (page - 1) * pageSize" :class="['roll-delay-' + rowIndex]"  :style="{
          height: ((computedSize - calcRealSize(headerSize)) / 3) + 'px'
        }">
          <template  v-for="colIndex in 3">
            <div class="col"  :key="'row' + rowIndex + 'col' + colIndex + (page - 1) * pageSize" :style="{
              height: ((computedSize - calcRealSize(headerSize)) / 3) + 'px'
            }">
            <template v-if="(page - 1) * pageSize + (rowIndex - 1) * 3 + colIndex - 1 <= count - 1">
              <div class="pjyum-warn-circle" :class="[gLevel(struct[ (page - 1) * pageSize + (rowIndex - 1) * 3 + colIndex - 1 ].value)]">
                <span :style="{
                  fontSize: unit(24)
                }">
                  {{ struct[ (page - 1) * pageSize + (rowIndex - 1) * 3 + colIndex - 1 ].value }}
                  <i>天</i>
                </span>
              </div>
              <h3>{{ struct[ (page - 1) * pageSize + (rowIndex - 1) * 3 + colIndex - 1 ].name }}</h3>
            </template>
            </div>
          </template>
        </div>
        </template>
      </div>
      </transition-group>
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
  computed: {
    begindWarn(){
      let l = this.struct.length - 1
      for(var i = 0; i < l; i ++){
        if(this.struct.value >= 30) return true
      }
      return false;
    },
    computedSize() {
      return parseFloat(this.unitSize(this.size));
    },
    count() {
      return this.struct.length;
    },
    pageCount() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  data() {
    return {
      headerSize: 45,
      pageSize: 9,
      pageIndex: 0,
      struct: Array.from(new Array(30)).map((o, index) => ({
        name: "成都市某学校" + index,
        value: 30 - index
      }))
    };
  },
  mounted(){
    this.animate();
  },
  methods: {
    afterLeave(){
      this.animate()
    },
    animate(){
      setTimeout(()=>{
        if(this.pageIndex >= this.pageCount - 1) this.pageIndex = 0;
        else this.pageIndex ++
      }, 5000);
    },
    gLevel(val) {
      return val >= 30
        ? "serious"
        : val >= 25 ? "generic" : val >= 20 ? "warn" : "normal";
    },
    update() {
      DataUtil.getData(this.source, this, res => {
        this.struct = res[this.sourcekey];
      });
    }
  }
};
</script>
<style>
.roll-enter {
  transform: translateX(100%);
}
.roll-enter .roll-delay-1{
  transform: translateX(100%)
}
.roll-enter .roll-delay-2{
  transform: translateX(100%)
}
.roll-enter .roll-delay-3{
  transform: translateX(100%)
}
.roll-enter-active {
  transition: transform 1s ease;
}
.roll-enter-active .roll-delay-1{
  transition: transform 0.5s ease;
}
.roll-enter-active .roll-delay-2{
  transition: transform 0.75s ease;
}
.roll-enter-active .roll-delay-3{
  transition: transform 1s ease;
}
.roll-enter-to {
  transform: translateX(0)
}
.roll-enter-to .roll-delay-1{
  transform: translateX(0)
}
.roll-enter-to .roll-delay-2{
  transform: translateX(0)
}
.roll-enter-to .roll-delay-3{
  transform: translateX(0)
}
.roll-leave {
  transform: translateX(0)
}
.roll-leave-active {
  transition: transform 0.5s ease;
}
.roll-leave-to {
  transform: translateX(-100%);
}

.pjyun-warn-panel .row {
  font-size: 0;
}
.pjyun-warn-panel .col {
  width: 33.3333%;
  display: inline-block;
  overflow: hidden;
}
.pjyun-warn-panel .col h3 {
  margin: 0;
  padding: 0;
  text-align: center;
  color: #c3c3c3;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pjyum-warn-panel-title {
  position: relative;
}
.pjyum-warn-panel-warn-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: url("/static/assets/pjyun/warn.png") no-repeat;
  background-size: contain;
}
.pjyum-warn-panel-warn-icon span.warn-animate{
  position: absolute;
  top: 50%;
  margin-left: -1px;
  left: 50%;
  transform: translate(-50%,-50%);
  background: url("/static/assets/pjyun/flash.png") no-repeat center;
  background-size: contain;
}
.pjyum-warn-circle {
  padding-top: 100%;
  position: relative;
  background: url("/static/assets/pjyun/c1.png") no-repeat center;
  background-size: 80%;
}
.pjyum-warn-circle span {
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pjyum-warn-circle.serious {
  background-image: url("/static/assets/pjyun/c4.png");
}
.pjyum-warn-circle.generic {
  background-image: url("/static/assets/pjyun/c3.png");
}
.pjyum-warn-circle.warn {
  background-image: url("/static/assets/pjyun/c2.png");
}
.pjyum-warn-circle.serious span {
  color: #a14343;
}
.pjyum-warn-circle.generic span {
  color: #e2853a;
}
.pjyum-warn-circle.warn span {
  color: #e2c43a;
}
.pjyum-warn-circle.normal span {
  color: #4481b5;
}
.pjyum-warn-circle span i {
  font-size: 0.4em;
  font-weight: normal;
  color: #c3c3c3;
  font-style: normal;
}

.pjyum-warn-panel-default{
  position: relative;
  overflow: hidden;
}
.pjyum-warn-panel-default .pjyum-warn-panel-default-item{
  width: 100%;
  position: absolute;
  top: 0;
}
@keyframes warn-animate-scale{
  0% {
    transform: rotateY(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: rotateY(1);
  }
}
@keyframes warn-animate{
  0% {
    transform: rotateY(0deg) translate(-50%,-50%);
  }
  50% {
    transform: rotateY(180deg) translate(-50%,-50%);
  }
  100% {
    transform: rotateY(360deg) translate(-50%,-50%);
  }
}
.pjyum-warn-panel-warn-icon.begin-warn:after{
  content: '';
  display: block;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 0 200px 80px rgba(255,0, 0, 0.5);
  animation-name: warn-animate-scale;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.warn-animate-background{
  osition: relative;
}
.begin-warn .warn-animate-background:before,.begin-warn .warn-animate-background:after{
  content: '';
  display: block;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  animation-name: warn-animate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.begin-warn .warn-animate-background:before{
  box-shadow: 0 0 80px 20px rgba(255,0, 0, 1);
  animation-delay: 0.25s; 
}
.begin-warn .warn-animate-background:after{
  box-shadow: 0 0 80px 20px rgba(0,0, 255, 1);
  animation-delay: 0s;
}
.begin-warn .warn-animate{
  /* box-shadow: 0 0 100px 30px rgba(255,0,0,1); */
  position: relative;
  transform-origin: left;
  animation-name: warn-animate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}
</style>
<template>
<transition name="fade">
  <div class="system-mask" @click="tip" v-show="visible" :class="{ hidden: !textState }">
    <div :class="{visible: textState}">
      <svg xmlns="http://www.w3.org/2000/svg" width="73px" height="73px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ball2">
        <g transform="translate(0,-15)">
          <circle cx="50" r="26.6061" cy="32" fill="#a9f5c2" transform="rotate(210.539 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
            <animate attributeName="r" calcMode="spline" values="0;30;0" keyTimes="0;0.5;1" dur="1" keySplines="0.2 0 0.8 1;0.2 0 0.8 1" begin="0s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" r="3.39393" cy="32" fill="#ff7c81" transform="rotate(390.539 50 49.9999)">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="180 50 50;540 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
            <animate attributeName="r" calcMode="spline" values="30;0;30" keyTimes="0;0.5;1" dur="1" keySplines="0.2 0 0.8 1;0.2 0 0.8 1" begin="0s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
      <span>
      {{message}}
      </span>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: "loading",
      textState: true
    };
  },
  methods: {
    show(text) {
      this.visible = true;
      this.textState = true;
      this.$emit("mask:show");
      this.message = text;
    },
    hideText() {
      this.textState = false;
    },
    hide() {
      this.visible = false;
      this.$emit("mask:hide");
    },
    tip() {
      if (!this.textState) {
        alert(this.message);
      }
    }
  }
};
</script>
<style lang="stylus">
.system-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;

  &.hidden {
    background: rgba(255, 255, 255, 0);
  }

  &> div {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    text-align: center;

    &.visible {
      display: block;
    }

    svg {
      display: inline-block;
    }

    span {
      display: block;
      color: white;
      padding: 2px 10px;
      font-size: 12px;
      background: darken(baseColor, 20);
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>



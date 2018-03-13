<template>
  <div class="preview">
    <component :is="componentName" v-model="currentValue" :key="componentName"></component>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import store from "./../store/index";
export default {
  async created() {
    this.changeRealSize(document.documentElement.offsetWidth);
    this.$root.baseInstanceUpdate();
  },
  mounted() {
    var timer;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.changeRealSize(document.documentElement.offsetWidth);
        setTimeout(() => {
          this.changeRealSize(document.documentElement.offsetWidth);
        });
      });
    });
  },
  computed: mapState({
    componentName: state => state.frame,
    currentValue: state => state
  }),
  methods: {
    ...mapMutations({
      changeRealSize(commit, realSize) {
        commit("toChangeRealSize", realSize);
        this.$root.resize();
      }
    })
  }
};
</script>
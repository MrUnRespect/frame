<template>
  <div class="base">
    <component v-for="(item, index) in currentValue.children"
    :key="index"
    :is="item.name"
    v-model="currentValue.children[index]"
    :index="index"
    ></component>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import size from "./../mixins/size-mixin/index";
import store from "@/store/index";
export default {
  mixins: [ size],
  data() {
    return {
      id: Math.round(Math.random() * 1e5),
      isControl: true,
      currentValue: {
        id: Math.round(Math.random() * 1e5),
        name: "layout-base",
        children: []
      }
    };
  },
  created() {
    this.$root.register(this);
  },
  beforeDestroy() {
    this.$root.unregister(this);
  },
  methods: {
    ...mapMutations(["toAddBaseItems"]),
    setSource(i) {
      if (store.state.children[i])
        this.$set(this, "currentValue", store.state.children[i]);
      else this.toAddBaseItems(this.currentValue);
    }
  }
};
</script>


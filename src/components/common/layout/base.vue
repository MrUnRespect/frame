<template>
<tools-container :tools="tools" :hasDefault="false" :style="styleObject">
  <div class="base">
    <component v-for="(item, index) in currentValue.children"
    :key="index"
    :is="item.name"
    v-model="currentValue.children[index]"
    :index="index"
    :count="currentValue.children.length"
    ></component>
  </div>
</tools-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import methods from "./../mixins/control-mixin/methods";
import size from "./../mixins/size-mixin/index";
import store from "@/store/index";
export default {
  mixins: [methods, size],
  data() {
    return {
      id: Math.round(Math.random() * 1e5),
      isControl: true,
      tools: [
        {
          name: "行",
          handler: e => this.addRow(e)
        }
      ],
      currentValue: {
        id: Math.round(Math.random() * 1e5),
        type: 'base',
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
  computed: {
    styleObject() {
      return {
        marginBottom: (this.$root.preview ? 0 : this.editModeMargin) + "px"
      };
    }
  },
  methods: {
    ...mapMutations(["toAddBaseItems"]),
    setSource(i) {
      if (store.state.children[i])
        this.$set(this, "currentValue", store.state.children[i]);
      else this.toAddBaseItems(this.currentValue);
    },
    addRow({ clientX, clientY }) {
      this.currentValue.children.push({ name: "layout-row",type: 'row', children: [] });
      this.toolsResize(clientX, clientY);
    }
  }
};
</script>


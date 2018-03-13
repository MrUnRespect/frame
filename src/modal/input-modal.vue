<template>
  <modal :name="name" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">{{ title }}</div>
    <label class="custom-modal-setting">
      <input type="text" v-model="currentValue">
    </label>
    <button class="custom-modal-setting-button" @click="select">确定</button>
  </modal>
</template>
<script>
import { toString } from "@/common/util";
import Vue from "vue";
let gotorun = {};
export default {
  data() {
    return {
      name: "input-modal",
      title: "输入值",
      currentValue: ""
    };
  },
  methods: {
    beforeOpen(event) {
      this.currentValue =
        event.params && event.params.value ? event.params.value : "";
      if (event.params && event.params.title) this.title = event.params.title;
      else this.title = "输入值";
    },
    async select() {
      if (this.currentValue) {
        let { data: files } = await axios.get("api/files");
        if (
          files.indexOf(this.currentValue) == -1 ||
          this.$root.file == this.currentValue
        ) {
          this.$root.file = this.currentValue;
          this.$modal.hide(this.name);
          this.$root.$emit(`${this.name}-close`, this.currentValue);
        } else {
          alert("只能同名文件才能相互覆盖");
        }
      }
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>


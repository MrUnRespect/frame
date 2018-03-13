<template>
  <modal :name="name" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">{{ title }}</div>
    <label v-for="(item,key,index) in currentValue" class="custom-modal-setting" :key="key">
      <span>{{key}} <i>[{{ currentType[key] }}]</i></span>
      <codemirror
        class="custom-CodeMirror"
        v-if="currentType[key] == 'Array' || currentType[key] == 'Object'"
        ref="codemirror"
        :code="JSON.stringify(currentValue[key])"
        :options="{ mode: 'text/javascript', tabSize: 4, lineNumbers: true, line: true, foldGutter: true }"
        @change="onEditorCodeChange.call(this,arguments[0], currentValue, key, currentType[key])"
        ></codemirror>
      <input v-else type="text" v-model="currentValue[key]">
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
      name: "setting-modal",
      title: "输入值",
      currentValue: {},
      currentType: {}
    };
  },
  methods: {
    gtype() {
      this.currentType = {};
      for (var key in this.currentValue) {
        this.currentType[key] = /^\[object\s([^\s]+)\]$/.exec(
          toString(this.currentValue[key])
        )[1];
      }
    },
    beforeOpen(event) {
      this.currentValue =
        event.params && event.params.value ? event.params.value : {};
      if (event.params && event.params.title) this.title = event.params.title;
      else this.title = "输入值";
      gotorun = {};
      this.gtype();
    },
    onEditorCodeChange(newVal, source, key, type) {
      try {
        gotorun[key] = function() {
          let code = new Function("return " + newVal)();
          source[key] = code;
        };
      } catch (e) {
        gotorun[key] = function() {};
      }
    },
    async select() {
      this.$modal.hide(this.name);
      for (var k in gotorun) {
        gotorun[k]();
      }
      this.$root.$emit(`${this.name}-close`, this.currentValue);
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>



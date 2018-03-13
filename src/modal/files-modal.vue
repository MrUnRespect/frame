<template>
  <modal :name="name" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">选择导入的存档</div>
    <div class="vue-scroller-container margin-bottom" :style="{ height: height + 'px' }">
      <scroller>
        <ul class="custom-modal-list">
          <li v-for="item in currentValue" :key="item">
              <a href="javascript:;" @click="select(item)">{{item}}</a>
            </li>
        </ul>
      </scroller>
    </div>
  </modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "files-modal",
      currentValue: [],
      height: 0
    };
  },
  methods: {
    ...mapActions(["loadSave"]),
    beforeOpen() {
      this.height = document.documentElement.offsetHeight * 0.8;
      axios.get("api/files").then(({ data: files }) => {
        this.currentValue = files;
      });
    },
    async select(item) {
      await this.loadSave(item);
      this.$root.file = item;
      this.$modal.hide(this.name);
      this.$root.$emit(`${this.name}-close`);
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>



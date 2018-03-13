<template>
  <modal :name="name" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">选择导出的存档</div>
    <div class="vue-scroller-container margin-bottom" :style="{ height: height + 'px' }">
      <scroller>
        <ul class="custom-modal-list preview">
          <li v-for="item in currentValue" :key="item">
              <a href="javascript:;" @click="select(item)">
                <b>{{item}}</b>
                <span>导出</span>
              </a>
          </li>
        </ul>
      </scroller>
    </div>
  </modal>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "export-modal",
      currentValue: [],
      height: 0
    };
  },
  computed: mapState(["frame"]),
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
      this.$modal.hide(this.name);
      this.$root.$emit(`${this.name}-close`, item);
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>



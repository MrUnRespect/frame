<template>
  <modal name="template-modal" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">选择模板</div>
    <div class="vue-scroller-container margin-bottom" :style="{ height: height + 'px' }">
      <scroller>
        <ul class="custom-modal-list">
          <li v-for="item in currentValue" 
            :key="item" 
            :class="item == frame? 'current': ''" 
           >
              <a href="javascript:;" @click="select(item)">{{item}}</a>
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
      name: "template-modal",
      currentValue: [],
      height: 0
    };
  },
  computed: mapState(["frame"]),
  methods: {
    ...mapActions(["loadFrame"]),
    beforeOpen() {
      this.height = document.documentElement.offsetHeight * 0.8;
      axios.get("api/frameTemplates").then(({ data: templates }) => {
        this.currentValue = templates;
      });
    },
    async select(item) {
      await this.loadFrame(item);
      this.$modal.hide(this.name);
      this.$root.$emit(`${this.name}-close`, this.frame);
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>

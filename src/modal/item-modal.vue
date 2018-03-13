<template>
  <modal :name="name" :pivotY="0.3" height="auto" @before-open="beforeOpen" @closed="closed">
    <div class="custom-modal-header">选择内容</div>
    <div class="vue-scroller-container margin-bottom" :style="{ height: height + 'px' }">
      <scroller>
        <ul class="custom-modal-list preview">
          <li v-for="item in currentValue" :key="item">
              <a href="javascript:;">
                <b  @click="select(item)">{{item}}</b>
                <span>预览</span>
              </a>
            </li>
        </ul>
     </scroller>
    </div>
  </modal>
</template>
<script>
import { mapActions } from "vuex";
import { loadItem } from "@/common/load-component";
export default {
  data() {
    return {
      name: "item-modal",
      currentValue: [],
      height: 0
    };
  },
  methods: {
    beforeOpen() {
      this.height = document.documentElement.offsetHeight * 0.8;
      axios.get("api/itemTemplates").then(({ data: templates }) => {
        this.currentValue = templates;
      });
    },
    async select(item) {
      var data = await loadItem(item);
      this.$modal.hide(this.name);
      this.$root.$emit(`${this.name}-close`, data);
    },
    closed() {
      this.$root.$off(`${this.name}-close`);
    }
  }
};
</script>


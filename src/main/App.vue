<template>
  <div :class="{ preview: $root.preview, 'preview-print':previewPrint }">
    <tools-container :tools="tools" :no-padding="true" :hasDefault="false" class="root-frame">
      <component :is="componentName" v-model="currentValue" :key="componentName"></component>
    </tools-container>
    <template-modal></template-modal>
    <box-modal></box-modal>
    <item-modal></item-modal>
    <setting-modal></setting-modal>
    <input-modal></input-modal>
    <files-modal></files-modal>
    <export-modal></export-modal>
    <v-dialog/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import when from "@common/when";
import {
  forEach,
  offset,
  base64ToBlob,
  makeURI,
  getImageData,
  genBitmapImage,
  sleep
} from "@common/util";
import store from "./../store/index";
import templateModal from "@/modal/template-modal";
import boxModal from "@/modal/box-modal";
import itemModal from "@/modal/item-modal";
import settingModal from "@/modal/setting-modal";
import inputModal from "@/modal/input-modal";
import filesModal from "@/modal/files-modal";
import exportModal from "@/modal/export-modal";
import html2canvas from "html2canvas";

export default {
  components: {
    templateModal,
    boxModal,
    itemModal,
    settingModal,
    inputModal,
    filesModal,
    exportModal
  },

  data() {
    return {
      previewPrint: false,
      isControl: true,
      componentName: null,
      tools: [
        {
          name: "模版",
          handler: () => this.changeFrame()
        },
        {
          name: "保存",
          handler: () => this.saveProject()
        },
        {
          name: "导入",
          handler: () => this.importProject()
        },
        {
          name: "导出项目",
          handler: () => this.exportProject()
        },
        {
          name: "参数",
          handler: () => {
            this.$modal.show("setting-modal", {
              value: this.currentValue.setting,
              title: "修改参数"
            });
          }
        },
        {
          name: "预览",
          handler: () => {
            this.$root.preview = !this.$root.preview;
            this.tools[this.tools.length - 1].name = this.$root.preview
              ? "编辑"
              : "预览";
            this.changeRealSize(document.documentElement.offsetWidth - 1);
            setTimeout(() =>
              this.changeRealSize(document.documentElement.offsetWidth)
            );
          }
        }
      ]
    };
  },
  async created() {
    this.changeRealSize(document.documentElement.offsetWidth);
    await this.loadFrame();
    this.componentName = this.frame;
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
        }, 400);
      }, 200);
    });
  },
  computed: mapState({
    frame: state => state.frame,
    currentValue: state => state
  }),
  methods: {
    ...mapMutations({
      changeRealSize(commit, realSize) {
        commit("toChangeRealSize", realSize);
        this.$root.resize();
      }
    }),
    ...mapActions(["loadFrame"]),
    changeFrame() {
      this.$root.$once("template-modal-close", frame => {
        this.componentName = frame;
        this.$root.file = "";
        this.$root.baseInstanceUpdate();
      });
      this.$modal.show("template-modal");
    },
    saveProject() {
      this.$root.$once("input-modal-close", async filename => {
        let { data } = await axios.post("/api/file", {
          filename,
          data: store.state
        });
        this.$modal.show("dialog", {
          title: "提示!",
          text: data.message,
          buttons: [
            {
              title: "确定",
              handler: () => {
                this.$modal.hide("dialog");
              }
            }
          ]
        });
      });
      this.$modal.show("input-modal", { value: this.$root.file });
    },
    importProject() {
      this.$root.$once("files-modal-close", () => {
        this.componentName = this.frame;
        this.$root.baseInstanceUpdate();
      });
      this.$modal.show("files-modal");
    },
    exportProject() {
      this.$root.$once("export-modal-close", filename => {
        let self = this;
        self.$mask.show("正在加载内容..");
        self.$root.preview = true;
        self.componentName = self.frame;
        self.$root.baseInstanceUpdate();
        self.$nextTick(async () => {
          let form;
          var config = {
            headers: { "Content-Types": "multipart/form-data" }
          };
          try {
            await when(
              () => document.querySelectorAll(".source-base").length !== 0,
              { delay: 1000 }
            );

            self.$mask.show("正在截屏..");
            self.previewPrint = true;
            await sleep(2000);
            self.$mask.hideText();
            await sleep(200);
            let canvas = await html2canvas(document.body);
            self.$mask.show("正在处理图片..");
            let base64 = makeURI(
              genBitmapImage(getImageData(canvas)),
              "image/octet-stream"
            );
            form = base64ToBlob(base64);
          } catch (e) {
            console.warn("未找到数据源框, 将不会有视图布局信息");
            form = new FormData();
          }

          self.$mask.show("正在获取定位信息..");
          let dataAreas = [];
          let realSize = self.realSize;
          let originalSize = self.originalSize;

          let reset = function(size) {
            return size * originalSize / realSize;
          };
          forEach(document.querySelectorAll(".source-base"), el => {
            let res = offset(el);
            res.id = el.getAttribute("data-source-index");
            res.left = reset(res.left) + "px";
            res.top = reset(res.top) + "px";
            res.width = reset(res.width) + "px";
            res.height = reset(res.height) + "px";
            dataAreas.push(res);
          });
          form.append(
            "conf",
            JSON.stringify({
              originalSize,
              dataAreas
            })
          );
          self.$mask.show("等待服务器处理..");
          let { data } = await axios.post(
            "api/export/" + filename,
            form,
            config
          );
          self.$mask.hide();
          self.previewPrint = false;
          if (data.code == 0) {
            this.$modal.show("dialog", {
              title: "系统消息",
              text: "服务器错误"
            });
          } else {
            self.$modal.show("dialog", {
              title: "系统消息",
              text: "生成成功，是否下载项目？",
              buttons: [
                {
                  title: "确定",
                  handler: () => {
                    var a = document.createElement("a");
                    a.href = "api/export/" + filename;
                    a.download = filename + ".zip";
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => document.body.removeChild(a));
                    self.$modal.hide("dialog");
                  }
                },
                {
                  title: "取消",
                  handler: () => {
                    self.$modal.hide("dialog");
                  }
                }
              ]
            });
          }
        });
      });
      this.$modal.show("export-modal");
    }
  }
};
</script>
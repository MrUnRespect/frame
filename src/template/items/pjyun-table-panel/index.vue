<template>
  <item-container>
    <div class="pjyun-table-panel">
      <table>
        <tr :style="{
          lineHeight: lineHeight,
          fontSize: unit(16)
        }">
          <th :style="{
            width: unit(60)
          }"></th>
          <th :style="{
            width: unit(200)
          }"></th>
          <th>已开通家长数</th>
          <th>累计评价总数</th>
          <th>年生均评价数</th>
          <th>日生均评价数</th>
          <th>学生评价日生均评价数</th>
          <th>使用中的评价类型</th>
        </tr>
      </table>
      <div class="pjyun-table-panel-content" :style="{
        height: computedSize - this.computedSize / 7 + 'px'
      }">
      <table ref="content">
        <colgroup>
          <col  :style="{
            width: unit(60)
          }">
          <col :style="{
            width: unit(200)
          }">
        </colgroup>
        <tbody>
        <tr v-for="(item, index) in struct" :key="item.name" :style="{
          lineHeight: lineHeight,
          fontSize: unit(14)
        }">
          <td>{{ index + 1 }}</td>
          <td class="align-left" :style="{
            fontSize: unit(16)
          }">{{ item.school }}</td>
          <td>{{ parseFloat(item.patriarch).toLocaleString() }}</td>
          <td>{{ parseFloat(item.totalevaluation).toLocaleString()}}</td>
          <td>{{ parseFloat(item.year).toLocaleString() }}</td>
          <td>
            {{ parseFloat(item.day.value).toLocaleString() }}
            <span :class="gClass(item.day.type)"></span>  
          </td>
          <td>{{ parseFloat(item.studentday).toLocaleString()}}</td>
          <td>
            <a :style="{
              height: unit(25),
              width: unit(25)
            }" href="javascript:;" class="icon-type-1" :class="{ disabled: !item.types[0] }"></a>
            <a :style="{
              height: unit(25),
              width: unit(25)
            }" href="javascript:;" class="icon-type-2" :class="{ disabled: !item.types[1] }"></a>
            <a :style="{
              height: unit(25),
              width: unit(25)
            }" href="javascript:;" class="icon-type-3" :class="{ disabled: !item.types[2] }"></a>
          </td>
          </tbody>
        </tr>
      </table>
      </div>
    </div>
  </item-container>
</template>
<script>
import Animation from "./animation";
export default {
  props: {
    sourcekey: {
      type: String,
      default: "data1"
    }
  },
  computed: {
    computedSize() {
      return parseFloat(this.unitSize(this.size));
    },
    lineHeight() {
      return this.computedSize / 7 - 2.8 + "px";
    }
  },
  data() {
    return {
      struct: [
        {
          school: "成华小学",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "up"
          },
          studentday: 500,
          types: [true, true, true]
        },
        {
          school: "电子科技大学附属实验小学",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "up"
          },
          studentday: 500,
          types: [true, true, true]
        },
        {
          school: "成都石室初中青龙校区",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "up"
          },
          studentday: 500,
          types: [true, true, true]
        },
        {
          school: "成都石室初中青龙校区",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "normal"
          },
          studentday: 500,
          types: [true, true, true]
        },
        {
          school: "成都石室初中青龙校区",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "down"
          },
          studentday: 500,
          types: [true, true, true]
        },
        {
          school: "成华中学",
          patriarch: 5274,
          totalevaluation: 400,
          year: 5000,
          day: {
            value: 500,
            type: "down"
          },
          studentday: 500,
          types: [true, true, true]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    gClass(type) {
      switch (type) {
        case "up":
          return "arrow-up";
        case "down":
          return "arrow-down";
        default:
          return "arrow-normal";
      }
    },
    update() {
      DataUtil.getData(this.source, this, res => {
        this.struct = res[this.sourcekey];
        this.animate();
      });
    },
    animate() {
      if (this.struct.length > 6) {
        let run = isFirst => {
          if (!isFirst) {
            this.$refs.content
              .querySelector("tbody")
              .appendChild(this.$refs.content.querySelector("tr"));
            this.$refs.content.style.transform =
                "translate3d(0, 0, 0)";
          }
          Animation()
            .duration(2000)
            .run(i => {
              let d = 100 / this.struct.length;
              this.$refs.content.style.transform =
                "translate3d(0, -" + d * i + "%, 0)";
            })
            .then(() => (this.struct.length > 6 ? run() : null));
        };

        run(true);
      }
    }
  }
};
</script>
<style>
.pjyun-table-panel table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}
.pjyun-table-panel table th,
.pjyun-table-panel table td {
  box-sizing: border-box;
  color: #c3c3c3;
  font-size: 1em;
  text-align: center;
  border-bottom: 1px solid rgba(64, 131, 229, 0.13);
}
.pjyun-table-panel table td.align-left {
  text-align: left;
}
.pjyun-table-panel table td span.arrow-up,
.pjyun-table-panel table td span.arrow-normal,
.pjyun-table-panel table td span.arrow-down {
  display: inline-block;
  vertical-align: middle;
  margin-left: 1em;
  height: 15px;
  width: 15px;
}
.pjyun-table-panel table td span.arrow-up {
  background: url("/static/assets/pjyun/arrow-up.png") no-repeat center;
}
.pjyun-table-panel table td span.arrow-normal {
  background: url("/static/assets/pjyun/arrow-normal.png") no-repeat center;
}
.pjyun-table-panel table td span.arrow-down {
  background: url("/static/assets/pjyun/arrow-down.png") no-repeat center;
}
.pjyun-table-panel table td a.icon-type-1,
.pjyun-table-panel table td a.icon-type-2,
.pjyun-table-panel table td a.icon-type-3 {
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}

.pjyun-table-panel table td a.icon-type-1 {
  background-image: url("/static/assets/pjyun/icon4.png");
}
.pjyun-table-panel table td a.icon-type-1.disabled {
  background-image: url("/static/assets/pjyun/icon4-disabled.png");
}
.pjyun-table-panel table td a.icon-type-2 {
  background-image: url("/static/assets/pjyun/icon5.png");
}
.pjyun-table-panel table td a.icon-type-2.disabled {
  background-image: url("/static/assets/pjyun/icon5-disabled.png");
}
.pjyun-table-panel table td a.icon-type-3 {
  background-image: url("/static/assets/pjyun/icon6.png");
}
.pjyun-table-panel table td a.icon-type-3.disabled {
  background-image: url("/static/assets/pjyun/icon6-disabled.png");
}

.pjyun-table-panel table th {
  font-weight: bold;
}
.pjyun-table-panel-content {
  overflow: hidden;
}
</style>
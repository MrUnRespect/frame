<template>
  <item-container>
    <div class="pjyun-number-panel-line" v-for="item in struct" :key="item.name" :style="{
      height: computedSize / struct.length + 'px'
    }">
      <h3 :style="{
        height: unit(40),
        fontSize: unit(16),
        lineHeight: unit(40)
      }">
        <span class="pjyun-number-panel-line-icon" :style="{
          width: unit(40),
          height: unit(40),
          marginLeft: unit(20),
          backgroundImage: 'url(' + item.icon + ')'
        }"></span>
        {{ item.name }}
      </h3>
      <p :style="{
        height: (computedSize / struct.length - calcRealSize(40)) + 'px',
        lineHeight: (computedSize / struct.length - calcRealSize(40)) + 'px',
        fontSize: unit(50),
        paddingLeft: unit(40)
      }">
        <span class="digital-font">{{ parseFloat(item.value).toLocaleString() }}</span>
        <i>{{item.unit}}</i>
      </p>
    </div>
  </item-container>
</template>
<script>
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
    }
  },
  data() {
    return {
      struct: [
        {
          name: "累计产生评价总数",
          value: 5274,
          unit: "万",
          icon: "/static/assets/pjyun/icon1.png"
        },
        {
          name: "累计产生评价总数",
          value: 5274,
          unit: "",
          icon: "/static/assets/pjyun/icon2.png"
        },
        {
          name: "累计产生评价总数",
          value: 5274,
          unit: "",
          icon: "/static/assets/pjyun/icon3.png"
        }
      ]
    };
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, res => {
        this.struct = res[this.sourcekey];
      });
    }
  }
};
</script>
<style>
.pjyun-number-panel-line h3 {
  color: #b6b6b6;
  margin: 0;
  padding: 0;
}

.pjyun-number-panel-line p {
  color: #e2a03a;
  margin: 0;
  padding: 0;
}

.pjyun-number-panel-line p i {
  font-size: 0.35em;
  font-style: normal;
}

.pjyun-number-panel-line-icon {
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: top;
}
</style>
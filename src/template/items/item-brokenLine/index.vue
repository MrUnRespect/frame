<template>
  <item-container>
    <div ref="chart" class="chart">
    </div>
  </item-container>
</template>
<script>
let echarts = Vue.echarts;
export default {
  props: {
    sourcekey: {
      type: String,
      default: "data2"
    },
    itemStyle: {
      type: String,
      default: "rgb(232,190,75)"
    },
    lineStyle: {
      type: String,
      default: "'rgba(255,255,255,.1)'"
    }
  },
  data() {
    return {
      struct: {
        time: ["2013", "2014", "2015", "2016", "2017"],
        data: ["123", "115", "121", "122", "136"],
        yName: "数量（人）",
        xName: "时间（年）"
      },
      data: {}
    };
  },
  computed: {},

  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        data = data[this.sourcekey];
        this.data = data;
        this.option = {
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "6%",
            right: "20%",
            bottom: "13%",
            top: "15%",
            containLabel: true
          },
          xAxis: {
            name: data.xName,
            nameTextStyle: {
              color: "rgb(203,203,203)"
            },
            type: "category",
            boundaryGap: true,
            data: data.time.map(o => ({
              value: o,
              textStyle: {
                color: "rgb(213,213,213)"
              }
            }))
          },
          yAxis: {
            name: data.yName,
            nameTextStyle: {
              color: "rgb(203,203,203)"
            },
            type: "value",
            splitNumber: 3,
            axisLabel: {
              textStyle: {
                color: "rgb(213,213,213)"
              }
            },
            splitLine: {
              show: false
            }
          },
          series: [
            {
              type: "line",
              itemStyle: {
                normal: {
                  color: this.itemStyle
                }
              },
              lineStyle: {
                normal: {
                  color: this.lineStyle
                }
              },
              symbolSize: 12,
              symbol: "circle",
              label: {
                normal: {
                  show: true,
                  position: "top",
                  color: "rgb(168,168,172)"
                }
              },
              data: data.data
            }
          ]
        };
        this.chart.setOption(this.option);
      });
    }
  }
};
</script>
<style>
.chart {
  height: 100%;
  width: 100%;
}
</style>
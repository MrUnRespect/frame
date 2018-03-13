<template>
  <item-container>
    <div ref="chart" class="chart">
    </div>
  </item-container>
</template>
<script>
export default {
  props: {
    sourcekey: {
      type: String,
      default: "data1"
    },
    itemColor: {
      type: String,
      default: "rgb(173,94,205)"
    },
    itemleft: {
      type: String,
      default: "3%"
    },
    itemright: {
      type: String,
      default: "3%"
    },
    itembottom: {
      type: String,
      default: "3%"
    },
    itemtop: {
      type: String,
      default: "13%"
    }
  },
  data() {
    return {
      struct: {
        seriesName: "学院数量分布", //nonecessary
        data: [108, 112, 89, 56, 87, 56, 98, 21, 112, 35],
        xAxis: [
          "机械工程学院",
          "",
          "经济管理学院",
          "",
          "艺术设计学院",
          "",
          "社会科学部",
          "",
          "国际教育学院",
          ""
        ],
        yName: "数量（人）",
        xName: ""
      }
    };
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        var dataShadow = data[this.sourcekey];
        this.option = {
          tooltip: {
            trigger: "axis"
          },
          color: ["#3398DB"],
          grid: {
            // left: "3%",
            // right: "3%",
            // bottom: "3%",
            // top: "13%",
            left: this.itemleft,
            right: this.itemright,
            bottom: this.itembottom,
            top: this.itemtop,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",

              data: dataShadow.xAxis.map(o => {
                return o == ""
                  ? ""
                  : {
                      value: o,
                      textStyle: {
                         color: 'rgb(213,213,213)'
                      }
                    };
              }),
              axisLabel: {
                interval: 0,

              },
              name: dataShadow.xName,
              axisLine: {
                interval: 0
              },
              nameTextStyle: {
                color: "rgb(214,214,214)"
              },
              axisTick: {
                interval: 0,
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              nameTextStyle: {
                color: "rgb(214,214,214)"
              },
              type: "value",
              name: dataShadow.yName,
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                   color: 'rgb(213,213,213)'
                }
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: dataShadow.name,
              type: "bar",
              barWidth: "40%",
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  color: "rgb(213,213,215)"
                }
              },
              itemStyle: {
                normal: {
                  color: this.itemColor
                }
              },
              data: dataShadow.data
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
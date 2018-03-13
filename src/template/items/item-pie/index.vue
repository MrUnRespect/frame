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
      // source: {
      //   type: String,
      //   default: "page-1-2"
      // },
      sourcekey: {
        type: String,
        default: "data1"
      },
      isTitle: {
        type: String,
        default: "false"
      },
      radius: {
        type: Array,
        default() {
          return ['40%', '60%']
        }
      },
      center: {
        type: Array,
        default() {
          return ['40%', '50%']
        }
      },
      legendLeft: {
        type: String,
        default: ""
      },
      legendRight: {
        type: String,
        default: "20"
      },
      legendTop: {
        type: String,
        default: ""
      },
      legendBottom: {
        type: String,
        default: "center"
      },
      itemColor: {
        type: Array,
        default() {
          return ["rgb(91,195,161)", "rgb(250,216,124)", "rgb(86,180,246)", "rgb(237,116,178)"]
        }
      }
    },
    computed: {
      title() {
        if (this.isTitle == "true") {
          return {
            text: this.evaluate,
            left: "3%",
            textStyle: {
              color: "rgb(214,214,214)",
              lineHeight: this.calcRealSize(30),
              fontSize: this.calcRealSize(16),
              rich: {
                a: {
                  color: "rgb(255,165,0)",
                  fontSize: this.calcRealSize(30),
                  lineHeight: this.calcRealSize(50),
                }
              }
            }
          }
        } else if (this.isTitle == "false") {
          return {}
        }
      }
    },
    data() {
      return {
        struct: {
          data: [
            {
              value: 56,
              name: "专业1"
            },
            {
              value: 89,
              name: "专业2"
            },
            {
              value: 115,
              name: "专业3"
            },
            {
              value: 128,
              name: "专业4"
            }
          ],
          evaluate: "个人评价\n{a|B}" //nonecessary

        }
      }
    },
    methods: {
      chooseColor(i) {
        i = i % this.itemColor.length
        return this.itemColor[i]
      },
      update() {

        DataUtil.getData(this.source, this, data => {
          data = data[this.sourcekey];
          this.evaluate = data.evaluate || "个人评价\n{a|A}"
          var dataShadow = []
          var legendName = []
          data.data.forEach((o, i) => {
            legendName.push(o.name)
            dataShadow.push({
              value: o.value,
              name: o.name,
              itemStyle: {
                normal: {
                  // color: this.chooseColor(i)
                  color: this.chooseColor(i)
                }
              }
            })
          })


          this.option = {
            title: this.title,
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              barWidth: 20,
              data: legendName,
              textStyle: {
                color: "rgb(235,235,235)"
              },
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 20
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: this.radius,
                center: this.center,
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}、{d}%",
                    textStyle: {
                      color: "white"
                    }
                  },
                },
                labelLine: {
                  normal: {
                    length: 3,
                    length2: 3,
                    lineStyle: {
                      color: "white"
                    }
                  }
                },

                data: dataShadow
              }
            ]
          };

          if (this.legendRight) {
            this.option.legend.right = this.legendRight
          }
          if (this.legendLeft) {
            this.option.legend.left = this.legendLeft
          }
          if (this.legendBottom) {
            this.option.legend.bottom = this.legendBottom
          }
          if (this.legendTop) {
            this.option.legend.top = this.legendTop
          }

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
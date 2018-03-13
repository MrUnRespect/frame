<template>
  <item-container>
    <div ref="chart" class="chart">
    </div>
  </item-container>
</template>
<script>
  export default {
    data() {
      return {
        struct: {
          aver: true,
          xAxis: ['一', '二', '三', '四', '五', '六', '七', '八', '九', "学院10", "学院11", "学院12"],
          xName: "学院",
          yName: "比例（%）",
          series: [
            {
              name: "各学院",
              data: [1, 3, 5.5, 27, 81, 47, 41, 22, 33, 14, 25, 36]
            },
          ]

        }
      }
    },
    props: {
      sourcekey: {
        type: String,
        default: "data1"
      },
      itemStyle: {
        type: String,
        default: "rgb(232,190,75)"
      },
      itemColor: {
        type: Array,
        default() {
          return ["rgb(73,179,227)",]
        }
      },
      gridLeft: {
        type: String,
        default: "3%"
      },
      gridRight: {
        type: String,
        default: "5%"
      },
      gridTop: {
        type: String,
        default: "5%"
      },
      gridBottom: {
        type: String,
        default: "10%"
      }

    },
    computed: {
      isAver() {
        if (this.struct.aver == true) {
          return [{ type: 'average', name: '平均值' }]

        } else {
          return {}
        }
      },
      isLegend() {
        if (this.struct.legend) {
          return {
            barWidth: 20,
            data: this.struct.legend.data,
            textStyle: {
              color: "rgb(235,235,235)"
            },
            itemWidth: 20,
            itemHeight: 10,
            itemGap: 20,
            bottom: "3%",
            left: "center"
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      chooseColor(i) {
        i = i % this.itemColor.length
        return this.itemColor[i]
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          this.struct = data;
          this.option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}'
            },
            legend: this.isLegend,
            xAxis: {
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: 'rgb(163,164,166)'
                }
              },
              name: data.xName,
              nameTextStyle: {
                color: "rgb(203,203,203)"
              },
              splitLine: { show: false },
              data: data.xAxis
            },
            grid: {
              left: this.gridLeft,
              right: this.gridRight,
              bottom: this.gridBottom,
              top: this.gridTop,
              containLabel: true
            },
            yAxis: [
              {
                type: 'value',
                name: data.yName,
                nameTextStyle: {
                  color: "rgb(203,203,203)"
                },
                position: "left",
                axisLine: {
                  show: true
                },
                axisLabel: {
                  show: true,
                  interval: 0,
                  formatter: "{value}%",
                  textStyle: {
                    color: 'rgb(163,164,166)'
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                }
              },

            ],
            series: data.series.map((o, i) => {
              return {
                name: o.name,
                type: 'line',
                data: o.data,
                markLine: {
                  lineStyle: {
                    normal: {
                      color: "rgb(255,106,180)"
                    }
                  },
                  data: this.isAver
                },
                itemStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                },

                label: {
                  normal: {
                    show: true,
                    formatter: "{c}%",
                    color: "rgb(168,168,172)"
                  }
                }
              }
            })
            // series: [
            //   {
            //     name: '各学院',
            //     type: 'line',
            //     data: [1, 3, 5.5, 27, 81, 47, 41, 22, 33, 14, 25, 36],

            //     itemStyle: {
            //       normal: {
            //         color: this.itemStyle
            //       }
            //     },

            //     label: {
            //       normal: {
            //         show: true,
            //         formatter: "{c}%",
            //         color: "rgb(168,168,172)"
            //       }
            //     }
            //   },
            //   {
            //     name: '平均',
            //     type: 'line',
            //     data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            //     label: {
            //       normal: {
            //         show: true,
            //         formatter: "{c}%",
            //         color: "rgb(168,168,172)"
            //       }
            //     }
            //   },

            // ]
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
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
          xAxis: {
            min: 2013,
            max: 2017
          },
          data: [
            [[2013, 2.5], [2014, 1.5], [2015, 1.7], [2016, 3], [2017, 0.8]],
            [[2013, 0.5], [2014, 2.5], [2015, 3], [2016, 2.4], [2017, 1.8]],
            [[2013, 3], [2014, 2.1], [2015, 2.3], [2016, 1.4], [2017, 0.2]],
            [[2013, 1.3], [2014, 2.5], [2015, 2.6], [2016, 0.4], [2017, 0.9]]
          ]
        }
      }
    },
    props: {
      sourcekey: {
        type: String,
        default: "data1"
      },
      itemColor: {
        type: Array,
        default() {
          return ["rgb(168,92,200)", "rgb(213,184,111)", "rgb(108,176,243)", "rgb(91,195,161)"]
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
    methods: {
      chooseColor(i) {
        i = i % this.itemColor.length
        return this.itemColor[i]
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          this.option = {
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: data.legend,
              textStyle: {
                color: "rgb(213,213,213)"
              },
              bottom: 2
            },
            grid: {
              left: this.gridLeft,
              right: this.gridRight,
              bottom: this.gridBottom,
              top: this.gridTop,
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: true,
                data: data.xAxis,
                name: "时间（年）",
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLabel: {
                  color: "rgb(137,137,141)"
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                min: 0,
                max: 3,
                splitNumber: 4,
                position: "right",
                axisLabel: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                }
              },
              {
                type: "category",
                data: data.yAxis,
                name: "等级",
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLabel: {
                  color: "rgb(137,137,141)",
                  interval: 0
                },
              }
            ],
            series: data.data.map((o, i) => {
              return {
                type: "line",
                name: data.legend[i],
                data: o,
                lineStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                },
                symbolSize: 7,
                symbol: "circle",
                itemStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                }
              }
            })
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
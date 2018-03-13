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
          xAxis: ["2013", "2014", "2015", "2016", "2017"],
          data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],

          ],
          yName: "数量（人）",
          xName: "时间（年）",
          seriesName: ["占地面积", "建筑面积"]

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
        default: "8%"
      },
      gridRight: {
        type: String,
        default: "15%"
      },
      gridTop: {
        type: String,
        default: "15%"
      },
      gridBottom: {
        type: String,
        default: "13%"
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
              barWidth: 20,
              data: data.seriesName,
              textStyle: {
                color: "rgb(235,235,235)"
              },
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 20,
              bottom: "3%",
              left: "center"
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
                name: data.xName,
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                splitLine: {
                  show: false,
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
                  color: 'rgb(213,213,213)'
                },
              },
            ],
            yAxis: [
              {
                name: data.yName,
                nameTextStyle: {
                  color: 'rgb(163,164,166)',
                  offset:200
                },
                type: 'value',
                splitNumber: 3,
                position: "left",
                axisLabel: {
                  show: true
                },
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
                axisLabel: {
                  color: 'rgb(213,213,213)'
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                }
              },
            ],
            series: data.data.map((o, i) => {
              return {
                name: data.seriesName[i],
                type: "line",
                data: o,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    color: "rgb(168,168,172)"
                  }
                },
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
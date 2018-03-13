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
      legendBottom: {
        type: String,
        default: "1%"
      },
      itemleft: {
        type: String,
        default: "9%"
      },
      itemright: {
        type: String,
        default: "13%"
      },
      itembottom: {
        type: String,
        default: "17%"
      },
      itemtop: {
        type: String,
        default: "17%"
      },
      itemColor: {
        type: Array,
        default() {
          return ["rgb(29,178,162)", "rgb(36,144,140)", "rgb(30,92,100)", "rgb(27,59,74)"]
        }
      },
    },
    data() {
      return {
        struct: {
          legend: {
            data: ['国家级重点专业1 ', '省级重点专业', "校级重点专业", "平均温度1"]
          },
          lineSeries: [
            {
              name: "平均温度1",
              data: [16, 20, 30, 35, 40],
            }
          ],
          barSeries: [
            {
              name: "国家级重点专业1",
              data: [5, 20, 18, 30, 30]
            },
            {
              name: "省级重点专业",
              data: [5, 20, 18, 30, 30]
            },
            {
              name: "校级重点专业",
              data: [5, 20, 18, 30, 30]
            },

          ],
          time: ["2013", "2014", "2015", "2016", "2017"],
          yName: "数量（人）",
          xName: "时间（年）",
        }
      }
    },
    computed: {
      formatter() {
        if (this.struct.yAxisPer == true) {
          return "{value}%"
        } else {
          return "{value}"
        }
      },
      formatter2() {
        if (this.struct.per == true) {
          return "{c}%"
        } else {
          return "{c}"
        }
      }
    },
    methods: {
      label(i) {
        if (this.struct.all == "all") {
          return {
            normal: {
              show: true,
              position: "top",
              formatter: "{c}%",
              color: "rgb(213,213,213)",
              formatter: this.formatter2
            }
          }
        } else if (this.struct.all == "fir") {
          if (i == 0) {
            return {
              normal: {
                show: true,
                position: "top",
                color: "rgb(213,213,213)",
                formatter: this.formatter2
              }
            }
          }
        } else {
          return {}
        }
      },
      chooseColor(i) {
        var color = this.itemColor
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, data => {
          var data = data[this.sourcekey];
          this.struct = data;
          var barLine = []
          data.barSeries.forEach((o, i) => {
            barLine.push({
              name: o.name,
              type: 'bar',
              label: this.label(i),
              data: o.data,
              itemStyle: {
                normal: {
                  color: this.chooseColor(i)
                }
              }
            })
          })
          data.lineSeries.forEach((o, i) => {
            barLine.push({
              name: o.name,
              type: 'line',
              symbol: "circle",
              symbolSize: 10,
              data: o.data,
              label: {
                normal: {
                  show: true,
                  position: "top",
                  color: "rgb(168,168,172)"
                }
              },
              itemStyle: {
                normal: {
                  color: "rgb(232,190,72)"

                }
              },
              lineStyle: {
                normal: {
                  color: "rgba(255,255,255,.1)"
                }
              }
            })
          })

          this.option = {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: this.itemleft,
              right: this.itemright,
              bottom: this.itembottom,
              top: this.itemtop,
            },
            legend: {
              data: data.legend.data,
              bottom: this.legendBottom,
              left: "center",
              textStyle: {
                color: "rgb(213,213,213)"
              }
            },
            ulable: true,
            xAxis: [
              {
                type: 'category',
                data: data.time,
                name: data.xName,
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: 'rgb(163,164,166)'
                  }
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: data.yName,
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  formatter: "{value}%",
                  textStyle: {
                    color: 'rgb(163,164,166)'
                  }
                },
              }
            ],
            series: barLine
          };
          console.log(JSON.stringify(this.option))
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
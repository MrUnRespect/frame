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
        default: "data1"
      }
    },
    data() {
      return {
        struct: {
          xAxis: ["2013", "2014", "2015", "2016", "2017"],
          data: [
            {
              name: "班级管理1",
              value: [[20, 10], [30, 20], [10, 10], [0, 0], [25, 35]]
            },
            {
              name: "社团指导",
              value: [[30, 20], [10, 30], [10, 40], [40, 5], [25, 15]]
            },
            {
              name: "兼职服务",
              value: [[10, 40], [20, 30], [20, 40], [10, 30], [0, 10]]
            },
            {
              name: "社会兼职",
              value: [[33, 18], [16, 24], [19, 40], [12], [30, 30]]
            }
          ]
        }
      }
    },
    methods: {
      chooseColor(i) {
        var color = ["rgb(232,190,75)", "rgb(91,195,161)", "rgb(108,176,243)", "rgb(173,94,205)"]
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          var series = []
          this.option = {
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: data.data.map(o => {
                return o.name
              }),
              itemWidth: 20,
              itemHeight: 10,
              right: 0,
              top: 40,
              orient: "vertical",
              itemGap: 25,
              textStyle: {
                color: "rgb(235,235,235)"
              }
            },
            grid: {
              left: '3%',
              right: '14%',
              bottom: '3%',
              top: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: 'value',
                // data: ['A2', 'B2', 'C2', 'D2'],
                splitNumber: 5,
                position: "top",

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
                name: "时间（年）",
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                data: ["2013", "2014", "2015", "2016", "2017"],
                axisLabel: {
                  color: "rgb(137,137,141)"
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
              }
            ],

            yAxis: [
              {
                type: 'value',
                splitNumber: 5,
                position: "right",
                axisLabel: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.03)"
                  }
                }
              },
              {
                name: "等级",
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                type: 'category',
                data: ['A', 'B', 'C', 'D'],
                splitNumber: 5,
                axisLabel: {
                  color: "rgb(137,137,141)"
                },
                axisLine: {
                  lineStyle: {
                    color: "rgba(255,255,255,.1)"
                  }
                },
              }
            ],
            series: data.data.map((o, i) => {
              return {
                type: "scatter",
                name: o.name,
                itemStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                },
                data: o.value
              }
            })
            // series: [
            // {
            //   type: "scatter",
            //   name: "班级管理",
            //   itemStyle: {
            //     normal: {
            //       color: "rgb(232,190,75)"
            //     }
            //   },
            //   data: [[20, 10], [30, 20], [10, 10], [0, 0], [25, 35]]
            // },
            //   {
            //     type: "scatter",
            //     name: "社团指导",
            //     itemStyle: {
            //       normal: {
            //         color: "rgb(91,195,161)"
            //       }
            //     },
            //     data: [[30, 20], [10, 30], [10, 40], [40, 5], [25, 15]]
            //   },
            //   {
            //     type: "scatter",
            //     name: "兼职服务",
            //     itemStyle: {
            //       normal: {
            //         color: "rgb(108,176,243)"
            //       }
            //     },
            //     data: [[10, 40], [20, 30], [20, 40], [10, 30], [0, 10]]
            //   },
            //   {
            //     type: "scatter",
            //     name: "社会兼职",
            //     itemStyle: {
            //       normal: {
            //         color: "rgb(173,94,205)"
            //       }
            //     },
            //     data: [[33, 18], [16, 24], [19, 40], [12], [30, 30]]
            //   }
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
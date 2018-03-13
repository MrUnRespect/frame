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
    data() {
      return {
        struct: {
          xAxis: ['2017', '2016', '2015', '2014', '2013'],
          barData: [
            {
              name: '学生管理与社会服务',
              value: [17, 22, 41, 55, 52]
            },
            {
              name: '成长能力',
              value: [69, 89, 32, 42, 45]
            },
            {
              name: '教学能力',
              value: [23, 28, 60, 82, 56]
            }, {
              name: '考核评价',
              value: [29, 26, 45, 62, 56]
            },
            {
              name: '科研能力',
              value: [33, 26, 65, 82, 56]
            }
          ],
          lineData: [
            {
              name: '综合成长指数',
              value: [200, 250, 310, 350, 290]
            },
          ]
        }
      }
    },
    methods: {
      chooseColor(i) {
        var color = ["rgb(108,176,243)", "rgb(91,146,206", "rgb(73,115,165)", "rgb(56,85,127)", "rgb(38,55,89)"]
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          var barLine = []
          var legend = []
          data.barData.forEach((o, i) => {
            legend.push(o.name)
            barLine.push({
              name: o.name,
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  color: 'rgb(215,215,215)'
                }
              },
              barWidth: 30,
              itemStyle: {
                normal: {
                  color: this.chooseColor(i)
                }
              },

              data: o.value
            })
          })
          legend.push(
            data.lineData.name
          )
          barLine.push({
            name: data.lineData.name,
            type: 'line',
            data: data.lineData.value,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            symbol: "circle",
            symbolSize: 10,
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
          this.option = {
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: legend,
              left: "center",
              bottom: 0,
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 20,
              textStyle: {
                color: "white"
              }
            },
            grid: {
              left: this.gridLeft,
              right: this.gridRight,
              bottom: this.gridBottom,
              top: this.gridTop,
              containLabel: true
            },
            xAxis: {
              name: data.xName,
              nameLocation: "end",
              nameGap: 0,
              nameTextStyle: {
                color: 'rgb(163,164,166)'
              },
              type: 'category',
              data: data.xAxis,
              axisLine: {
                interval: 0,
                lineStyle: {
                  color: "rgba(255,255,255,.1)"
                }
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: 'rgb(163,164,166)'
                }
              }
            },
            yAxis: {
              name: data.yName,
              nameLocation: "end",
              nameGap: 20,
              nameTextStyle: {
                color: 'rgb(163,164,166)'
              },
              type: 'value',
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)"
                }
              },
              axisLabel: {
                textStyle: {
                  color: 'rgb(163,164,166)'
                }
              }
            },
            series: barLine

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
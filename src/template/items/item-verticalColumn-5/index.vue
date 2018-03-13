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
      itemleft: {
        type: String,
        default: "3%"
      },
      itemright: {
        type: String,
        default: "9%"
      },
      itembottom: {
        type: String,
        default: "3%"
      },
      itemtop: {
        type: String,
        default: "0%"
      }
    },
    data() {
      return {
        struct: {
          boxTitle: [
            {
              name: "国家级教学工作获奖XX个  ",
              per: "2%",
              icon: "/static/assets/icon-add.png",
            },
            {
              name: "省级教学工作获奖XX个  ",
              per: "2%",
              icon: "/static/assets/icon-add.png"
            },
            {
              name: "校级教学工作获奖XX个",
              per: "2%",
              icon: "/static/assets/icon-add.png"
            },
          ],
          data: [
            {
              name: '专著1',
              value: [15, 16, 17, 17, 20]
            },
            {
              name: '译著',
              value: [26, 28, 30, 32, 34]
            }
          ],
          yName: "数量（人）",
          xName: "时间（年）",
        }
      }
    },
    methods: {
      update() {
        DataUtil.getData(this.source, this, data => {
          var data = data[this.sourcekey];
          this.option = {
            tooltip: {
              axis: "item"
            },
            grid: {
              left: this.itemleft,
              right: this.itemright,
              bottom: this.itembottom,
              top: this.itemtop
            },
            xAxis: {
              name: data.xAxis.name,
              nameLocation: "end",
              nameGap: 0,
              nameTextStyle: {
                color: 'rgb(163,164,166)'
              },
              type: 'category',
              data: data.xAxis.data,
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
            yAxis: {
              name: data.yAxis.name,
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
            series: [
              {
                name: '学生管理与社会服务',
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
                    color: "rgb(108,176,243)"
                  }
                },

                data: [17, 22, 41, 55, 52]
              },
              {
                name: '成长能力',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    color: 'rgb(215,215,215)'
                  }
                },
                itemStyle: {
                  normal: {
                    color: "rgb(91,146,206)"
                  }
                },

                data: [69, 89, 32, 42, 45]
              },
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
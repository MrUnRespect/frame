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
      itemStyle1: {
        type: String,
        default: "rgb(72,179,214)"
      },
      itemStyle2: {
        type: String,
        default: "rgb(3,73,96)"
      }
    },
    data() {
      return {
        struct: {
          data: [
            {
              name: "调入2",
              value: 56,
              deep: true
            },
            {
              name: "总人数",
              value: 89,
              deep: false
            }
          ],
          yName: "数量（人）",
          xName: "时间（年）",
        }


      }
    },
    methods: {
      labelShow(o) {
        if (o == true) {
          return {
            normal: {
              show: true,
              position: "center",
              color: "rgb(213,213,213)"
            }
          }
        } else {
          return {}
        }
      },
      chooseColor(o) {
        var color = [this.itemStyle1, this.itemStyle2]
        if (o == true) {
          return color[0]
        } else {
          return color[1]
        }
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          this.option = {
            title: {
              text: data.chartText,
              textStyle: {
                color: this.itemStyle1,
                fontSize: 16,
                rich: {
                  a: {
                    color: "rgb(245,245,245)",
                    fontSize: 16
                  }
                }
              },
              subtext: data.chartSub,
              right: 0,
              bottom: 20,
              subtextStyle: {
                color: "rgb(245,245,245)",
                fontSize: 16,
                rich: {
                  a: {
                    color: "rgb(72,179,214)",
                    fontSize: 16
                  }
                }
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['30%', '60%'],
                label: {
                  normal: {
                    show: false
                  }
                },
                avoidLabelOverlap: false,
                data: data.data.map((o, i) => {
                  return {
                    value: o.value,
                    name: o.name,
                    itemStyle: {
                      normal: {
                        color: this.chooseColor(o.deep)
                      }
                    },
                    label: this.labelShow(o.deep)
                  }
                })
              }
            ]
          };
          this.chart.setOption(this.option);

        })
      }
    }
  }

</script>
<style>
  .chart {
    height: 100%;
    width: 100%;
  }
</style>
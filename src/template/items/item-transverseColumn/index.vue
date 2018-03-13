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
      tempsource: {
        type: String,
        default: "page-1-4"
      },
      sourcekey: {
        type: String,
        default: "data1"
      },
      itemColor: {
        type: Array,
        default() {
          return ["rgb(29,178,162)", "rgb(36,144,140)", "rgb(30,92,100)", "rgb(27,59,74)"]
        }
      },
      isTitle: {
        type: String,
        default: "false"
      }
    },
    data() {
      return {
        struct: {
          data: [
            { name: "20~30岁", data: [55, 45, 55, 65, 33] },
            { name: "30~40岁", data: [48, 42, 41, 55, 52] },
            { name: "20~50岁", data: [69, 89, 32, 42, 45] },
            { name: "50~60岁", data: [23, 26, 65, 82, 56] },
          ],
          yAxis: ['2017', '2016', '2015', '2014', '2013'],
          yName: "数量（人）",
          xName: "时间（年）",
        },
        chartTitle: {
          name: "",
          per: ""
        }
      }
    },
    computed: {
      title() {

        if (this.isTitle == "true") {

          return {
            // text: '天气{a|情况}统计',
            text: `教师年龄多分布在：{a|${this.chartTitle.name}}，占比：{b|${this.chartTitle.per}}`,
            left: "center",
            textStyle: {
              color: "white",
              fontSize: 16,
              rich: {
                a: {
                  color: 'rgb(228,112,172)',
                  fontSize: 18,
                },
                b: {
                  color: "rgb(4,160,216)",
                  fontSize: 18,
                }

              }


            }

          }
        } else if (this.isTitle == "false") {

          return ""
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
          let { data, yAxis, chartTitle, yName, xName } = res[this.sourcekey];
          this.chartTitle = chartTitle
          this.option = {
            title: this.title,
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: data.map(o => {
                return o.name
              }),
              right: 10,
              top: "middle",
              orient: "vertical",
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 20,
              textStyle: {
                color: "white"
              }
            },
            grid: {
              left: '3%',
              right: '25%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              name: xName,
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
            yAxis: {
              name: yName,
              nameTextStyle: {
                color: 'rgb(163,164,166)'
              },
              type: 'category',
              data: yAxis,
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
            series: data.map((o, i) => {
              return {
                name: o.name,
                type: 'bar',
                stack: '总量',
                barWidth: 20,
                itemStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight',
                    color: "rgb(245,247,247)"
                  }
                },
                data: o.data
              }
            })

          };
          this.chart.setOption(this.option, { notMerge: true });
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
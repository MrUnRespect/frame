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
        default: "data2"
      },
      areaStyleColor1: {
        type: String,
        default: "rgba(250,216,124,.8)"
      },
      areaStyleColor2: {
        type: String,
        default: "rgba(250,216,124,.36)"
      }
    },
    data() {
      return {
        struct: {
          xAxis: ['2013', '2014', '2015', '2016', "2017"],
          data: [
            {
              name: "邮件营销",
              data: [120, 132, 101, 134, 90, 230, 210],
              deep: true
            },
            {
              name: "联盟广告",
              data: [220, 182, 191, 234, 290, 330, 310],
              deep: false
            }
          ],
          chartTitle: "参与/主持专业建设教师人数"
        }
      }
    },
    computed: {
      title() {
        if (this.struct.chartTitle) {
          return {
            text: this.struct.chartTitle,
            left: "center",
            textStyle: {
              color: "rgb(211, 174, 72)",

            }
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      chooseColor(o) {
        if (o == true) {
          return this.areaStyleColor1
        } else {
          return this.areaStyleColor2
        }
      },
      update() {
        DataUtil.getData(this.source, this, res => {

          var data = res[this.sourcekey];
          this.struct = res[this.sourcekey];
          window.a = this.struct
          var series = []
          data.data.forEach(o => {
            series.push({
              name: o.name,
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {
                  color: this.chooseColor(o.deep)
                }
              },
              symbolSize: 1,
              showSymbol: false,
              itemStyle: {
                normal: {
                  color: "rgba(250,216,124,.8)"
                }
              },
              lineStyle: {
                normal: {
                  color: "transparent"
                }
              },
              data: o.data,
              label: {
                normal: {
                  show: true,
                  color: "rgb(163,163,166)"
                }
              },
            })
          })
          this.option = {
            tooltip: {
              trigger: 'axis',
            },
            title: this.title,
            grid: {
              left: '7%',
              right: '8%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: data.xAxis,
                name: "年",
                nameTextStyle: {
                  color: 'rgb(163,164,166)'
                },
                axisLabel: {
                  color: "rgb(163,163,166)"
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: "数量（人）",
                nameTextStyle: {
                  color: "rgb(163,163,166)"
                },
                splitLine: {
                  show: false
                },
                splitNumber: 3,
                axisLabel: {
                  color: "rgb(163,163,166)"
                }
              }
            ],
            series: series
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
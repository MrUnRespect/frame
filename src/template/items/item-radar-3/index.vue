<template>
  <item-container>
    <div ref="chart" class="chart">
    </div>
  </item-container>
</template>
<script>
  let echarts = Vue.echarts;
  export default {
    data() {
      return {
        struct: [
          {
            name: "个人成长指数",
            value: [5000, 7000, 12000, 11000, 15000, 14000]
          },
          {
            name: "全院平均",
            value: [2500, 12000, 8000, 8500, 12000, 12000]
          }
        ]
      }
    },
    props: {
      sourcekey: {
        type: String,
        default: "data2"
      }
    },
    methods: {
      chooseColor(i) {
        var color = ["rgba(237,116,178,0.8)", "rgba(107,176,243,0.6)"]
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          this.option = {
            title: {
              text: '十三五战略规划任务目标完成均衡情况',
              left: "center",
              top: "5%",
              textStyle: {
                color: "rgb(213,213,213)"
              }
            },
            radar: {
              radius: '60%',
              name: {
                color: "rgb(202,202,202)"
              },
              axisLine: {
                lineStyle: {
                  color: '#fff',
                  opacity: .2
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#fff',
                  opacity: .2
                }
              },
              splitArea: {
                areaStyle: {
                  color: 'transparent',
                  opacity: 1,
                  shadowBlur: 45,
                  shadowColor: 'rgba(0,0,0,.5)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 15,
                }
              },
              indicator: [{
                name: '一流大学',
                max: 100
              }, {
                name: '大学治理能力提升',
                max: 100
              }, {
                name: ' 智慧校园',
                max: 100
              }, {
                name: '一流国际合作',
                max: 100
              }, {
                name: '一流社会服务',
                max: 100
              },
              {
                name: '一流学生培养',
                max: 100
              },
              {
                name: '一流师资队伍',
                max: 100
              },
              {
                name: '一流专业建设',
                max: 100
              }]
            },
            legend: {
              data: data.data.map(o => {
                return {
                  name: o.name,
                  value: o.value,
                  icon: "rect"
                }
              }),
              bottom: "5%",
              left: "center",
              itemHeight: 2 ,
              textStyle: {
                color: "rgb(213,213,213)"
              }
            },
            series: [{
              name: '满意度',
              type: 'radar',
              symbolSize: 2,
              label: {
                normal: {
                  show: true
                }
              },
              data: data.data.map((o, i) => {
                return {
                  value: o.value,
                  name: o.name,
                  itemStyle: {
                    normal: {
                      color: this.chooseColor(i)
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      formatter: "{c}%",
                      color: "rgb(240,189,39)"
                    }
                  },
                  // areaStyle: {
                  //   normal: {
                  //     color: this.chooseColor(i)
                  //   }
                  // }
                }
              })
            }],
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
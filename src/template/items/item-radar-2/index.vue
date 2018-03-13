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
                name: '校园文化满意度',
                max: 100
              }, {
                name: '餐饮满意度',
                max: 100
              }, {
                name: ' 公共设施满意度',
                max: 100
              }, {
                name: '宿舍管理满意度',
                max: 100
              }, {
                name: '安全保障满意度',
                max: 100
              },
              {
                name: '综合满意度',
                max: 100
              }]
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
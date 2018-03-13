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
            legend: {
              bottom: 0,
              data: ['个人成长指数', '全院平均'],
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 40,
              textStyle: {
                color: "rgb(202,202,202)"
              }
            },
            radar: {
              radius: '55%',
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
                name: '学生管理与社会服务',
                max: 6000
              }, {
                name: '考核评价',
                max: 16000
              }, {
                name: ' 成长能力',
                max: 30000
              }, {
                name: '科研能力',
                max: 35000
              }, {
                name: '教学能力',
                max: 50000
              }]
            },
            series: [{
              name: '个人成长指数与全院平均对比',
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
                  areaStyle: {
                    normal: {
                      color: this.chooseColor(i)
                    }
                  }
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
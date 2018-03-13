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
      chooseColor(i) {
        var color = ["rgb(69,114,167)", "rgb(147,169,207)"]
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, data => {
          var data = data[this.sourcekey];
          this.option = {
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: data.data.map(o => {
                return o.name
              }),
              right: 0,
              top: "center",
              orient: "vertical",
              textStyle: {
                color: "rgb(213,213,213)"
              }
            },
            grid: {
              left: this.itemleft,
              right: this.itemright,
              bottom: this.itembottom,
              top: this.itemtop,
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['2013', '2014', '2015', '2016', '2017'],
                name: data.xName,
                nameTextStyle: {
                  color: "rgb(214,214,214)"
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
                  color: "rgb(214,214,214)"
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
            series: data.data.map((o, i) => {
              return {
                name: o.name,
                type: 'bar',
                data: o.value,
                barGap: 0,
                itemStyle: {
                  normal: {
                    color: this.chooseColor(i)
                  }
                }
              }
            })
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
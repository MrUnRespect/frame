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
      // source: {
      //   type: String,
      //   default: "page-1-3"
      // },
      sourcekey: {
        type: String,
        default: "data2"
      }
    },
    data() {
      return {
        struct: {
          data: [
            {
              name: "XXX学院t",
              value: 60
            },
            {
              name: "XXX学院",
              value: 100
            },
            {
              name: "XXX学院2",
              value: 85
            },
            {
              name: "XXX学院3",
              value: 45
            },
            {
              name: "XXX学院4",
              value: 75
            },
            {
              name: "1",
              value: 45
            },
            {
              name: "2",
              value: 35
            },
            {
              name: "3",
              value: 50
            },
            {
              name: "4",
              value: 45
            }
          ]
        }
      }
    },
    methods: {
      chooseColor(i) {
        var color = ["rgba(86,180,246,.32)", "rgba(66,248,177,.6)", "rgba(51,103,236,.55)", "rgb(204,140,251)", "rgba(137,239,228,.72)", "rgba(86,180,246,.32)", "#fad87c", "#d6504d", "#7c995b", "rgba(66,248,177,.6)"]
        i = i % color.length
        return color[i]
      },
      update() {
        DataUtil.getData(this.source, this, data => {
          data = data[this.sourcekey];
          var dataShadow = []
          data.data.forEach((o, i) => {
            dataShadow.push({
              name: o.name,
              category: i,
              value: o.value,
              itemStyle: {
                normal: {
                  color: this.chooseColor(i)
                }
              }
            })
          })



          this.option = {
            tooltip: {},
            series: [
              {
                type: 'graph',
                layout: 'force',
                symbolSize: function (size) {
                  return size;
                },
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 12
                    },
                  }
                },
                force: {
                  repulsion: 150
                },
                data: dataShadow

              }
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
<template>
  <item-container>
    <div ref="chart" class="chart">
    </div>
  </item-container>
</template>
<script>
  let c
  export default {
    props: {
      sourcekey: {
        type: String,
        default: "data2"
      }
    },
    data() {
      return {
        struct: {
          data: {}
        }
      }
    },
    methods: {
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          var dataC = data.data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
          });
          this.option = {
            tooltip: {
              position: 'top'
            },
            animation: false,
            grid: {
              height: '80%',
              y: '10%'
            },
            xAxis: {
              type: 'category',
              data: data.step,
              splitArea: {
                show: true
              },
              axisLabel: {
                color: "rgb(213,213,213)"
              }
            },
            yAxis: {
              type: 'category',
              data: data.grade,
              splitArea: {
                show: true
              },
              axisLabel: {
                color: "rgb(213,213,213)"
              }
            },
            visualMap: {
              min: 0,
              max: 10,
              calculable: true,
              show: false,
              inRange: {
                color: ["#ffffff", "#e8192f", "#d6664d", "#B9044E", "#f0ba2e", "#d3ce2b", "#169A7f", "#0b6573", "#1BB3c8"]
              }
            },
            series: [{
              name: 'Punch Card',
              type: 'heatmap',
              data: dataC,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
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
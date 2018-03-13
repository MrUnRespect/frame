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
        default: "data3"
      }
    },
    data() {
      return {
        struct: {
          value: 50,
        }
      }
    },
    methods: {
      update() {
        DataUtil.getData(this.source, this, data => {
          data = data[this.sourcekey];
          this.option = {
            series: [
              {
                name: '业务指标',
                type: 'gauge',
                detail: {
                  // formatter: '{value}%',
                  // color: "rgb(238,198,75)",
                  // fontSize: 15,
                  // offsetCenter: [0, "80%"],
                  show: false
                },
                title: {
                  show: false
                  // offsetCenter: [0, "110%"],
                  // textStyle: {       
                  //   fontSize: 20,
                  //   color: "rgb(238,198,75)",
                  // }
                },
                axisLine: {            // 
                  lineStyle: {
                    width: 0,
                    color: [[0.8, 'rgb(135,237,228)'], [1, 'rgb(191,98,95)']],

                  }
                },
                itemStyle: {
                  normal: {
                    color: "rgb(238,198,75)",
                  }
                },
                axisTick: {
                  lineStyle: {
                    width: 2,
                    color: 'auto',
                  }
                },
                splitLine: {
                  length: 20,
                  lineStyle: {
                    color: "auto",
                    width: 6
                  }
                },
                axisLabel: {
                   color: 'rgb(213,213,213)'
                },
                data: data
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
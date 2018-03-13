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
        default: "data1"
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
          console.log(data)
          this.option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',

                data: [data.data],

                top: '18%',
                bottom: '14%',
                lineStyle: {
                  normal: {
                    color: "rgb(123,123,123)"
                  }
                },
                label: {
                  normal: {
                    color: "rgb(213,213,213)",
                    fontSize:12
                  }
                },

                layout: 'radial',

                symbol: 'emptyCircle',

                symbolSize: 7,

                initialTreeDepth: 3,

                // animationDurationUpdate: 750

              }
            ]
          }
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
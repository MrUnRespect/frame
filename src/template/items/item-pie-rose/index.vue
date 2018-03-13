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
        default: "data1"
      },
    },
    data() {
      return {
        struct: {
          data: [
            { value: 10, name: 'rose11' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ],

        }


      }
    },
    methods: {
      chooseColor(o) {
        var color = [this.itemStyle1, this.itemStyle2]
        if (o == true) {
          return color[0]
        } else {
          return color[1]
        }
      },
      update() {
        DataUtil.getData(this.source, this, res => {
          var data = res[this.sourcekey];
          this.option = {
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '面积模式',
                type: 'pie',
                radius: ["30%", "65%"],
                center: ['50%', '50%'],
                roseType: 'area',
                data: data.data
              }
            ]
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
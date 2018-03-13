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
    }
  },
  data() {
    return {
      struct: {
        dataAxis: ["刘", "晨", "智", "是", "个", "二", "B"],
        data: [220, 182, 191, 234, 290, 330, 310],
        yMax: 500
      }
    };
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, res => {
        var data1 = res[this.sourcekey];
        let dataShadow = [];
        for (var i = 0; i < data1.data.length; i++) {
          dataShadow.push(data1.yMax);
        }
        this.option = {
          title: {
            text: "特性示例：渐变色 阴影 点击缩放",
            subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom"
          },
          xAxis: {
            data: data1.dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#999"
              }
            }
          },
          dataZoom: [
            {
              type: "inside"
            }
          ],
          series: [
            {
              // For shadow
              type: "bar",
              itemStyle: {
                normal: { color: "rgba(0,0,0,0.05)" }
              },
              barGap: "-100%",
              barCategoryGap: "40%",
              data: dataShadow,
              animation: false
            },
            {
              type: "bar",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#83bff6" },
                    { offset: 0.5, color: "#188df0" },
                    { offset: 1, color: "#188df0" }
                  ])
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" }
                  ])
                }
              },
              data: data1.data
            }
          ]
        };
        this.chart.setOption(this.option);
        var zoomSize = 6;
        this.chart.on("click", params => {
          this.chart.dispatchAction({
            type: "dataZoom",
            startValue:
              data1.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              data1.dataAxis[
                Math.min(params.dataIndex + zoomSize / 2, data1.data.length - 1)
              ]
          });
        });
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
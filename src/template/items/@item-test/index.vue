<template>
  <item-container>
    <div ref="chart" class="chart" style="background:red">
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
      }
    },
  };

</script>
<style>
  .chart {
    height: 100%;
    width: 100%;
  }
</style>
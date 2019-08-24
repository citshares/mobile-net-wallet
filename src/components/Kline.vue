<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/candle.min.js"></script>


<template>
  <ve-candle :data="chartData" :settings="chartSettings"></ve-candle>
</template>

<script>
  import { test } from '../js/Kline.js'
  export default {
    mounted () {
      test()
    },
    data () {
      this.chartSettings = {
        showMA: true,
        showVol: true
      }
      return {
        chartData: {
          columns: ['日期', 'open', 'close', 'lowest', 'highest', 'vol'],
          rows: [
            { '日期': '2004-01-05', open: 10411.85, close: 10544.07, lowest: 10411.85, highest: 10575.92, vol: 221290000 },
            { '日期': '2004-02-27', open: 10581.55, close: 10583.92, lowest: 10519.03, highest: 10689.55, vol: 200050000 }
          ]
        }
      }
    }
  }
</script>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/candle.min.js"></script>


<template>
  <ve-candle :data="chartData" :settings="chartSettings"></ve-candle>
</template>

<script>
  import { test } from '../js/Kline.js'
  import { ChainConnectMarket, GetDataMarket, CleanDataList } from '../js/ChainData.js'

  export default {
    mounted () {
      ChainConnectMarket()
      this.timer = setInterval(this.refresh, 3000)
    },
    methods: {

      sortByDate(a, b){
         var aa = new Date(a['日期'])
         var bb = new Date(b['日期'])
         return aa-bb
      },

      fillData (startDate, seq = 0, by_time = 1) {
        this.trade_detail = GetDataMarket(startDate, seq, by_time)
        if (this.trade_detail.length == 0) {
            return -1
        }     

        for (var i = 0; i < this.trade_detail.length; i++) {
           if (this.trade_detail[i]['sequence'] > this.start_req) {
              continue
           }


           if (this.myrows.length == 0) {
              var temp = {}
              temp['日期'] = this.trade_detail[i]['date'].slice(0, -9)
              temp['open'] = this.trade_detail[i]['price']
              temp['close'] = this.trade_detail[i]['price']
              temp['lowest'] = this.trade_detail[i]['price']
              temp['highest'] = this.trade_detail[i]['price']
              temp['vol'] = parseFloat(this.trade_detail[i]['value'])
              temp['seq'] = this.trade_detail[i]['sequence']
              this.myrows.push(temp)
           }else{
              var found = 0
              for(var j = 0; j < this.myrows.length;j++) {
                  if (this.myrows[j]['seq'] === this.trade_detail[i]['sequence']) {
                     found = 1
                     break
                  }
              }
              if (found == 0) {
                     var temp = {}
                     temp['日期'] = this.trade_detail[i]['date'].slice(0, -9)
                     temp['open'] = this.trade_detail[i]['price']
                     temp['close'] = this.trade_detail[i]['price']
                     temp['lowest'] = this.trade_detail[i]['price']
                     temp['highest'] = this.trade_detail[i]['price']
                     temp['vol'] = parseFloat(this.trade_detail[i]['value'])
                     temp['seq'] = this.trade_detail[i]['sequence']
                     this.myrows.push(temp)
              }
           }
        }
        
        this.myrows.sort(this.sortByDate)

        CleanDataList()
	this.chartData.columns = ['日期', 'open', 'close', 'lowest', 'highest', 'vol']
        this.chartData.rows = []
        var day = []
        var open = []
        var close = []
        var lowest = []
        var highest = []
        var vol = []
        
        for (var k = 0 ; k < this.myrows.length; k++) {
           if (k == 0) {
               day = this.myrows[k]['日期']
               open = this.myrows[k]['open']
               close = this.myrows[k]['close']
               lowest = this.myrows[k]['lowest']
               highest = this.myrows[k]['highest']
               vol = this.myrows[k]['vol']
           }else{
               if (day == this.myrows[k]['日期']) {
                    open = this.myrows[k]['open']
                    if (lowest > this.myrows[k]['lowest']) {
                        lowest = this.myrows[k]['lowest']
                    }
                    if (highest < this.myrows[k]['highest']) {
                        highest = this.myrows[k]['highest'] 
                    }
                    vol += this.myrows[k]['vol']
               }else {
                  var temp = {}
                  temp['日期'] = day
                  temp['open'] = open
                  temp['close'] = close
                  temp['lowest'] = lowest
                  temp['highest'] = highest
                  temp['vol'] = vol
                  this.chartData.rows.push(temp)
                  day = this.myrows[k]['日期']
                  open = this.myrows[k]['open']
                  close = this.myrows[k]['close']
                  lowest = this.myrows[k]['lowest']
                  highest = this.myrows[k]['highest']
                  vol = this.myrows[k]['vol']              

               }
           } 
        }
        var temp = {}
        temp['日期'] = day
        temp['open'] = open
        temp['close'] = close
        temp['lowest'] = lowest
        temp['highest'] = highest
        temp['vol'] = vol
        this.chartData.rows.push(temp)

        return this.trade_detail[this.trade_detail.length - 1]["sequence"]

      },


      refresh () {
        var startDate = new Date()
        var ret = -1
        if (this.start_seq == 0) {
           ret = this.fillData(startDate, 0, 1)
           if (ret != -1) {
               this.start_seq = ret + 1
           }
        } else {
           ret = this.fillData(startDate, this.start_seq, 0)
           if (ret != -1) {
               this.start_seq = ret
           }
           if (ret == -1) {
               this.error += 1
           }
           if (this.error > 5) {
               clearInterval(this.timer)
           }
        
        }
      },
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data () {
      this.trade_detail = []
      this.start_seq = 0
      this.error = 0
      this.myrows = new Array()
      this.chartSettings = {
        showMA: true,
        showVol: true
      }
      return {
        chartData: {
          columns: [],
          rows: []
        }
      }
    }
  }
</script>

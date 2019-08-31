<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-charts/lib/candle.min.js"></script>


<template>
  <ve-candle :data="chartData" :settings="chartSettings"></ve-candle>
</template>

<script>
  import { test } from '../js/Kline.js'
  import { ChainConnectMarket, GetDataMarket, GetDataMarketTemp } from '../js/ChainData.js'

  export default {
    mounted () {
      ChainConnectMarket()
      this.timer = setInterval(this.refresh, 3000)
    },
    methods: {
      addnew (item, i) {
            if (item['日期'] === this.trade_detail[i]['date'].slice(0, -9) ) {
               item['close'] = this.trade_detail[i]['price']
               if (item['lowest'] > this.trade_detail[i]['price']) {
                   item['lowest'] = this.trade_detail[i]['price']
               }
               if (item['highest'] < this.trade_detail[i]['price']) {
                   item['highest'] = this.trade_detail[i]['price']
               }
               item['vol'] = item['vol'] + this.trade_detail[i]['value']
            }else {

               if (i != (this.trade_detail.length - 1)) {
                   var temp = {}
                   temp['日期']    = item['日期'] 
                   temp['open']    = item['open'] 
                   temp['close']   = item['close'] 
                   temp['lowest']  = item['lowest'] 
                   temp['highest'] = item['highest'] 
                   temp['vol']     = item['vol'] 

                   this.chartData.rows.push(temp)
                   this.myrows.push(temp)
               }
               item['日期'] = this.trade_detail[i]['date'].slice(0, -9)
               item['open'] = this.trade_detail[i]['price']
               item['close'] = this.trade_detail[i]['price']
               item['lowest'] = this.trade_detail[i]['price']
               item['highest'] = this.trade_detail[i]['price']
               item['vol'] = this.trade_detail[i]['value']
               
               if (i == 0) {
                   var temp = {}
                   temp['日期']    = item['日期'] 
                   temp['open']    = item['open'] 
                   temp['close']   = item['close'] 
                   temp['lowest']  = item['lowest'] 
                   temp['highest'] = item['highest'] 
                   temp['vol']     = item['vol'] 

                   this.chartData.rows.push(temp)
                   this.myrows.push(temp)
               } 
              
            }
      },

      fillData (startDate, seq = 0, by_time = 1) {
        this.trade_detail = GetDataMarket(startDate, seq, by_time)
        console.log("CitShares fillData length ", this.trade_detail.length)
        if (this.trade_detail.length == 0) {
            return [-1, -1]
        }     

	this.chartData.columns = ['日期', 'open', 'close', 'lowest', 'highest', 'vol']

        var item = {}
        var found = 0
        for (var i = this.trade_detail.length - 1; i >= 0; i--) {
           if (this.chartData.rows.length == 0) {
              this.addnew(item, i)
           }else{
              for(var j = 0; j < this.chartData.rows.length;j++) {
                  if (this.chartData.rows[j]['日期'] == this.trade_detail[i]['date'].slice(0, -9)){
                      found = 1
                      break
                  }
              }
              if (found == 0) {
                  this.addnew(item, i)
              }else{
                 this.chartData.rows[j]['close'] = this.trade_detail[i]['price']
                 if (this.chartData.rows[j]['lowest'] > this.trade_detail[i]['price']) {
                    this.chartData.rows[j]['lowest'] = this.trade_detail[i]['price']
                 }
                 if (this.chartData.rows[j]['highest'] < this.trade_detail[i]['price']) {
                      this.chartData.rows[j]['highest'] = this.trade_detail[i]['price']
                 }
                 this.chartData.rows[j]['vol'] += this.trade_detail[i]['value']
              }              
           }
        }

        var lastDate =new Date(this.trade_detail[this.trade_detail.length - 1]['date'])
        if (this.trade_detail.length == 0) {
           return [-1, -1]
        } else {
           console.log("CitShares detail start seq ", this.trade_detail[0])
           console.log("CitShares detail stop  seq ", this.trade_detail[this.trade_detail.length - 1])
           return [lastDate, this.trade_detail[this.trade_detail.length - 1]["sequence"]]
        }

      },


      refresh () {
        console.log("CitShares +++++++++++++++++++++++++++++++++++++")
        var startDate = new Date()
        var targetDate = new Date()
        targetDate.setDate(startDate.getDate() - 30)

        console.log("CitShares start_req", this.start_seq)
        var last = []
        if (this.start_seq == 0) {
           console.log("+++++++++++++++")

           this.trade_detail = GetDataMarketTemp(startDate, 0, 1)
           if (this.trade_detail.length == 0) {
               last = [-1, -1]
           }else{
               var lastDate =new Date(this.trade_detail[this.trade_detail.length - 1]['date'])
               console.log("CitShares detail start seq ", this.trade_detail[0])
               console.log("CitShares detail stop  seq ", this.trade_detail[this.trade_detail.length - 1])
               last = [lastDate, this.trade_detail[this.trade_detail.length - 1]["sequence"]]
           }

           console.log("CitShares last[0]", last[0])
           console.log("CitShares last[1]", last[1])
           if (last[1] != -1) {
               this.start_seq = last[1]
               last[1] = last[1] + 1
               this.last = last
           }
        } else {

           console.log("-----------------")
           
           console.log("last[0] ",this.last[0])
           console.log("last[1] ",this.last[1])
           last = this.fillData(this.last[0], this.last[1], 0)
           if (last[1] != -1) {
               this.last = last
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
      this.last = 0
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

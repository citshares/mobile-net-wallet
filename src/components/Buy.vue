<template>
<div>
   <div v-show="CurrentPage === 'buy'">
   <p>挂单</p>
   <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
     <thead>
       <tr style="background-color: #F7F7F7">
         <th>卖 </th>
         <th>价格</th>
         <th>数量</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="v in book['ask']">
            <td>卖 {{ book['ask'].length - book['ask'].indexOf(v) - 1 }}</td>
            <td>{{ v['price'] }}</td>
            <td>{{ v['count'] }}</td>
       </tr>
     </tbody>
   </x-table>
   <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
     <thead>
       <tr style="background-color: #F7F7F7">
         <th>买</th>
         <th>价格</th>
         <th>数量</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="v in book['bid']">
            <td>买 {{ book['bid'].indexOf(v) }}</td>
            <td>{{ v['price'] }}</td>
            <td>{{ v['count'] }}</td>
       </tr>
     </tbody>
   </x-table>
   <p>价格</p>
   <input v-model="buy_price">
   <p>数量</p>
   <input v-model="buy_count">
   <button v-on:click='run_buy'>买入</button>
   
</div>
  <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell, XTable, LoadMore } from 'vux'
import { ChainConnect, GetOrderBook } from '../js/ChainData.js'

export default {
  name: 'QianBao',
  components: {
    Group,
    Cell,
    XTable,
    LoadMore
  },
  methods: {
      UpdateOrder() {
          this.book =  GetOrderBook()
          this.$set(this.book)
          console.log("Update Order, ", this.book)
          console.log("Update Order[ask], ", this.book['ask'])
          console.log("Update Order[ask][0], ", this.book['ask'][0])
          console.log("Update Order[ask][0]['price'] ", this.book['ask'][0]['price'])
          console.log("Update Order[ask][0]['count'] ", this.book['ask'][0]['count'])
          console.log("Update Order[ask][0]['count'] ", this.book['ask'][0]['count'])
          this.$forceUpdate()
      },
      run_buy: function() {
          console.log("run_buy")
          Buy(this.buy_price, this.buy_count)

      }

  },
  mounted () {
    ChainConnect()
    this.account = localStorage.getItem("account")
    console.log("CitShares storage ", this.account)
    if (!this.account) {
       alert('请先导入账户')
       this.$router.push({ path: '/daoru' })
    } else {
        this.timer = setInterval(this.UpdateOrder, 3000)
    }
    this.CurrentPage = "buy"
  },
  beforeDestroy() {
     clearInterval(this.timer)
     this.CurrentPage = ""
  },
  data () {
    this.unlock = 0
    this.book = []
    return {
      account_status : 'import'
    }
  }
}
</script>

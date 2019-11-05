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
   <br>  
   <br>  
   <br>  
   <br>  
   <br>  
</div>
  <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell, XTable, LoadMore } from 'vux'
import { ChainConnect, GetOrderBook, Buy, GetAccount } from '../js/ChainData.js'

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
          this.$forceUpdate()
          this.account_full = GetAccount(this.account)
          console.error("account_full ", this.account_full.get("id"))
      },
      run_buy: function() {
          console.log("run_buy")
	  if (!sessionStorage.unlock) {
	      this.$router.push({ path: '/denglu'})
	  }
          let cny =  this.buy_count * this.buy_price
	  Buy(this.account_full.get("id"), this.buy_count, cny,  sessionStorage.priv)

      }

  },
  mounted () {
    ChainConnect()
    this.account = localStorage.getItem("account")
    if (!this.account) {
       alert('请先导入账户')
       this.$router.push({ path: '/daoru' })
    } else {
        this.timer = setInterval(this.UpdateOrder, 1000)
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
    this.buy_price = 0
    this.buy_count = 0
    return {
      account_status : 'import'
    }
  }
}
</script>

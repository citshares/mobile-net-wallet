<template>
<div>
      <div v-show="CurrentPage === 'sell'">
      <div class="content">
          <p class="input_list"> &nbsp 价格</p>
          &nbsp <input class="input_list" v-model="sell_price">
          <p class="input_list" >&nbsp 数量</p>
          &nbsp <input class="input_list" v-model="sell_count">
          <br>
          <br>
          &nbsp <button class="input_list" v-on:click='run_sell'>卖出</button>
      </div>
      <div class="content">
          <div class="table">
          <x-table >
             <thead>
                <tr style="background-color: #F7F7F7">
                <th>卖 </th>
                <th>价格</th>
                <th>数量</th>
                </tr>
             </thead>
             <tbody>
                <tr class="item" v-for="v in book['ask']">
                   <td>卖{{ book['ask'].length - book['ask'].indexOf(v) - 1 }}</td>
                   <td>&nbsp &nbsp &nbsp {{ v['price'] }} &nbsp &nbsp &nbsp</td>
                   <td> {{ v['count'] }} </td>
                </tr>
             </tbody>
          </x-table>
      </div>
      <div class="table">
          <x-table >
             <thead>
                <tr style="background-color: #F7F7F7">
                   <th>买</th>
                   <th>价格</th>
                   <th>数量</th>
                </tr>
             </thead>
             <tbody>
                 <tr class="item" v-for="v in book['bid']">
                    <td>买{{ book['bid'].indexOf(v) }}</td>
                    <td>&nbsp &nbsp &nbsp{{ v['price'] }} &nbsp &nbsp &nbsp</td>
                    <td>  {{ v['count'] }}  </td>
                 </tr>
             </tbody>
           </x-table>
         </div>
       </div>
</div>
      <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell, LoadMore } from 'vux'
import { ChainConnect, GetOrderBook, Sell, GetAccount} from '../js/ChainData.js'

export default {
  name: 'QianBao',
  components: {
    Group,
    Cell,
    LoadMore
  },
  methods: {
      UpdateOrder() {
          this.book =  GetOrderBook()
          this.$set(this.book)
          this.$forceUpdate()
          this.account_full = GetAccount(this.account)
     
      },
      run_sell: function() {
          if (!sessionStorage.unlock) {
             this.$router.push({ path: '/denglu' })         
          }
          let buyamount = this.sell_count * this.sell_price
          Sell(this.account_full.get("id"), buyamount, this.sell_count, sessionStorage.priv)
          alert('请在挂单页查看')
          this.$router.push({ path: '/my_orders' })

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
    this.CurrentPage = "sell"
  },
  beforeDestroy() {
     clearInterval(this.timer)
     this.CurrentPage = ""
  },
  data () {
    this.unlock = 0
    this.book = []
    this.sell_price = 0
    this.sell_count = 0
    return {
      account_status : 'import'
    }
  }
}
</script>
<style>
.content
{
  float: left;
  width: 50%;
}
.table 
{
  float: top;
  hight: 50%;
  width: 300px;
}
.item
{
  text-align:center;
  max-width: 50px;
}
.input_list
{
   float: top;
   width: 80%;
}
</style>

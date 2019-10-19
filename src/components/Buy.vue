<template>
<div>
   <div>
   <p>sell orders </p>
   <load-more tip="content-bordered=false" :show-loading="false" background-color="#fbf9fe"></load-more>
   <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
     <thead>
       <tr style="background-color: #F7F7F7">
         <th>sell id </th>
         <th>Price     </th>
         <th>Quantity  </th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="v in book['ask']">
            <td>sell   {{ book['ask'].indexOf(v) }}</td>
            <td>{{ v['price'] }}</td>
            <td>{{ v['count'] }}</td>
       </tr>
       <tr>
         <td>Apple</td>
         <td>$1.25</td>
         <td> x 1</td>
       </tr>
       <tr>
         <td>Banana</td>
         <td>$1.20</td>
         <td> x 2</td>
       </tr>
      </tbody>
    </x-table>
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
  },
  beforeDestroy() {
     clearInterval(this.timer)
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

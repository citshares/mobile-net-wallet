<template>
<div>
  <group style="margin-top:20px">
  </group>
  <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell } from 'vux'
import { ChainConnect, GetOrderBook } from '../js/ChainData.js'
export default {
  name: 'QianBao',
  components: {
    Group,
    Cell
  },
  methods: {
      UpdateOrder() {
          var book =  GetOrderBook()
          console.log("Update Order, ", book)
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
    return {
      account_status : 'import'
    }
  }
}
</script>

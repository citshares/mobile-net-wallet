<template>
<div>
  <group style="margin-top:20px">
    <cell title="导入" v-show="account_status == 'import'"  link="/daoru" value=""></cell>
    <cell title="登陆" v-show="account_status == 'login'"  link="/denglu" value=""></cell>
    <cell title="锁定" v-show="account_status == 'unlock'"  @click.native="lock"  value=""></cell>
    <cell title="注销" v-show="account_status != 'import'"  @click.native="zhuxiao" value=""></cell>
    <cell title="数据" link="/chaindata" value=""></cell>
  </group>
  <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell } from 'vux'
import { ChainConnect } from '../js/ChainData.js'
export default {
  name: 'QianBao',
  components: {
    Group,
    Cell
  },
  methods: {
     zhuxiao () {
        console.log("remove item")
        localStorage.removeItem("account")
        localStorage.removeItem("priv")
        localStorage.removeItem("password")
        sessionStorage.clear()
        window.history.go(0);
     },
     lock () {
        sessionStorage.clear()
        this.account_status = 'login'
     }
  },
  mounted () {
    ChainConnect()
    this.account = localStorage.getItem("account")
    console.log("CitShares storage ", this.account)
    if (this.account) {
        this.account_status = "login"
        if (sessionStorage.getItem("unlock") == 1) {
           this.account_status = "unlock"
        }
    }
  },
  data () {
    this.unlock = 0
    return {
      account_status : 'import'
    }
  }
}
</script>

<template>
<div>
  <group style="margin-top:20px">
    <cell title="导入" v-show="account_status == 'import'"  link="/daoru" value=""></cell>
    <cell title="登陆" v-show="account_status == 'login'"  link="/daoru" value=""></cell>
    <cell title="锁定" v-show="account_status == 'unlock'"  link="/daoru" value=""></cell>
    <cell title="注销" v-show="account_status != 'import'"  @click.native="zhuxiao" value=""></cell>
    <cell title="数据" link="/chaindata" value=""></cell>
  </group>
  <router-view></router-view>
</div>
</template>


<script>
import { Group, Cell } from 'vux'
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
        window.history.go(0);
     }
  },
  mounted () {
    this.account = localStorage.getItem("account")
    console.log("CitShares storage ", this.account)
    if (this.account) {
        this.account_status = "login"
        if (this.unlock) {
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

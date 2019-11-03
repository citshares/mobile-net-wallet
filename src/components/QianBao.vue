<template>
<div>
  <p>账户:  {{ account }}</p>
  <p>账户状态： {{ status_show }}</p>
  <p>余额：</p>
  <ol>
      <li> bitCNY: {{ cny_balances }}</li>
      <li>    CTS: {{ cts_balances }}</li>
  </ol>
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
import { ChainConnect, GetAccount, GetCNYBalance, GetCTSBalance } from '../js/ChainData.js'
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
     },
	 Update() {
	 	this.account_full = GetAccount(this.account)
		this.cny_balances = GetCNYBalance(this.account_full)
                this.cts_balances = GetCTSBalance(this.account_full)

		if (this.account_status == "import") {
		    this.status_show = "未导入"
		}else if (this.account_status == "login") {
		    this.status_show = "已锁定"
		}else if (this.account_status == "unlock") {
		    this.status_show = "已解锁"
		}
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

		this.timer = setInterval(this.Update, 3000)
    }

  },
  data () {
    this.unlock = 0
    return {
      account_status : 'import',
	  status_show: "未导入",
	  account_full: [],
	  cny_balances: 0,
	  cts_balances: 0
    }
  }
}
</script>

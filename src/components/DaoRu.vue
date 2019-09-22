<template>
  <div>
     <p>账户：</p> 
     <input v-model="account"> 
     <p>官方钱包注册时的密码（WIF）：</p> 
     <input v-model="priv">
     <p>设置本网页钱包登陆时的密码（交易或转账时需要先登陆）：</p> 
     <input v-model="password">
     <button v-on:click="save">导入</button>
  </div>
</template>

<script>
import { GetKeyFromBrain, Enc, Dec, GetAccount } from '../js/ChainData.js'
export default {
  name: 'DaoRu',
  mounted () {
  },
  methods: {
     save: function () {
         if (!GetAccount(this.account)) {
            alert("Account is not exist")
            return -1
         }
         localStorage.account = this.account
         var ret = GetKeyFromBrain(this.password)
         localStorage.password = Enc(ret[0], ret[0])
         localStorage.priv = Enc(this.priv, ret[1])
         window.history.back(-1);
     }
  },
  beforeDestroy () {
  },
  data () {
    return {
       account: "",
       priv:"",
       password:""
    }
  }
}
</script>


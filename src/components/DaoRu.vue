<template>
  <div>
     <p>账户：</p> 
     <input v-model="account"> 
     <p>官方钱包注册时的密码：</p> 
     <input v-model="priv">
     <p>设置本网页钱包登陆时的密码（交易或转账时需要先登陆）：</p> 
     <input v-model="password">
     <button v-on:click="save">导入</button>
  </div>
</template>

<script>
import { GetKeyFromBrain, Enc, Dec, GetAccount } from '../js/ChainData.js'
import { PrivateKey } from '../js/bitsharesjs/lib'
export default {
  name: 'DaoRu',
  mounted () {
  },
  methods: {
     save: function () {
         localStorage.account = this.account
         var ret = GetKeyFromBrain(this.password)
         localStorage.password = Enc(ret[0], ret[0])
         if (this.priv.length == 45) {
             let seed = this.account + "active" + this.priv;
             let privKey = PrivateKey.fromSeed(seed);
             let wif = privKey.toWif()
             console.error("~~~~ wif ", wif)
             localStorage.priv = Enc(wif, ret[1])
         }else {
             localStorage.priv = Enc(this.priv, ret[1])
         }
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


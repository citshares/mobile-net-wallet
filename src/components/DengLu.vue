<template>
  <div>
     <p>账户：</p> 
     <input v-model="account"> 
     <p>本网页钱包登陆密码：</p> 
     <input v-model="password">
     <button v-on:click="unlock">登陆</button>
  </div>
</template>

<script>
import { GetKeyFromBrain, Enc, Dec } from '../js/ChainData.js'
export default {
  name: 'DaoRu',
  mounted () {
  },
  methods: {
     unlock: function () {
         if (localStorage.getItem("account") != this.account){
            alert("账户错误")
            return -1;
         }
         var ret = GetKeyFromBrain(this.password)
         if (localStorage.getItem("password") != Enc(ret[0], ret[0])) {
            alert("password error")
            return -1;
         }
         sessionStorage.priv = Dec(localStorage.getItem("priv"), ret[1])
         sessionStorage.unlock = 1
         window.history.back(-1);
     }
  },
  beforeDestroy () {
  },
  data () {
    return {
       account: localStorage.getItem("account"),
       priv:"",
       password:""
    }
  }
}
</script>


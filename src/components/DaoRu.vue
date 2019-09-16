<template>
  <div>
     <p>账户：</p> 
     <input v-model="account"> 
     <p>官方钱包注册时的密码（WIF）：</p> 
     <input v-model="priv">
     <p>本网页钱包交易密码：</p> 
     <input v-model="password">
     <button v-on:click="save">导入</button>
  </div>
</template>

<script>
export default {
  name: 'DaoRu',
  mounted () {
  },
  methods: {
     save: function () {
         console.log("click save")
         localStorage.account = this.account
         localStorage.priv = this.priv
         localStorage.password = this.password
         window.history.back(-1);
     }
  },
  beforeDestroy () {
  },
  data () {
    return {
       account: "test",
       priv:"",
       password:""
    }
  }
}
</script>


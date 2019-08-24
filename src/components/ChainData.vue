<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { test } from '../js/ChainData.js'
export default {
  name: 'ChainData',
  mounted () {
    this.msg = test()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<template>
  <div>
    <div v-for="value in object">
      {{ value }}
    </div>
  </div>
</template>

<script>
import { GetData, ChainConnect } from '../js/ChainData.js'
export default {
  name: 'ChainData',
  mounted () {
    ChainConnect()
    this.timer = setInterval(this.refresh, 1000)
  },
  methods: {
    refresh() {
      this.object = GetData()
      console.log("CitShares: refresh object ", this.object.toString())
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  data () {
    return {
      timer: '',
      object: [0,0]
    }
  }
}
</script>


<template>
<div>
  <group style="margin-top:20px">
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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

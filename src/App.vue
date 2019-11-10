<template>
  <div id="app" style="height:100%;">
    <group style="margin-top:20px;">
       <cell title="CTS/CNY" link="/kline" value="交易" v-show="CurrentPage === 'HangQing'" @click.native="CurrentPage = 'CtsKline'"></cell>
    </group>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">

      <tabbar-item :link="{path:'/'}" :selected="route.path === '/'" @click.native="CurrentPage = 'HangQing'">
         <span slot="label">行情</span>
      </tabbar-item>

      <tabbar-item :link="{path:'/qianbao'}" @click.native="CurrentPage = 'QianBao'" >
         <span slot="label">钱包</span>
      </tabbar-item>
    
      <tabbar-item :link="{path:'/buy'}" @click.native="CurrentPage = 'Buy'" >
         <span slot="label">买</span>
      </tabbar-item>
 
      <tabbar-item :link="{path:'/sell'}" @click.native="CurrentPage = 'Sell'" >
         <span slot="label">卖</span>
      </tabbar-item>


      <tabbar-item :link="{path:'/my_orders'}" @click.native="CurrentPage = 'My_orders'" >
         <span slot="label">我的挂单</span>
      </tabbar-item>

    </tabbar>
  <router-view></router-view>
  </div>

</template>

<script>
import { Group, Cell, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'
import { ChainConnect, GetAccount } from './js/ChainData.js'

export default {
  name: 'app',
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  methods: {
  },
  mounted () {
       ChainConnect()
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    })
  },
  data () {
    return {
      CurrentPage: 'HangQing'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body {
   height: 100%;
   width: 100%;
   overflow-x: hidden;
}

</style>

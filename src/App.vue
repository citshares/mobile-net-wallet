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
 
      <tabbar-item :link="{path:'/qianbao'}" @click.native="CurrentPage = 'QianBao'" >
         <span slot="label">卖</span>
      </tabbar-item>


    </tabbar>
  <router-view></router-view>
  </div>

</template>

<script>
import { Group, Cell, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  methods: {
    onShowModeChange (val) {
      this.CurrentPage = true
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      this.CurrentPage = true
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    }
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
      }
      if (path === 'demo') {
        setTimeout(() => {
          this.box = document.querySelector('#demo_list_box')
          if (this.box) {
            this.box.removeEventListener('scroll', this.handler, false)
            this.box.addEventListener('scroll', this.handler, false)
          }
        }, 1000)
      } else {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    })
  },
  data () {
    return {
      entryUrl: document.location.href,
      CurrentPage: 'HangQing'
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
.weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
</style>

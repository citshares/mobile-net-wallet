<template>
  <div id="app" style="height:100%;">
    <group style="margin-top:20px;">
       <cell title="CTS/CNY" link="/demo" value="交易" v-show="drawerVisibility" @click.native="drawerVisibility = false"></cell>
    </group>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">

      <tabbar-item :link="{path:'/'}" :selected="route.path === '/'" @click.native="drawerVisibility = true">
         <span slot="label">行情</span>
      </tabbar-item>

      <tabbar-item :link="{path:'/demo'}" @click.native="drawerVisibility = false" >
         <span slot="label">钱包</span>
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
      this.drawerVisibility = true
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      this.drawerVisibility = true
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
      drawerVisibility: true
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

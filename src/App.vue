<template>
  <div id="app" style="height:100%;">
    <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">
        <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
         <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
           <span slot="label">行情</span>
             </tabbar-item>
               <tabbar-item :link="{path:'/demo'}" :selected="isDemo" badge="9">
               <span class="demo-icon-22" slot="icon">&#xe633;</span>
               <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>钱包</span></span>
             </tabbar-item>
      </tabbar>
    
  </div>
</template>

<script>
import { Drawer, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Drawer,
    Tabbar,
    TabbarItem
  },
  methods: {
    onShowModeChange (val) {
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    }
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      deviceready: state => state.app.deviceready,
      demoTop: state => state.vux.demoScrollTop,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowBar () {
      if (this.entryUrl.indexOf('hide-tab-bar') > -1) {
        return false
      }
      return true
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    }
  },
  data () {
    return {
      entryUrl: document.location.href,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left'
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
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}

</style>
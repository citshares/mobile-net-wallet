// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import { sync } from 'vuex-router-sync'
import QianBao from './components/QianBao'
import Buy from './components/Buy'
import Kline from './components/Kline'
import ChainData from './components/ChainData'
import DaoRu from './components/DaoRu'
import DengLu from './components/DengLu'
import { Group } from 'vux'
import Candle from 'v-charts/lib/candle.common'

Vue.use(VueRouter)
Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

const shouldUseTransition = !/transition=none/.test(location.href)

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: shouldUseTransition ? 'forward' : ''
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  }
})

const routes = [
  {path: '/qianbao', component: QianBao},
  {path: '/kline', component: Kline},
  {path: '/chaindata', component: ChainData},
  {path: '/daoru', component: DaoRu},
  {path: '/denglu', component: DengLu},
  {path: '/buy', component: Buy}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router)

Vue.component('group', Group)

Vue.component('ve-candle', Candle)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import { sync } from 'vuex-router-sync'
import Demo from './components/DemoVux'
import { Group } from 'vux'

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
  {path: '/demo', component: Demo}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router)

Vue.component('group', Group)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer' // 加载mockserver即可
import './filters'
import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.jpg'
Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading: loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用vuex
  // components: { App },
  render: h => h(App),
  template: '<App/>'

})

// 语法支持
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 解决点击延迟
import fastclick from 'fastclick'
// 懒加载图片
import VueLazyload from 'vue-lazyload'
// Vuex
import store from 'store/main.js'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/header/avatar.png')
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

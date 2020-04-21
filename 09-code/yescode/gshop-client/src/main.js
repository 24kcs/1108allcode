import Vue from 'vue'
import App from './App.vue'
// 引入路由器对象
import router from './router'
// 引入Vuex仓库对象
import store from './store'

// 引入TypeNav 商品分类导航组件,并注册成为公共组件
import TypeNav from './components/TypeNav'

Vue.config.productionTip = false
// 注册全局 商品分类导航
Vue.component('TypeNav', TypeNav)
new Vue({
  render: h => h(App),
  // 注册路由器
  router,
  // 注册Vuex仓库
  store
}).$mount('#app')

// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器
import router from './router'
// 引入vuex的store
import store from './store'
// 引入mock
import './mock/mockServer'
// 引入swiper的样式文件
import 'swiper/css/swiper.css'

// 引入商品分类导航TypeNav组件
import TypeNav from './components/TypeNav'
// 引入轮播图Carousel组件
import Carousel from './components/Carousel'
// 设置浏览器的控制台中是否显示默认提示信息
Vue.config.productionTip = false
// 注册全局组件(商品分类导航)
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)

// Vue.prototype.$bus = new Vue()  ----  // 创建Vue实例之前---数据初始化之前
// 创建Vue实例,并挂载
new Vue({
  // 数据初始化之前---生命周期回调
  beforeCreate () {
    Vue.prototype.$bus =this
  },
  render: h => h(App),
  // 注册路由器
  router,
  // 注册仓库
  store
}).$mount('#app')

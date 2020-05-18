// 引入Vuex
import Vue from 'vue'
// 引入App组件
import App from './App'
// 设置控制台不显示默认提示信息
Vue.config.productionTip = false
// 设置当前的程序的类型是微信小程序
App.mpType = 'app'
// 实例化Vue
const app = new Vue(App)
// 挂载
app.$mount()

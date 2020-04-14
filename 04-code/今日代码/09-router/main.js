// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
import router from './router'
// 设置浏览器的控制台中的提示信息是否显示
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

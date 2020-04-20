// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 设置浏览器的控制台中是否显示默认提示信息
Vue.config.productionTip = false
// 创建Vue实例,并挂载
new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
// 引入路由器对象
import router from './router'
Vue.config.productionTip = false
// 脚手架3的main.js中代码
new Vue({
  render: h => h(App),
  // 注册路由器
  router
  // 获取id为app的html容器通过$mount进行挂载
}).$mount('#app')




















// render:function (createElement){
//   return createElement(App)
// }
// render:(createElement)=>{
//   return createElement(App)
// }

// render:(h)=>{
//   return h(App)
// }

// render:h=> h(App)



// 脚手架2的main.js文件中代码
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })
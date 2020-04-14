// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用插件
Vue.use(VueRouter)
// 实例化并暴露
export default new VueRouter({
  mode: 'history',
  routes
})

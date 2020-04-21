// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 方案2:解决路由跳转的bug---来自Header组件文件中搜索按钮跳转的bug,统一解决方式
const originPath = VueRouter.prototype.push
// 给成功的回调函数指令一个默认的空函数参数即可
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPath.call(this, location, onComplete, onAbort)
}
// 给失败的回调函数指令一个默认的空函数参数即可
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originPath.call(this, location, onComplete, onAbort)
}
// 指定catch也可以
// VueRouter.prototype.replace = function (location, onComplete, onAbort) {
//   return originPath.call(this, location, onComplete, onAbort).catch(() => { })
// }
// 声明使用路由
Vue.use(VueRouter)
// 实例化路由器对象并暴露出去
export default new VueRouter({
  mode: 'history',
  routes
})
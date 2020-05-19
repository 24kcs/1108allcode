// 引入Vue
import Vue from 'vue'
// 引入VueRouter 
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
// 引入store
import store from '../store'




// function Person () { }// 构造函数
// Person.prototype.sayHi = function () { }
// // per就是实例对象
// var per = new Person()
// per.sayHi() // 实例对象调用实例方法---该实例方法是在构造函数的原型对象上呢
// 修改了sayHi
// xiugai = Person.prototype.sayHi
// Person.prototype.sayHi= function(){
//   return xiugai 
// }



// 解决路由跳转的bug-----从Header组件内部搜索按钮跳转的bug过来的,统一的解决方案
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给成功的回调函数指定一个默认为空的的函数参数即可
VueRouter.prototype.push = function (location, onComplete = () => { }, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
// 给失败的回调函数指定一个默认为空的函数参数即可
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
  return originReplace.call(this, location, onComplete, onAbort)
}
// 指定catch也可以
// VueRouter.prototype.replace = function (location, onComplete, onAbort = () => { }) {
//   return originReplace.call(this, location, onComplete, onAbort).catch(() => { })
// }











// 声明使用路由
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash', // 设置路由地址的模式---hash是带#,history---不带#
  routes,  // 路由组件的注册的数组
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      x: 0,
      y: 0
    }
  }
})
/**
 * 
 * to:目标的路由route对象
 * from:当前的路由route对象
 * next:用来控制路由跳转的函数
 *   next() 的使用
 *   1) next() 不传入参数,代表的是放行
 *   2) next(地址) , 传入了路径,代表的是强制跳转到指定的path的路由
 *   3) 不执行next(),代表的就是不放行
 * 
 * 
 */
// 使用全局前置路由守卫
// router.beforeEach((to,from,next)=>{
//   // console.log(to)
//   // console.log(from)
//   // console.log(next)
//   // next() // 放行
//   // 练习需求:如果当前请求的不是login,就去login,否则就放行

// //  if(to.path!=='/login'){
// //    next('/login')
// //  }else{
// //    next()
// //  }

// })

router.beforeEach((to, from, next) => {
  // 1. 只有登录的情况下,才能去访问交易(/trade)/支付(/pay)/个人中心界面(/center)
  // 要检测的路由地址
  const checkPath = ['/trade', '/pay', '/center']
  // 目标路由地址
  const targetPath = to.path
  // if(checkPath.indexOf(targetPath)!==-1){
  if (checkPath.find(path => targetPath.indexOf(path) === 0)) {
  //  console.log(targetPath)
    // 判断是否登录了
    if (store.state.user.userInfo.name) {
      next()
    } else {
      // 确实要访问上面的路由地址,但是,没有登录
      // 需求:登录成功后跳转到想去的目标路由地址
      next('/login?redirect=' + targetPath)
    }
  } else {
    // 正常的放行
    next()
  }

})





// 实例化路由器对象,并暴露出去
export default router
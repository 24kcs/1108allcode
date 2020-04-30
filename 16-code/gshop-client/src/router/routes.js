// 引入组件,并注册成路由组件 -------------
// @相当于src,目前使用@符号是没有任何提示的,配置jsconfig.json的文件,设置@引入的智能提示

// 引入首页组件
import Home from '@/pages/Home'
// 引入注册组件
import Register from '@/pages/Register'
// 引入登录组件
import Login from '@/pages/Login'
// 引入Search组件
import Search from '@/pages/Search'
// 引入Detail组件
import Detail from '@/pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '@/pages/AddCartSuccess'
// 引入购物车组件
import ShopCart from '@/pages/ShopCart'
export default [
  // 首页路由组件
  {
    path: '/',
    component: Home
  },
  // 注册路由组件
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true // 是否隐藏Footer组件
    }
  },
  // 登录路由组件
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true // 是否隐藏Footer组件
    }
  },
  // 搜索路由组件
  {
    // 路由传参
    name: 'search', // 命名路由
    path: '/search/:keyword?', // params参数可传可不传
    component: Search
  },
  // 详情路由组件
  {
    name: 'detail', // 命名路由
    path: '/detail/:skuId', 
    component: Detail
  },
  // 添加成功的购物车路由组件
  {
    path: '/addcartsuccess', 
    component: AddCartSuccess
  },
  // 购物车路由组件
  {
    path: '/shopcart', 
    component: ShopCart
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]
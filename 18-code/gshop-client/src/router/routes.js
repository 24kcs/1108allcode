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
// 引入交易组件
import Trade from '@/pages/Trade'
// 引入支付组件
import Pay from '@/pages/Pay'
// 引入支付成功组件
import PaySuccess from '@/pages/PaySuccess'
// 引入个人中心组件
import Center from '@/pages/Center'
// 引入个人中心的我的订单组件
import MyOrder from '@/pages/Center/MyOrder'
// 引入个人中心的团购组件
// import GroupBuy from '@/pages/Center/GroupBuy'

// 动态的方式引入----路由懒加载----项目优化的方式
const GroupBuy =()=>import('@/pages/Center/GroupBuy')




// 引入store
import store from '../store'
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
    },
    // 路由的独享守卫
    // 2. 只有没有登录,才能看到登录界面(如果登录了,此时是不能再次跳转到登录界面)
    // beforeEnter:(to,from,next)=>{
    //   // 判断是否已经登录了
    //   if(store.state.user.userInfo.name){
    //     // 如果已经登录了,那么先跳转到首页
    //     next('/')
    //   }else{
    //     // 没有登录,才能看到登录界面
    //     next()
    //   }
    // }
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
    component: AddCartSuccess,
    // 路由独享守卫的方式
    // 3. 只有携带了skuId和skuNum以及sessionStorage中有skuInfo的数据,才可以看到添加购物车成功的界面(前面提到的三个参数,如果没有携带,是不能直接看到添加购物车成功的界面)
    beforeEnter: (to, from, next) => {
      // 获取相关的数据
      // 获取sessionStorage中的skuInfo
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO'))
      // 获取query参数中的skuId和skuNum
      const { skuId, skuNum } = to.query
      // console.log(to)
      if (skuId && skuNum && skuInfo) {
        next() // 放行
      } else {
        // 不能随便的访问其他地址,什么也不做,那就是在当前的位置
        next(from.path)
      }

    }
  },
  // 购物车路由组件
  {
    path: '/shopcart',
    component: ShopCart
  },
  // 交易组件
  {
    path: '/trade',
    component: Trade,
    // 4. 只能从购物车的界面跳转到交易界面(trade)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的trade
      if (from.path === '/shopcart') {
        next() // 放行
      } else {
        // 如果不是从购物车界面跳转到的trade,那么就给我直接去shopcart购物界面
        next('/shopcart')
      }
    }

  },
  // 支付组件
  {
    path: '/pay',
    component: Pay,
    // 将query参数映射成为路由组件的props的方式来获取orderId的值
    props: route => ({ orderId: route.query.orderId }),
    // 5. 只能从交易界面跳转到支付界面(pay)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的pay
      if (from.path === '/trade') {
        next() // 放行
      } else {
        // 如果不是从trade跳转到的pay,那么就给我直接去trade(要想去trade,就要先去shopcart)
        next('/trade')
      }
    }

  },
  // 支付成功组件
  {
    path: '/paysuccess',
    component: PaySuccess,
    // 6. 只能从支付界面跳转到支付成功的界面(paysuccess)
    beforeEnter: (to, from, next) => {
      // 判断是从哪个路径跳转到的paysuccess
      if (from.path === '/pay') {
        next() // 放行
      } else {
        // 如果不是从pay跳转到的paysuccess,那么就给我直接去pay(要想去pay,就要先去trade)
        next('/pay')
      }
    }
  },
  // 个人中心组件
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: 'groupbuy',
        component: GroupBuy
      }, {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  // 重定向
  {
    path: '/',
    redirect: '/'
  }
]
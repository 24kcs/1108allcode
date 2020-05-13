import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入了element-ui 的样式
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// ES6导出与导入的讲解的文件
// import './test/es-module/test2'
// import './test/es-module/test4'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import { hasBtnPermission } from './utils/permission'
// 引入了所有的接口函数(接口文件,在api目录中的index.js)
import * as API from '@/api'
import HintButton from '@/components/HintButton'
// 是在api目录中的components目录中创建的公共组件(三级分类下拉框组件)
// import CategorySelector from '@/components/CategorySelector'
// 引入三级分类组件,并注册成全局公共组件
import CategorySelector from '@/views/product/components/CategorySelector'

// 注册全局组件
Vue.component('HintButton', HintButton)
// 注册全局组件
Vue.component('CategorySelector', CategorySelector)

Vue.prototype.$hasBP = hasBtnPermission
// 每个组件实例对象都可以通过$API访问对应的接口函数
Vue.prototype.$API = API // 将包含所有接口请求函数的对象让所有组件可见

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

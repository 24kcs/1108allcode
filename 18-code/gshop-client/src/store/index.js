// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'
// 引入modules
import modules from './modules'
// // 引入home
// import home from './modules/home'
// // 引入user
// import user from './modules/user'
// 实例化Vuex的仓库对象,并暴露出去
export default new Vuex.Store({
  state, // 总的state
  mutations, // 总的mutations
  actions, // 总的actions
  getters, // 总的getters
  modules
  // modules:{
  //   home,
  //   user
  // }
})

// 当前该文件还在引入state,mutations,actions,getters,何用,作何解释?


// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
// 引入mutations
import mutations from './mutations'
// 引入actions
import actions from './actions'
// 引入getters
import getters from './getters'

// 引入modules模块
import modules from './modules'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
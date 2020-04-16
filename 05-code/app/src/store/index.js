// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state模块
import state from './state'
// 引入mutations模块
import mutations from './mutations'
// 引入actions模块
import actions from './actions'
// 引入getters模块
import getters from './getters'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex的仓库对象并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
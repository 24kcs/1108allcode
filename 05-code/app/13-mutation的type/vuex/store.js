// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入mutation-type
import {INCREMENT,DECREMENT} from './mutation-type.js'
// 声明使用Vuex
Vue.use(Vuex)



/**
 * mutations:里面的每个方法都可以叫mutation
 * actions:里面的每个方法都可以叫action
 * 
 * mutations中的方法可以叫mutation,每个mutation都有自己的方法名,这个方法就是当前的这个mutation的type,一般情况,我们会把mutation的type定义成常量,方便我们使用(定义成type后,不容易出错,mutation和action获取外部使用的时候简单)
 * 
 * 
 */

// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 包含多个直接修改状态数据的方法的对象
const mutations = {
  [INCREMENT] (state) {
    state.count++
  },
  // 减的操作
  [DECREMENT] (state) {
    state.count--
  }
}
// 包含多个间接修改状态数据的方法的对象
const actions = {
  // 加的操作
  increment (context) {
    context.commit(INCREMENT)
  },
  // 减的操作
  decrement ({ commit }) {
    commit(DECREMENT)
  },
  // 奇数加的操作
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit(INCREMENT)
    }
  },
  // 异步加的操作
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit(INCREMENT)
    }, 1000)
  }
}
// 包含多个状态数据的计算属性的get的方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

// 实例化Vuex并暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
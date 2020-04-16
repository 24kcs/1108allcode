/**
 * 
 * Vuex先安装:npm install vuex --save
 * 引入并声明使用
 * Vuex的代码一般放在vuex目录的store.js文件中
 * 或者
 * 放在store目录的index.js文件中
 * state中是存储状态数据的
 * mutations中直接修改状态数据方法的
 * actions中是间接修改状态数据的方法(通过commit找对应的mutation)
 * getter中是状态数据的get的方法
 * 如果想要直接修改状态数据,那么就通过commit找对应的mutation
 * 如果想要间接修改状态数据,那么就通过dispatch找对应的action
 * 
 */

// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 包含了多个状态数据的对象
const state = {
  count: 0
}
// 包含多个直接修改状态数据的方法的对象
const mutations = { // 当前的对象叫mutations对象,里面的每个方法都可以叫mutation,有两个方法,此时就有两个mutation
  // 加的操作
  increment (state) {
    state.count++
  },
  // 减的操作
  decrement (state) {
    state.count--
  }
}
// 包含多个间接修改状态数据的方法的对象
const actions = { // 当前的对象叫actins,里面的每个方法都可以叫action,有四个方法,我们就说有4个action
  // 加的操作
  increment (context) {
    // 提交对应的mutation: 找对应的mutation---->调用mutations中对应的某个方法
    context.commit('increment')
  },
  // 减的操作
  decrement ({ commit }) {
    // 提交对应的mutation
    commit('decrement')
  },
  // 奇数加的操作
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit('increment')
    }
  },
  // 异步加的操作
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
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
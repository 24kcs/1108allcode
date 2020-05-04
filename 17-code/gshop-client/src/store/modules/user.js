// 引入api接口函数
import { reqLogin, reqRegister, reqLogout } from '@/api'
// 引入utils中的产生uuid的函数
import { getUUID } from '@/utils/storageUtils'
const state = {
  // userInfo: {}, // 用户信息数据对象
  userInfo:JSON.parse(localStorage.getItem('user_info_key'))|| {}, // 用户信息数据对象
  userTempId: getUUID() // 临时用户id
}
const mutations = {
  // 修改用户信息
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  RESET_USER_INFO (state) {
    state.userInfo = {}
  }

}
const actions = {
  // 登录操作
  async login ({ commit }, { mobile, password }) {
    const result = await reqLogin(mobile, password)
    if (result.code === 200) {
      // 1. 先把用户的信息存储到localStorage中
      const userInfo =result.data
      localStorage.setItem('user_info_key',JSON.stringify(userInfo))
      // 2. 再把用户信息更新到vuex的state状态数据对象中
      commit('RECEIVE_USER_INFO',userInfo)
    } else {
      throw new Error(result.message || '登录失败')
    }
  },
  // {"mobile":"19112345678","password":"123456","code":"0352"}
  // 注册操作
  async register ({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    // 成功不需要做任何处理的,失败那就需要提示信息
    if (result.code !== 200) {
      throw new Error(result.message || '注册失败')
    }
  },

  // 退出操作
  async logout ({ commit }) {
    const result = await reqLogout()
    // 成功和失败的处理
    if (result.code !== 200) {
      throw new Error(result.message || '退出失败')
    } else {
      // 重置vuex的state中的用户状态信息
      commit('RESET_USER_INFO')
      // 清空缓存
      localStorage.removeItem('user_info_key')
    }
  }

}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
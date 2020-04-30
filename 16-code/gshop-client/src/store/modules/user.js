// 引入api接口函数
import { reqLogin, reqRegister, reqLogout } from '@/api'
// 引入utils中的产生uuid的函数
import { getUUID } from '@/utils/storageUtils'
const state = {
  userInfo: {}, // 用户信息数据对象
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
      commit('RECEIVE_USER_INFO', result.data)
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
      throw new Error(result.message || '注册失败')
    } else {
      commit('RESET_USER_INFO')
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
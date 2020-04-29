
// 引入utils中的产生uuid的函数
import {getUUID} from '@/utils/storageUtils'
const state = {
  userInfo:{}, // 用户信息数据对象
  userTempId: getUUID() // 临时用户id
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
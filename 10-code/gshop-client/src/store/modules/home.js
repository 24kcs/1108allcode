// 引入api接口
import { reqBaseCategoryList } from '@/api'
const state = {
  baseCategoryList: [], // 所有三级分类信息数据数组
}
const mutations = {
  // 直接修改三级分类信息数据
  RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
    state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
  }
}
const actions = {
  // 发送请求获取三级分类信息数据
  async getBaseCategoryList ({ commit }) {
    // 调用接口发送异步请求
    const result = await reqBaseCategoryList()
    if (result.code === 200) {
      // 提交对应的mutations,并修改状态数据
      commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
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
// 引入api接口,获取分类信息数据
import { reqBaseCategoryList } from '@/api'
// 状态数据
const state = {
  // 所有三级分类数据数组
  baseCategoryList: []
}
// 直接修改状态数据
const mutations = {
  // 修改三级分类数据
  RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
    // 干掉最后两个数据,不要了
    state.baseCategoryList = baseCategoryList.splice(0,baseCategoryList.length-2)
  }
}
// 间接修改状态数据
const actions = {
  // 获取三级分类信息数据
  async getBaseCategoryList({commit}){
    const result = await reqBaseCategoryList()
    if(result.code===200){
      commit('RECEIVE_BASE_CATEGORY_LIST',result.data)
    }
  }
}
// 状态数据的计算属性
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
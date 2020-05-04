// 引入接口
import { reqProductList } from '@/api'
// 状态数据
const state = {
  productList: {} // 搜索到的商品数据列表对象
}
const mutations = {
  // 直接修改状态数据
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  async getProductList ({ commit }, searchParams) {
    // 如果不想改变组件中的options
    searchParams = { ...searchParams }
    // 过滤掉searchParams里面空串的参数
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === '') {
        delete searchParams[key]
      }
    })

    // 发送异步请求,获取搜索到的商品数据列表对象
    const result = await reqProductList(searchParams)
    if (result.code === 200) {
      commit('RECEIVE_PRODUCT_LIST', result.data)
    }
  }
}
const getters = {
  // 品牌列表数据
  trademarkList (state) {
    return state.productList.trademarkList
  },
  // 属性列表数据
  attrsList (state) {
    return state.productList.attrsList
  },
  // 商品列表数据
  goodsList (state) {
    return state.productList.goodsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
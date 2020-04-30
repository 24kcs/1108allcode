// 引入接口
import { reqDetailInfo } from '@/api'
const state = {
  // 商品详情信息
  detailInfo: {}
}
const mutations = {
  // 直接修改商品信息状态数据
  RECEIVE_DETAIL_INFO (state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const actions = {
  // 调用接口发送异步请求
  async getDetailInfo ({ commit }, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      commit('RECEIVE_DETAIL_INFO', result.data)
    }
  }
}
const getters = {
  // 返回三级分类名称数据对象
  categoryView (state) {
    const categoryView = state.detailInfo.categoryView
    return categoryView ? categoryView : {}
  },
  // 返回商品sku相关对象信息对象
  skuInfo (state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },
  // 返回商品的轮播图的图片信息数组
  skuImageList (state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  // 返回商品SPU销售属性的列表数组
  spuSaleAttrList (state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList
    return spuSaleAttrList ? spuSaleAttrList : []
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
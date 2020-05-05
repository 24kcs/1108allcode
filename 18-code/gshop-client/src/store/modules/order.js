// 引入api接口函数
import { reqTradeInfo, reqPayInfo } from '@/api'

const state = {
  // 订单交易信息对象
  tradeInfo: {},
  // 支付信息对象
  payInfo: {}
}
const mutations = {
  // 直接修改订单信息对象
  RECEIVE_TRADE_INFO (state, { tradeInfo }) {
    state.tradeInfo = tradeInfo
  },
  // 直接修改支付信息对象
  RECEIVE_PAY_INFO (state, { payInfo }) {
    state.payInfo = payInfo
  },
}
const actions = {
  // 获取订单信息对象数据
  async getTradeInfo ({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      const tradeInfo = result.data
      commit('RECEIVE_TRADE_INFO', { tradeInfo })
    }
  },

  // 获取支付信息对象数据
  async getPayInfo ({ commit }, orderId) {
    const result = await reqPayInfo(orderId)
    if (result.code === 200) {
      const payInfo = result.data
      commit('RECEIVE_PAY_INFO', { payInfo })
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
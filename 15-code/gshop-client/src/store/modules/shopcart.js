// 引入api接口
import { reqAddToCart } from '@/api'

const state = {
  // 所有购物车数据列表
  shopCartList: []
}
const mutations = {}
const actions = {
  // 添加购物车的操作
  async addToCart ({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum)
    return result.code === 200 ? '' : (result.message || '添加购物车失败')
  }


  // 方式1：使用回调函数的方式
  // 添加购物车的操作
  // async addToCart ({commit},{skuId ,skuNum,callback} ){
  //   const result = await reqAddToCart (skuId,skuNum)
  //   // 添加购物车的操作---是有可能会失败的
  //   if(result.code===200){
  //     // 添加成功了
  //     callback('') // 成功了,传入一个空串
  //   }else{
  //     // 添加失败了
  //    callback(result.message||'添加购物车失败了')
  //   }
  // }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
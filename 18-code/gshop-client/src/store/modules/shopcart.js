// 引入api接口
import { reqAddToCart, reqCartList, reqCheckCartItem, reqDeleteCartItem } from '@/api'

const state = {
  // 所有购物车数据列表
  shopCartList: []
}
const mutations = {
  // 直接修改购物车商品数据列表
  RECEIVE_SHOP_CART_LIST (state, shopCartList) {
    state.shopCartList = shopCartList
  }
}
const actions = {
  // 方式1：使用回调函数的方式
  // 添加购物车的操作
  async addToCart1 ({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum)
    // 添加购物车的操作---是有可能会失败的
    if (result.code === 200) {
      // 添加成功了
      callback('') // 成功了,传入一个空串
    } else {
      // 添加失败了
      callback(result.message || '添加购物车失败了')
    }
  },
  // 添加购物车的操作,使用async配合await
  async addToCart2 ({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum)
    return result.code === 200 ? '' : (result.message || '添加购物车失败')
  },

  // 添加购物车的操作,使用async配合await
  async addToCart3 ({ commit,dispatch }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code === 200) {
      // 如果可以这么做
      dispatch('getShopCartList')
    } else {
      alert(result.message || '数量修改失败')
      // return result.message||'数量修改失败'
    }
  },
  // 获取购物车商品数据列表
  async getShopCartList ({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('RECEIVE_SHOP_CART_LIST', result.data)
    }
  },
  // 删除购物车中的某个购物项(指定商品,skuId)
  async deleteCartItem ({ commit }, skuId) {
    const result = await reqDeleteCartItem(skuId)
    // 删除也是有成功或者失败
    return result.code === 200 ? '' : result.message || '删除失败'
  },
  async deleteCartItem2 ({ commit }, skuId) {
    const result = await reqDeleteCartItem(skuId)
    if (result.code !== 200) {
      // 删除失败了,抛出一个error,error包括要显示的提示文本
      throw new Error('删除购物项失败')
      // 或者
      // return Promise.reject(new Error('删除购物项失败'))
      // return new Error('删除失败') // 不行的
    }
  },
  // 切换当前购物项的选中状态的
  async checkCartItem ({ commit }, { skuId, isChecked }) {
    const result = await reqCheckCartItem(skuId, isChecked)
    // 处理失败的情况
    if (result.code !== 200) {
      throw new Error('切换购物项选中状态失败')
    }
  }
}
const getters = {
  // 计算商品的总数量
  totalCount (state) {
    // return state.shopCartList.reduce((pre,item)=>{
    //   // 已经选中了
    //   if(item.isChecked===1){
    //     return pre+item.skuNum
    //   }else{
    //     return pre
    //   }
    // },0)
    return state.shopCartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum : pre
    }, 0)
  },
  // 计算商品的总价格
  totalPrice (state) {
    return state.shopCartList.reduce((pre, item) => {
      return item.isChecked === 1 ? (pre + item.skuPrice * item.skuNum) : pre
    }, 0)
  },
  // 计算商品是否全选
  isAllCheck (state) {
    return state.shopCartList.length > 0 && state.shopCartList.every((item, index) => item.isChecked === 1)
  },
  // 计算购物车中所有选中的购物项,产生一个数组
  selectedCartItems (state) {
    return state.shopCartList.filter((item, index) => item.isChecked === 1)
    // let cartItems=[]
    // state.shopCartList.forEach(item=>{
    //   if(item.isChecked===1){
    //     cartItems.push(item)
    //   }
    // })
    // return cartItems
    // return state.shopCartList.reduce((pre, item) => {
    //   if (item.isChecked === 1) {
    //     pre.push(item)
    //   } else {
    //     return pre
    //   }
    // }, [])

  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
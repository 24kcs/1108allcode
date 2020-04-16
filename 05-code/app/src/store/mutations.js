// 引入mutation-types
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
// 包含了多个直接修改状态数据的方法的对象
export default {
  // 三次更改状态数据的操作
  // 发送请求的时候
  [REQUEST] (state) {
    state.firstView = false
    state.loading = true
  },
  // 请求成功的时候
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },
  // 请求失败的时候
  [REQ_ERROR] (state, error) {
    state.loading = false
    state.errorMsg = error
  }
}
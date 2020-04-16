// 引入axios
import axios from 'axios'
// 引入mutation-types
import { REQUEST, REQ_SUCCESS, REQ_ERROR } from './mutation-types'
// 包含了多个间接修改状态数据的方法的对象
export default {
  // 方法----发送异步请求,改变状态数据
  async search ({ commit }, searchName) { // 这里的参数的顺序,不允许改变
    const url = `https://api.github.com/search/users`
    // 第一次更改状态数据
    commit(REQUEST)
    try {
      // 发送异步请求
      // console.log('===' + searchName)
      const response = await axios.get(url, {
        params: {
          q: searchName
        }
      })
      const users = response.data.items.map(user => ({
        login: user.login,
        html_url: user.html_url,
        avatar_url: user.avatar_url
      }))
      // 第二次更新状态数据
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 第三次更改状态数据
      commit(REQ_ERROR, error)
    }
  }
}
/**
 *
 * 同步的东西放在mutations中
 * 异步的操作放在actions中
 *
 */
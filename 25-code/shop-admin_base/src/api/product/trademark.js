// 包含所有品牌管理的接口请求函数
// 引入ajax(request)---封装了请求拦截器和响应拦截器,基础路径
import request from '@/utils/request'
// 访问接口中相同的路径单独的拿出来定义成一个变量,简化接口路径的编写
const api_name = '/admin/product/baseTrademark'
// 默认暴露出去的对象
export default {
  // 获取品牌分页列表,根据默认的页码及当前每页多少条获取品牌信息的接口
  getTrademarkList (page, limit) {
    if (page && limit) {
      return request({
        url: `${api_name}/${page}/${limit}`,
        method: `get`
      })
    } else {
      return request.get(`${api_name}/getTrademarkList`)
    }

    // return request.get(`${api_name}/${page}/${limit}`)
  },
  // 添加品牌
  addTrademark (trademark) {
    return request({
      url: `${api_name}/save`,
      method: `POST`,
      data: trademark
    })
    // return request.post(`${api_name}/save`,trademark)
  },
  // 更新品牌
  updateTrademark (trademark) {
    return request({
      url: `${api_name}/update`,
      method: `PUT`,
      data: trademark
    })
    // return request.put(`${api_name}/update`, trademark)
  },
  // 删除品牌
  deleteTrademark (id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: `DELETE`
    })
    // return request.delete(`${api_name}/remove/${id}`)
  }
}

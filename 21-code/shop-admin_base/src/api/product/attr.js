// 包含所有品牌管理的接口请求函数
// 引入ajax(request)---封装了请求拦截器和响应拦截器,基础路径
import request from '@/utils/request'
// 访问接口中相同的路径单独的拿出来定义成一个变量,简化接口路径的编写
const api_name = '/admin/product'
// 默认暴露出去的对象
export default {
  //     /attrInfoList/{category1Id}/{category2Id}/{category3Id}
  // 获取平台属性列表
  getAttrList(category1Id, category2Id, category3Id) {
    return request.get(`${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },
  // 添加属性或者更新属性
  // /saveAttrInfo
  saveUpdate(attr) {
    return request.post(`${api_name}/saveAttrInfo`, attr)
  },
  // 删除属性
  deleteAttr(attrId) {
    return request.delete(`${api_name}/deleteAttr/${attrId}`)
  }
}

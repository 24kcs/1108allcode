/**
 * 包含所有接口请求函数
 * 
 * 
 */
// 引入ajax
import ajax from './ajax'
// 获取三级分类列表
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')
// 登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', { mobile, password })
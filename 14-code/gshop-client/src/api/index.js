// 引入二次封装的axios文件
import ajax from './ajax'
// 引入二次封装axios文件----给mock使用
import mockAjax from './mockAjax'
// 获取三级分类数据信息列表
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')
// 登录的接口
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', { mobile, password })


// mock的相关的接口
export const reqBanners = () => mockAjax.get('/banners')
export const reqFloors = () => mockAjax.get('/floors')

// reqBanners().then((result) => {
//   console.log(result)
// })

// reqFloors().then(result2=>{
//   console.log(result2)
// })

// 获取搜索数据的接口
export const reqProductList= (searchParams)=>ajax.post('/list',searchParams)
// reqProductList({})

// 获取商品详情的接口
export const reqDetailInfo = (skuId)=>ajax.get(`/item/${skuId}`)

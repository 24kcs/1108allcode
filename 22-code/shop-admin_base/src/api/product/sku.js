// 包含所有sku的接口请求函数
// 引入ajax(request)---封装了请求拦截器和响应拦截器,基础路径
import request from '@/utils/request'
// 默认暴露出去的对象
export default {
  // 下架SKU
  cancelSale(skuId) {
    return request.get(`/admin/product/cancelSale/${skuId}`)
  },
  // 上架SKU
  onSale(skuId) {
    return request.get(`/admin/product/onSale/${skuId}`)
  },
  // 删除指定id的SKU
  removeSkuById(skuId) {
    return request.delete(`/admin/product/deleteSku/${skuId}`)
  },
  // 根据SPU的id查找对应的sku的列表数据
  getSkuListBySpuId(spuId) {
    return request.get(`/admin/product/findBySpuId/${spuId}`)
  },
  // 根据SKU的id查找指定的SKU的详细信息数据
  getSkuBySkuId(skuId) {
    return request.get(`/admin/product/getSkuById/${skuId}`)
  },
  // 获取SKU分页列表数据
  getSkuList(page, limit) {
    return request.get(`/admin/product/list/${page}/${limit}`)
  },
  // 保存SKU和修改SKU的接口
  addUpdateSku(skuInfo) {
    return request.post(`/admin/product/${skuInfo.id ? 'update' : 'save'}SkuInfo`, skuInfo)
  },
  // 根据spuId获取对应的图片列表数据
  getSpuImageList(spuId) {
    return request.get(`/admin/product/spuImageList/${spuId}`)
  },
  // 根据spu的id获取对应的销售属性列表
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`)
  }
}

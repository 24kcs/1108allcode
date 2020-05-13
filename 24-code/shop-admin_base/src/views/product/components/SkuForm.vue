<template>
  <el-form label-width="120px">
    <!--SPU 名称的标题显示-->
    <el-form-item label="SPU 名称">
      <span>{{spu.spuName}}</span>
    </el-form-item>
    <!--SKU 名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="请输入SKU名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <!--价格-->
    <el-form-item label="价格">
      <el-input type="text" placeholder="请输入SKU价格" v-model="skuInfo.price"></el-input>
    </el-form-item>
    <!--重量-->
    <el-form-item label="重量(千克)">
      <el-input type="text" placeholder="请输入SKU重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <!--规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="请输入SKU重量" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>
    <!--平台属性-->
    <el-form-item label="平台属性">
      <!--再次的嵌套一个form-->
      <el-form inline label-width="80px">
        <el-form-item
          :label="attr.attrName"
          style="margin-bottom:10px"
          v-for="attr in attrList"
          :key="attr.id"
        >
          <el-select v-model="attr.attrId_valueId">
            <el-option
              :label="value.valueName"
              :value="attr.id+'_'+value.id"
              v-for="value in attr.attrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-form inline label-width="80px">
        <el-form-item
          :label="attr.saleAttrName"
          style="margin-bottom:10px"
          v-for="attr in saleAttrList"
          :key="attr.id"
        >
          <el-select v-model="attr.saleAttrValueId">
            <el-option
              :label="value.saleAttrValueName"
              :value="value.id"
              v-for="value in attr.spuSaleAttrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--图片的列表表格-->
    <el-form-item label="图片列表">
      <el-table border :data="imageList">
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" alt style="width:150px;height:150px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-tag type="success" v-if="row.isDefault==='1'">默认</el-tag>
            <el-button type="primary" v-else @click="setDefault(row)">设置为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--保存和返回按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spu: {}, // 默认空对象
      attrList: [], // 平台属性数组数据
      imageList: [], // 图片列表数组数据
      saleAttrList: [], // 销售属性数组数据
      skuInfo: {
        // 当前SkuForm界面初始化的时候部分数据可以直接进行收集操作(当前界面显示的时候)
        category3Id: '', // 三级分类id
        spuId: '', // spuId
        tmId: '', // 关联的品牌id
        // 表单输入了数据才可以收集
        skuName: '', // Sku的名称
        skuDesc: '', // Sku的描述
        price: '', // Sku的价格
        weight: '', // Sku的重量
        // 提交保存的发送请求的时候需要整理的收集的
        skuAttrValueList: [], // 平台属性数组数据
        skuSaleAttrValueList: [], // 销售属性数组数据
        skuImageList: [], // 图片数组数据
        skuDefaultImg: '' // 默认选中的图片
      }
    }
  },
  methods: {
    // 初始化数据的方法(需要发送请求,是在Spu组件内部显示该界面的时候调用的)
    initAddData(spuInfo) {
      // 保存当前spuInfo对象
      this.spu = spuInfo
      // ------------------------从spuInfo对象中获取三级分类id,SpuId和品牌关联的id
      this.skuInfo.category3Id = spuInfo.category3Id
      this.skuInfo.spuId = spuInfo.id
      this.skuInfo.tmId = spuInfo.tmId
      // 异步发送请求,获取当前这个界面要显示的必须的数据
      this.getSpuInfoInitData()
    },
    // 当前界面中要展示数据的方法(内部发送三个请求)
    async getSpuInfoInitData() {
      // 第一个请求获取平台属性数据---需要一级分类id,二级分类id,三级分类id
      // 第二个请求获取当前spu的图片数组数据---需要spuId
      // 第三个请求获取当前spu的销售属性数组数据---需要spuId
      const { category1Id, category2Id, category3Id, id } = this.spu
      // 获取平台数据数据
      const promise1 = this.$API.attr.getAttrList(
        category1Id,
        category2Id,
        category3Id
      )
      // 获取销售属性数据
      const promise2 = this.$API.sku.getSpuSaleAttrList(id)
      // 获取图片列表数据
      const promise3 = this.$API.sku.getSpuImageList(id)
      const results = await Promise.all([promise1, promise2, promise3])
      this.attrList = results[0].data
      this.saleAttrList = results[1].data
      // this.imageList = results[2].data---可以修改一下(下面的方式)
      // -----图片添加一个isDefault的属性的操作
      const imageList = results[2].data
      imageList.forEach(item => (item.isDefault = '0'))
      this.imageList = imageList
    },
    // 点击按钮,设置当前的图片为默认
    setDefault(spuImage) {
      // 不行的,当前的isDefault 不是一个真正的响应式属性属性
      // spuImage.isDefault = '1'
      // 这个是可以的,但是还可以尝试一下其他的做法(其他的方式)
      // this.$set(spuImage, 'isDefault', '1')
      // -----第二步  干掉所有默认的图片
      this.imageList.forEach(item => (item.isDefault = '0'))
      // ----第一步 设置当前的图片为默认
      spuImage.isDefault = '1'
      // -----第三步 向skuInfo对象中保存一张默认的图片
      this.skuInfo.skuDefaultImg = spuImage.imgUrl
    }
  }
}
</script>
<style scoped>
</style>

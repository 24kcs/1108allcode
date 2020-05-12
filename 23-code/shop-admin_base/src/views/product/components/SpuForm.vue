<template>
  <el-form v-show="visible" label-width="100px">
    <!--SPU的名称-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <!--SPU的品牌-->
    <el-form-item label="品牌">
      <el-select value>
        <el-option label="A" value="1"></el-option>
        <el-option label="B" value="2"></el-option>
      </el-select>
    </el-form-item>
    <!--SPU描述-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="4" placeholder="请输入SPU描述信息"></el-input>
    </el-form-item>
    <!--SPU图片-->
    <el-form-item label="SPU图片">
      <el-upload
        multiple
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <!--下拉框-->
      <el-select value>
        <el-option label="A" value="1"></el-option>
        <el-option label="B" value="2"></el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <!--表格-->
      <el-table border inline style="margin-top:20px">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="属性名"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <!--保存和返回按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  props: ['visible'],
  data() {
    return {
      // 上传图片的组件需要的两个表达式数据
      dialogImageUrl: '',
      dialogVisible: false,
      spuId: null, // spuId,用来在一些位置使用这个id做相关的操作
      spuInfo: {}, // spuInfo对象---Spu的详细信息数据
      spuImageList: [], // spu对应的图片列表数据
      trademarkList: [], // 品牌列表数据
      saleAttrList: [] // 销售属性列表数据
    }
  },
  methods: {
    // 点击返回按钮,隐藏当前的这个组件
    back() {
      // 此时当前的visible表达式为false,此时当前的SpuForm组件界面隐藏()
      // 此时无法真正的修改父级组件中的isShowSpuForm表达式的值,打开浏览器还会报错
      // 子级组件中如何更新父级组件中的数据
      // this.visible = false
      this.$emit('update:visible', false)
      // 原理:父级组件中<SpuForm :visible.sync="isShowSpuForm" @update:visible="isShowSpuForm=$event" />
    },
    // 上传照片的时候需要的两个回调
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化发送请求获取数据的方法
    initUpdateData(spuId) {
      // 更新spuId属性数据
      this.spuId = spuId
      // 获取spuInfo信息对象
      this.getSpuInfo()
      // 获取spu对应的图片列表数据数组
      this.getSpuImageList()
      // 获取品牌列表数据数组
      this.getTrademarkList()
      // 获取销售属性列表数据数组
      this.getSaleAttrList()
    },
    // 获取spuInfo信息对象
    async getSpuInfo() {
      const result = await this.$API.spu.getSpuById(this.spuId)
      if (result.code === 200) {
        this.spuInfo = result.data
      }
    },
    // 获取spu对应的图片列表数据数组
    async getSpuImageList() {
      const result = await this.$API.sku.getSpuImageList(this.spuId)
      if (result.code === 200) {
        this.spuImageList = result.data
      }
    },
    // 获取品牌列表数据数组
    async getTrademarkList() {
      const result = await this.$API.trademark.getTrademarkList()
      if (result.code === 200) {
        this.trademarkList = result.data
      }
    },
    // 获取销售属性列表数据数组
    async getSaleAttrList() {
      const result = await this.$API.spu.getSpuSaleAttrList()
      if (result.code === 200) {
        this.saleAttrList = result.data
      }
    }
  }
}
</script>
<style scoped>
</style>

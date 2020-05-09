<template>
  <el-form inline :model="form">
    <!--一级分类列表下拉框-->
    <el-form-item label="一级分类">
      <el-select v-model="form.category1Id" placeholder="请选择" @change="changeCategory1ListHandle">
        <el-option v-for="c in category1List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
    <!--二级分类列表下拉框-->
    <el-form-item label="二级分类">
      <el-select v-model="form.category2Id" placeholder="请选择" @change="changeCategory2ListHandle">
        <el-option v-for="c in category2List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
    <!--三级分类列表下拉框-->
    <el-form-item label="三级分类">
      <el-select v-model="form.category3Id" placeholder="请选择">
        <el-option v-for="c in category3List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      // 由于界面中有三个分类的下拉框,每个下拉框中显示数据及数据变化,都需要绑定对应的分类id值,为了方便操作(分类下拉框都在form表单中)
      form: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '' // 三级分类的id
      },
      category1List: [], // 一级分类列表数据
      category2List: [], // 二级分类列表数据
      category3List: [] // 三级分类列表数据
    }
  },
  // 页面加载后的生命周期回调函数
  mounted() {
    // 调用方法,发送请求,获取数据,获取的是一级分类列表数据
    this.getCategory1List()
  },
  // 存放放的对象
  methods: {
    // 发送请求获取数据
    async getCategory1List() {
      const result = await this.$API.category.getCategorys1()
      // 判断
      if (result.code === 200) {
        // 保存当前获取到一级分类的列表数据,(上面的html模版中才可以使用该数据)
        this.category1List = result.data
      }
    },
    // 当一级分类列表选中数据发生变化的时候触发change事件对应的这个回调函数
    async changeCategory1ListHandle(category1Id) {
      // 重置二级和三级列表,最好的方式,干掉二级和三级分类选中的id及数组
      this.form.category2Id = null // 干掉无用的id
      this.form.category3Id = null // 干掉无用的id
      this.category2List = [] // 重置二级分类列表数据的数组
      this.category3List = [] // 重置三级分类列表数据的数组
      // 调用接口,发送请求,根据一级分类的id,获取对应的二级分类列表数据
      const result = await this.$API.category.getCategorys2(category1Id)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    // 当二级分类列表选中数据发生变化的时候触发change事件对应的这个回调函数
    async changeCategory2ListHandle(category2Id) {
      // 重置三级列表,最好的方式,干掉三级分类选中的id及数组
      this.form.category3Id = null // 干掉无用的id
      this.category3List = [] // 重置三级分类列表数据的数组
      // 调用接口,发送请求,根据一级分类的id,获取对应的二级分类列表数据
      // 调用接口,发送请求,根据一级分类的id,获取对应的二级分类列表数据
      const result = await this.$API.category.getCategorys3(category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    }
  }
}
</script>
<style scoped>
</style>

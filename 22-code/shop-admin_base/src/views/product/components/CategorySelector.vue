<template>
  <el-form inline :model="form">
    <!--一级分类列表下拉框-->
    <el-form-item label="一级分类">
      <el-select
        v-model="form.category1Id"
        placeholder="请选择"
        @change="changeCategory1ListHandle"
        :disabled="isDisabled"
      >
        <el-option v-for="c in category1List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
    <!--二级分类列表下拉框-->
    <el-form-item label="二级分类">
      <el-select
        v-model="form.category2Id"
        placeholder="请选择"
        @change="changeCategory2ListHandle"
        :disabled="isDisabled"
      >
        <el-option v-for="c in category2List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>
    <!--三级分类列表下拉框-->
    <el-form-item label="三级分类">
      <el-select
        v-model="form.category3Id"
        placeholder="请选择"
        @change="changeCategory3ListHandle"
        :disabled="isDisabled"
      >
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
      category3List: [], // 三级分类列表数据
      // 用来控制三个下拉框是否是被禁用的
      isDisabled: false
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
      // 分发父级组件传递过来的自定义事件,同时传入当前这个一级分类的id值及标识
      this.$emit('categoryChange', { categoryId: category1Id, level: 1 })
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
      // 分发父级组件传递过来的自定义事件,同时传入当前这个二级分类的id值及标识
      this.$emit('categoryChange', { categoryId: category2Id, level: 2 })
      // 调用接口,发送请求,根据一级分类的id,获取对应的二级分类列表数据
      const result = await this.$API.category.getCategorys3(category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    changeCategory3ListHandle(category3Id) {
      // 分发父级组件传递过来的自定义事件,同时传入当前这个三级分类的id值及标识
      this.$emit('categoryChange', { categoryId: category3Id, level: 3 })
    }

    // 当前这个子级组件CategorySelector组件无论是一级分类还是二级分类或者是三级分类,每一次选中内容发生变化,都要分发父级组件传递过来的自定义事件,同时传入当前自己这个分类的id值,传入一个标识(分类的标识,一级分类:1,二级分类:2,三级分类:3),父级组件内部对应的这个自定义事件的回调函数会自动的执行(该函数需要一级分类id,二级分类id,三级分类id,分类的标识),执行所做的事情,无非就是根据对应的参数数据,发送请求,获取当前分类信息对应的平台数据列表数据
    // 简述:子级组件分类信息变化,立刻通过自定义事件方式通知父级组件,发送请求获取数据
  }
}
</script>
<style scoped>
</style>

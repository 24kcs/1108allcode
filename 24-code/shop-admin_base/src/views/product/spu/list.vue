<template>
  <div>
    <!--三个级别分类组件-->
    <el-card>
      <CategorySelector ref="cs" @categoryChange="categoryChange" />
    </el-card>
    <el-card>
      <div v-show="!isShowSpuForm">
        <!--添加SPU属性的按钮-->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom:20px"
          @click="showAddSpu"
          :disabled="!category3Id"
        >添加SPU</el-button>
        <!--表格-->
        <el-table :data="spuList" inline border>
          <!--列-->
          <el-table-column width="80" type="index" label="序号"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <HintButton title="添加SKU" type="primary" icon="el-icon-plus" size="mini"></HintButton>
              <HintButton
                title="修改SPU"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdateSpu(row)"
              ></HintButton>
              <HintButton title="查看SKU" type="info" icon="el-icon-info" size="mini"></HintButton>
              <el-popconfirm :title="`确定要删除${row.spuName}属性吗`">
                <HintButton
                  title="删除SPU"
                  type="danger"
                  slot="reference"
                  icon="el-icon-delete"
                  size="mini"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes, total"
          :total="total"
          style="text-align:center;margin-top:20px;"
          background
        ></el-pagination>
      </div>
      <SpuForm
        :visible.sync="isShowSpuForm"
        ref="spuForm"
        @saveSuccess="saveSuccess"
        @cancel="cancel"
      />
    </el-card>
  </div>
</template>

<script>
// 引入SpuFrom组件
import SpuForm from '../components/SpuForm'
export default {
  name: 'SpuList',
  components: {
    SpuForm
  },
  data() {
    return {
      spuList: [], // spu列表数据(数组)
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      page: 1, // 默认第一页
      limit: 3, // 默认每页3条
      total: 0, // 默认总的数量
      isShowSpuForm: false, // 默认不显示修改SpuForm组件
      spuId: '' // 用来标识是添加还是修改
    }
  },
  watch: {
    isShowSpuForm(val) {
      this.$refs.cs.isDisabled = val
    }
  },
  methods: {
    // 三个级别分类选项改变的时候分发的事件(传入了分类id及分类的级别标识)
    categoryChange({ categoryId, level }) {
      // 判断级别
      if (level === 1) {
        // 保存当前的一级分类的id值
        this.category1Id = categoryId
        // 清空二级和三级的id
        this.category2Id = null
        this.category3Id = null
        // 清空spuList的数据
        this.spuList = []
      } else if (level === 2) {
        // 保存当前的二级分类的id值
        this.category2Id = categoryId
        // 清空三级的id
        this.category3Id = null
        // 清空spuList的数据
        this.spuList = []
      } else {
        // 保存三级分类的id
        this.category3Id = categoryId
        // 三级的,调用接口,发送请求,更新数据
        this.getSpuList()
      }
    },
    // 获取三级分类对应的spu列表数据
    async getSpuList(page = 1) {
      // 更新当前的页码数
      this.page = page
      // 获取每页的条数,获取三级分类的id
      const { limit, category3Id } = this
      // 发送请求
      const result = await this.$API.spu.getSpuList(page, limit, category3Id)
      // 判断
      if (result.code === 200) {
        const { total, records } = result.data
        // 更新状态数据
        this.total = total
        this.spuList = records
      }
    },
    // 分页组件的相关的回调
    handleSizeChange(val) {
      // 修改当前每页的条数
      this.limit = val
      // 重新获取数据
      this.getSpuList(1)
    },
    // 点击修改spu按钮,展示SpuForm组件同时传入spu对象
    showUpdateSpu(row) {
      // 保存spuId----目的是区分是修改还是添加spu操作,这是个标识
      this.spuId = row.id
      this.isShowSpuForm = true // 显示当前SpuForm组件界面
      // 调用SpuForm组件内部的相关方法,进行发送请求的初始化的操作,需要传入spuId
      this.$refs.spuForm.initUpdateData(row.id)
    },
    // 自定义事件,子级组件来进行分发操作---保存数据成功的通知的分发事件回调函数
    saveSuccess() {
      if (this.spuId) {
        // 修改SPU操作
        this.getSpuList(this.page)
        this.spuId = '' // 清理掉
      } else {
        // 添加SPU操作
        this.getSpuList()
      }
    },
    // 自定义事件, 子级组件来进行分发操作---取消保存,回退的通知的分发事件的回调函数
    cancel() {},
    // 点击按钮添加Spu操作
    showAddSpu() {
      // 显示SpuForm界面
      this.isShowSpuForm = true
      // 初始化SpuForm组件内部的数据(品牌信息,销售信息),并传入三级分类的id值
      this.$refs.spuForm.initAddData(this.category3Id)
    }
  }
}
</script>

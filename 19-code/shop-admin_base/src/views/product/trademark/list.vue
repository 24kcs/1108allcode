<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="showAdd">添加</el-button>
    <el-table :data="trademarks" stripe border v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="logo" width="100px" height="60px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!--scope里面包含$index和row的属性的对象
        $index:当前的下标,row:当前这一行的数据对象(trademark)
        -->
        <template slot-scope="scope">
          <el-button size="small" type="warning" icon="el-icon-edit">修改</el-button>
          <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      current-page   默认第几页被选中
      page-sizes  可以设置每页显示的条数
      page-size 默认每页3条
      total  总的条数
      layout 代表的是页面中分页布局的显示顺序
       总条数,每页多少条 前一页,下一页, 前往第几页
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarks"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="total"
      style="text-align:center;margin-top:20px;"
      background
    ></el-pagination>

    <el-dialog title="添加" :visible="isShowDialog" :before-close="()=>isShowDialog=false">
      <el-form :model="form" style="width:80%">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="formLabelWidth">
          <!-- <img :src="form.logoUrl" alt="logo" /> -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="isShowDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      trademarks: [], // 当前页的品牌列表数据
      total: 0, // 总数据的条数----分页的时候会用到的
      page: 1, // 当前的页码,默认是第一页
      limit: 3, // 每页显示数据的条数
      loading: false, // 页面的加载效果
      isShowDialog: false, // 不显示对话框
      form: {
        tmName: '', // 品牌的名字
        logoUrl: '' // 品牌的图片路径
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getTrademarks()
  },
  methods: {
    // 获取当前页的品牌列表数据信息
    async getTrademarks(page = 1) {
      // 设置页码
      this.page = page
      // 修改loading的值
      this.loading = true
      // 发送异步请求获取品牌信息数据列表
      const result = await this.$API.trademark.getTrademarkList(
        page,
        this.limit
      )
      // 再次修改loading的值
      this.loading = false
      if (result.code === 200) {
        // 成功
        console.log(result)
        const { records, total } = result.data
        // 更新状态数据
        this.trademarks = records
        this.total = total
      } else {
        // 失败,获取品牌列表失败
        this.$message({
          type: 'error',
          message: result.message || '获取品牌列表失败'
        })
      }
      console.log(result)
    },
    handleSizeChange(pageSize) {
      // 重新设置每页多少条数据
      this.limit = pageSize
      this.getTrademarks()
    },
    // 添加数据的回调函数
    showAdd() {
      // 显示对话框
      this.isShowDialog = true
    }
    // handleCurrentChange(page) {
    //   // 重新获取指定页的数据
    //   this.getTrademarks(page)
    // }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

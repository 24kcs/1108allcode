<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="showAdd">添加</el-button>
    <el-table :data="trademarks" stripe border v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="logo" width="100px" height="60px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!--scope里面包含$index和row的属性的对象
        $index:当前的下标,row:当前这一行的数据对象(trademark)
        -->
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            @click="showUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="showDelete(scope.row)"
          >删除</el-button>
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

    <!--点击添加按钮,显示的对话框组件-->
    <!-- <el-dialog
      :title="form.id?'更新':'添加'"
      :visible="isShowDialog"
      :before-close="()=>isShowDialog=false"
    >-->
    <el-dialog :title="form.id?'更新':'添加'" :visible.sync="isShowDialog">
      <!--品牌名字和品牌Logo-->
      <el-form :model="form" style="width:80%" :rules="rules" ref="trademarkForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="formLabelWidth" prop="logoUrl">
          <!-- <img :src="form.logoUrl" alt="logo" /> -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <!-- <el-button type="primary" @click="isShowDialog = false">确 定</el-button> -->
        <el-button type="primary" @click="addOrUpdateTrademark">确 定</el-button>
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
      formLabelWidth: '120px',
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌Logo', trigger: 'change' }
        ]
      }
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
      this.form = {
        tmName: '',
        logoUrl: ''
      }
      // 显示对话框
      this.isShowDialog = true
      // 此时就要清除所有的表单验证
      // 此时界面还没有更新,Dialog组件对象还没有产生,Form组件对象也没有,所以,报错了,所以,使用nextTick()方法解决
      this.$nextTick(() => {
        this.$refs.trademarkForm.clearValidate()
      })
    },
    // 图片上传成功调用的回调函数
    // res----->response,本质对应的就是result,也就是响应体的数据
    handleLogoSuccess(res, file) {
      // 更新当前form对象中的logoUrl,目的是显示这个图片
      this.form.logoUrl = res.data
      // 图片已经上传成功,那么就要清除表单的验证
      this.$refs.trademarkForm.clearValidate('logoUrl') // 移除所有的表单验证
    },
    // 上传图片之前的回调函数,如果返回值是false,那么是不会进行提交的
    // 用来限制上传图片的文件类型及文件大小的
    beforeLogoUpload(file) {
      // 限制图片类型
      // const isJPG = file.type === 'image/jpeg'
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      // 限制图片的大小的
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 如果都满足条件则返回true
      return isJPG && isLt2M
    },
    // 点击确定按钮,添加品牌信息
    addOrUpdateTrademark() {
      // 1. 表单校验功能---vee-validate插件---element-ui组件库,内部也有表单校验
      this.$refs['trademarkForm'].validate(async valid => {
        if (valid) {
          // 表单已经验证成功
          // 2. 调用接口发送请求
          // 这个时候到底是添加还是更新,就看this.form对象中是否有id
          const { form } = this
          let result
          if (form.id) {
            // 更新
            result = await this.$API.trademark.updateTrademark(this.form)
          } else {
            // 添加
            result = await this.$API.trademark.addTrademark(this.form)
          }
          // 判断是否成功
          if (result.code === 200) {
            // 提示消息
            this.$message({
              type: 'success',
              message: `${form.id ? '更新' : '添加'}品牌成功`
            })
            // 重新获取数据
            this.getTrademarks()
            // 隐藏对话框
            this.isShowDialog = false
          } else {
            this.$message({
              type: 'error',
              message: `${form.id ? '更新' : '添加'}品牌失败`
            })
          }
        }
      })
    },
    // 点击修改按钮,显示对话框,用来实现修改品牌信息的操作
    showUpdate(trademark) {
      // 更新form对象中的数据
      // 这么做会导致列表数据发生变化,列表会自动的更新
      // this.form = trademark
      // 不再是同一个对象,改变form中的tmName,列表中的数据不会发生改变
      this.form = { ...trademark }
      // 显对话框
      this.isShowDialog = true
    },
    // 点击删除按钮,显示提示对话框,用来实现删除品牌信息的操作
    showDelete(trademark) {
      this.$confirm(`确定删除${trademark.tmName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 调用接口,发送删除数据的请求
          const result = await this.$API.trademark.deleteTrademark(trademark.id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新获取数据,此时默认显示的是第一页的数据
            // this.getTrademarks(1)
            // 如果就想看当前页,或者上一页----如果某一页是最后一个数据,此时也有问题
            // this.getTrademarks(this.page)
            this.getTrademarks(
              this.trademarks.length === 1 ? this.page - 1 : this.page
            )
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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

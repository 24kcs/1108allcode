<template>
  <el-form v-show="visible" label-width="100px">
    <!--SPU的名称-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
    </el-form-item>
    <!--SPU的品牌-->
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
      </el-select>
    </el-form-item>
    <!--SPU描述-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="4" placeholder="请输入SPU描述信息" v-model="spuInfo.description"></el-input>
    </el-form-item>
    <!--SPU图片-->
    <el-form-item label="SPU图片">
      <el-upload
        :file-list="spuImageList"
        multiple
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
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
      <!--销售属性的下拉框-->
      <el-select
        value
        :placeholder="unSelectedSaleAttrList.length>0?`还有${unSelectedSaleAttrList.length}个可选`:'没有数据可选'"
      >
        <!--下拉框中显示的应该是没有被选择过的销售属性-->
        <el-option
          :label="attr.name"
          :value="attr.id"
          v-for="(attr,index) in unSelectedSaleAttrList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <!--表格-->
      <el-table border inline style="margin-top:20px" :data="spuInfo.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <!--销售属性值这一列中的el-tag标签中显示数据的结构-->
        <el-table-column label="属性值名称">
          <template slot-scope="{row,$index}">
            <el-tag
              :key="value.id"
              v-for="value in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(value)"
            >{{value.saleAttrValueName}}</el-tag>
            <!--row代表的是某个销售属性对象,value:代表的是当前这个销售属性值的对象-->
            <el-input
              placeholder="属性值名臣"
              style="width:80px"
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
          </template>
        </el-table-column>
        <!--删除按钮-->
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-popconfirm :title="`确定删除吗`" @onConfirm="deleteValue($index)">
              <HintButton
                title="删除"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></HintButton>
            </el-popconfirm>
          </template>
        </el-table-column>
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
      dialogImageUrl: '', // 预览图片的url
      dialogVisible: false, // 是否显示预览图片
      spuId: null, // spuId,用来在一些位置使用这个id做相关的操作
      spuInfo: {
        spuSaleAttrList: [] // 默认空数组的值--------------后加的
      }, // spuInfo对象---Spu的详细信息数据
      spuImageList: [], // spu对应的图片列表数据
      trademarkList: [], // 品牌列表数据
      saleAttrList: [], // 销售属性列表数据
      // 销售属性标签el-tag中文本框中用到的两个表达式
      inputVisible: false,
      inputValue: ''
    }
  },
  // 计算属性
  computed: {
    // 存放的是没有被选择过的销售属性数据(选择颜色,选择版本,选择套装--选择过了)
    // spuInfo对象中的属性: spuSaleAttrList数组和saleAttrList数组的关系很紧密
    // spuInfo对象中的属性spuSaleAttrList决定着当前还有几个销售属性saleAttrList可以选择
    unSelectedSaleAttrList() {
      // 获取spuInfo对象中spuSaleAttrList,还有this中的saleAttrList
      // 对saleAttrList进行过滤操作,过滤掉的spuSaleAttrList中已经存在的属性,剩下的就是spuSaleAttrList中没有的属性,然后返回
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList }
      } = this
      // console.log(saleAttrList, spuSaleAttrList)
      // sa是saleAttrList数组中的每个对象数据
      // ssa是spuSaleAttrList数组中的每一个对象
      // 过滤掉的是spuSaleAttrList数组中的数据在saleAttrList存在的,要的是不存在的
      return saleAttrList.filter(
        sa => !spuSaleAttrList.some(ssa => ssa.saleAttrName === sa.name)
      )
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
    // 上传图片成功的回调函数
    handleSuccess(response, file, fileList) {
      // 上传图片成功后,更新图片数组数据
      this.spuImageList = fileList
    },
    // 上传照片进行删除的回调函数
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    // 是否显示图片预览
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
        // 修改一下代码
        // console.log(result.data)
        // 接口获取到的数据
        const spuImageList = result.data
        // spuImageList数组中是有对象的,每个对象中都有imgName属性和imgUrl属性
        // upload组件标签中要想显示图片,图片数据是数组,同时数组中的数据是对象,
        // 每个对象中有name属性和url属性,只有这样,才可以在页面中展示图片
        spuImageList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        // console.log(spuImageList)
        // 重新更新数据操作
        this.spuImageList = spuImageList
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
    },
    // 销售属性值表格中el-tag标签中用到的三个回调

    // 点击按钮为当前的销售属性对象添加一个销售属性值
    // 例子: 销售属性--->选择版本
    // 销售属性值---->小灵通版
    showInput(attr) {
      // 点击按钮,就是要添加销售属性值,文本框就该显示出来(v-if="row.edit")
      // attr.edit= true // 这么做是不行,当前的这个edit属性不是影响是的属性,(只有这个属性为响应式属性才有意义)
      // 如果有edit这个属性,则设置为true
      if (attr.hasOwnProperty('edit')) {
        attr.edit = true
      } else {
        this.$set(attr, 'edit', 'true')
      }
      // 让当前的文本框自动的获取焦点
      // this.$refs.saveTagInput.focus() // 这么做是不行的,此时input还没有显示(数据更新,页面是异步更新)
      // 需要在界面更新后,文本框使用自动获取焦点的操作,才有效果(input显示后,才能够执行focus())
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 回车或者失去焦点实现添加属性值的操作
    handleInputConfirm(attr) {
      // 如果输入了数据,则在属性值列表中添加一个属性
      // 获取文本框中输入的属性值数据
      const saleAttrValueName = attr.saleAttrValueName
      // 如果输入了数据,添加一个新的属性值
      if (saleAttrValueName) {
        // 判断该数据是否已经存在了,如果已经存在了,则不添加
        const isRepeat = attr.spuSaleAttrValueList.some(
          value => value.saleAttrValueName === saleAttrValueName
        )
        if (!isRepeat) {
          // 添加数据
          attr.spuSaleAttrValueList.push({
            saleAttrValueName, // 销售属性值的名字
            baseSaleAttrId: attr.baseSaleAttrId // 销售属性id
          })
        } else {
          this.$message.warning('不能添加重复的数据')
          return
        }
      }
      // 隐藏当前的输入框
      attr.edit = false
      // 清除输入的数据
      attr.saleAttrValueName = ''

      // let inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      // this.inputVisible = false
      // this.inputValue = ''
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    // 删除按钮,
    deleteValue(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
</style>

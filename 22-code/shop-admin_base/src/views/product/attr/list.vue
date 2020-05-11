<template>
  <div>
    <!--三个级别的分类-->
    <el-card>
      <CategorySelector @categoryChange="categoryChange" />
    </el-card>
    <!--表格列表数据展示-->
    <el-card style="margin-top:20px">
      <!--显示数据的界面-->
      <div v-show="isShowList">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
        <!--表格-->
        <el-table :data="attrList" style="margin-top:20px" border>
          <!--第一列-->
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="名称" prop="attrName" width="200px"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag
                type="info"
                v-for="value in row.attrValueList"
                :key="value.id"
              >{{value.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="{row,$index}">
              <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="toUpdateAttr(row)"
              ></HintButton>
              <HintButton title="删除" type="danger" icon="el-icon-delete" size="mini"></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--修改的界面-->
      <div v-show="!isShowList">
        <!--修改界面中的文本框-->
        <el-form inline :model="formAttr">
          <el-form-item label="属性名称">
            <el-input type="text" v-model="formAttr.attrName" />
          </el-form-item>
        </el-form>
        <!--这里是添加属性值按钮和修改属性值-->
        <div style="margin-bottom:20px">
          <el-button type="primary" icon="el-icon-plus" @click="addValue">添加属性值</el-button>
          <el-button @click="isShowList=true">取消</el-button>
        </div>
        <!--展现属性值的列表数据,table表格-->
        <el-table :data="formAttr.attrValueList" border style="margin-bottom:20px">
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="属性值列表" prop="valueName">
            <template slot-scope="{row,$index}">
              <!--编辑框-->
              <el-input
                type="text"
                size="mini"
                placeholder="输入属性值按回车确定"
                v-model="row.valueName"
                v-if="row.edit"
                @blur="toViewValue(row)"
                @keyup.enter.native="toViewValue(row)"
              />
              <!-- <el-input
                type="text"
                size="mini"
                placeholder="输入属性值按回车确定"
                v-model="row.valueName"
                v-if="row.edit"
                @change="toViewValue(row)"
              />-->
              <!--展示数据的-->
              <span
                v-else
                @click="toEditValue(row)"
                style="display:inline-block;width :100%"
              >{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除属性值${row.valueName}吗`" @onConfirm="deleteValue($index)">
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
        <el-button type="primary" @click="updateAttr">保存</el-button>
        <el-button @click="isShowList=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'AttrList',
  data() {
    return {
      attrList: [], // 平台属性列表数据
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      isShowList: true, // 默认为true,显示表格列表数据
      formAttr: {} // 是当前这一行的属性对象(id,attName)
    }
  },
  methods: {
    // 自定义事件的回调函数,每次分类的级别发生变化,那么此时只能获取到当前这个级别的id值和标识,
    // 但是,只有得到三级分类的id和标识的时候,发送请求才有意义
    categoryChange({ categoryId, level }) {
      // 传递过来的可能是一级分类id/二级分类id/三级分类id
      // 判断标识的同时,存储对应的分类id值
      if (level === 3) {
        // 此时是三级分类
        this.category3Id = categoryId
        // 说明,1级/2级/3级
        // 发送请求,获取数据
        this.getAttrList()
      } else if (level === 1) {
        // 此时是一级分类
        this.category1Id = categoryId
        // 清除二级分类和三级分类的id,还要清空attrList数组
        this.category2Id = null
        this.category3Id = null
        this.attrList = []
      } else {
        // 此时是二级分类
        this.category2Id = categoryId
        // 清除三级分类id和attrList数组
        this.category3Id = null
        this.attrList = []
      }
    },
    // 点击修改按钮,切换展示界面和修改界面
    toUpdateAttr(formAttr) {
      // 如果点击修改属性的按钮,进入到修改属性界面,然后修改了属性名称或者删除了某个属性值中的数据,那么点击了取消,前面的这些操作,都不应该真正的修改或者删除,
      // 先更新formAttr的对象数据
      // this.formAttr = formAttr  // 这种方式由于这两个对象所指向的引用(地址)相同,所以,无论修改哪个对象中的数据,都会相互的影响
      // 目前,修改属性名称后,点击取消按钮,可以实现(不会影响主界面的数据),但是,删除属性值列表中的数据,不能点击取消,(点击了取消后,会影响主界面中的数据展示),原因:浅拷贝的操作
      // this.formAttr = { ...formAttr }
      // 只能考虑使用深拷贝
      this.formAttr = cloneDeep(formAttr)
      // 显示修改界面(隐藏展现数据列表的界面)
      this.isShowList = false
    },
    // 点击删除属性值的按钮进行删除属性值的操作
    deleteValue(index) {
      this.formAttr.attrValueList.splice(index, 1)
    },
    // 点击添加属性值 按钮,实现添加属性值的操作
    addValue() {
      // 点击的是<价格> 修改按钮,  进入到<价格>  属性值列表的展示界面, 此时点击 <添加属性值> 按钮,应该是向<价格>这个属性中添加一个 值(100-200)的操作
      this.formAttr.attrValueList.push({
        valueName: '', // 属性值的数据
        attrId: this.formAttr.id, // 当前属性的id
        edit: true // 后添加的这个属性值的标识
      })
    },
    // 文本框失去焦点后进入查看模式(失去焦点后,不能在进行编辑操作)
    toViewValue(value) {
      console.log('哈哈')
      // 判断文本框中是否有这个数据
      if (value.valueName) {
        // 这里是value对象中的edit属性,不是this对象的属性
        value.edit = false
      }
    },
    // 点击span标签,进入到编辑模式
    toEditValue(value) {
      //  console.log(value)
      // 设置当前的编辑的标识,如果这个标识为true则进入编辑模式(input文本框出现)
      // value.edit = true
      // 此时,后添加的属性,点击可以进行编辑,原来的点击没有效果
      // 如果value中本来就有edit属性,改变属性值会更新
      // 如果value中本来就没有edit属性,直接添加新的属性,界面不会更新
      // 在一个响应式的对象中添加新的属性，新的属性不是响应式的,就不会自动的更新
      // 如果添加一个新的响应式属性
      // 如果value中本来就没有edit属性,必须使用this.$set()添加了
      if (!value.hasOwnProperty('edit')) {
        this.$set(value, 'edit', true)
      } else {
        // 如果value中有edit属性,那么就更新属性值
        value.edit = true
      }
    },
    // 点击保存按钮,实现更新属性名称及属性值的操作
    async updateAttr() {
      // 将formAttr对象中的所有的属性值对象的attrValueList中后添加的edit属性干掉
      this.formAttr.attrValueList.forEach(value => delete value.edit)
      // 先获取当前属性的对象(属性名称,及属性值列表数组)
      // console.log(this.formAttr)
      const result = await this.$API.attr.saveUpdate(this.formAttr)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        // 切换属性列表界面的操作
        this.isShowList = true
        // 重新获取新的属性列表
        this.getAttrList()
      } else {
        this.$message({
          type: 'error',
          message: '更新失败'
        })
      }
    },
    // 获取属性列表数据的方法的封装
    async getAttrList() {
      const result = await this.$API.attr.getAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      )
      if (result.code === 200) {
        // 更新数据,获取平台所有的属性列表数据
        this.attrList = result.data
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 60px;
}
.save-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>


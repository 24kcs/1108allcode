<template>
  <div>
    <!--三个级别的分类-->
    <el-card>
      <CategorySelector @categoryChange="categoryChange" />
    </el-card>
    <!--表格列表数据展示-->
    <el-card style="margin-top:20px">
      <!--显示数据的界面-->
      <div v-if="isShowList">
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
      <div v-else>
        <!--修改界面中的文本框-->
        <el-form inline :model="formAttr">
          <el-form-item label="属性名称">
            <el-input type="text" v-model="formAttr.attrName" />
          </el-form-item>
        </el-form>
        <!--这里是添加属性值按钮和修改属性值-->
        <div style="margin-bottom:20px">
          <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
          <el-button @click="isShowList=true">取消</el-button>
        </div>
        <!--展现属性值的列表数据,table表格-->
        <el-table :data="formAttr.attrValueList" border style="margin-bottom:20px">
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="属性值列表" prop="valueName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除属性值${row.valueName}吗`">
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
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowList=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
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
    async categoryChange({ categoryId, level }) {
      // 传递过来的可能是一级分类id/二级分类id/三级分类id
      // 判断标识的同时,存储对应的分类id值
      if (level === 3) {
        // 此时是三级分类
        this.category3Id = categoryId
        // 说明,1级/2级/3级
        // 发送请求,获取数据
        const result = await this.$API.attr.getAttrList(
          this.category1Id,
          this.category2Id,
          this.category3Id
        )
        if (result.code === 200) {
          // 更新数据,获取平台所有的属性列表数据
          this.attrList = result.data
        }
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
      // 先更新formAttr的对象数据
      this.formAttr = formAttr
      // 显示修改界面(隐藏展现数据列表的界面)
      this.isShowList = false
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


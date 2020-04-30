<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 第一个省略号 -->
    <button disabled v-if="startEnd.start>2">···</button>
    <!-- 连续页码 -->

    <!-- <button class="active">5</button> -->
    <!--遍历操作,连续页码  5个 ,当前是5   3,4,5,6,7-->
    <button
      v-for="no in startEnd.end"
      v-if="no>=startEnd.start"
      :key="no"
      :class="{active:currentPage===no}"
      @click="changeCurrentPage(no)"
    >{{no}}</button>

    <!--第二个 省略号 -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 关于其他组件需要传递过来的数据对象的配置
    pageConfig: {
      type: Object, // 传递进来的数据的类型
      default: {
        // 这里的数据的默认值的设置
        total: 0, // 总条数
        pageSize: 10, // 每页多少条数据
        pageNo: 1, // 默认显示第几页的数据----默认的页码
        showPageNo: 5 // 默认显示的连续页码数(几个页码按钮是连续显示的)
      }
    }
  },
  data() {
    return {
      currentPage: this.pageConfig.pageNo // 当前页码数----直接从props中获取的
    }
  },
  computed: {
    // 1. 计算总的页码数
    totalPages() {
      // 获取总的数据条数和每页条数
      const { total, pageSize } = this.pageConfig
      // 深入的判断处理,总条数和每页条数小于等于0的情况,没有必要计算了
      if (total <= 0 || pageSize <= 0) return 0
      // 计算出总的页码数(向上取整)
      return Math.ceil(total / pageSize)
    },
    // 计算连续页码数(连续页码的开始和连续页码的结束)
    startEnd() {
      // 默认的开始页码和结束页码都是0
      let start = 0
      let end = 0
      // 当前页码数, 连续页码数, 总的页码数
      // 当前页码
      const currentPage = this.currentPage
      // 连续页码
      const showPageNo = this.pageConfig.showPageNo
      // 总的页码数
      const totalPages = this.totalPages
      // const {currentPage,totalPages,pageConfig:{showPageNo}} = this

      // 计算开始的页码start
      //  9，10，11，12，13
      start = currentPage - Math.floor(showPageNo / 2)
      // 连续页码是5  当前页码是2
      // 1,2,3,4,5
      // 0,1,2,3,4
      // start = 2-2
      // 修正开始页码的操作
      if (start < 1) {
        start = 1
      }
      // 计算结束的页码end
      // 当前页码是11 ,12,13,连续页码是5
      // end = currentPage + Math.floor(showPageNo / 2)
      // 连续是5 , 开始1
      end = start + showPageNo - 1
      // 一共就7页
      // 当前页码6      连续的页码是:3,4,5,6,7
      // 判断
      if (end > totalPages) {
        // 重新修正end
        end = totalPages
        // 重新修正start
        // 1,2,3,4 总的页数：4
        start = end - showPageNo + 1
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
      // 一个方法需要多个返回值,一般可以使用数组方式来存储数据并返回,也可以使用对象的方式并返回
      // return [start,end]
    }
  },
  watch: {
    // 错误写法
    // pageConfig.pageNo(){
    // 特殊写法,之所以加了单引号,因为内部是对象.属性的方式
    'pageConfig.pageNo'(val) {
      this.currentPage = val
    }
  },
  // {
  //   '属性':值
  // }
  // var obj={
  //   name:'小明'
  // }
  // obj['name']='小白'
  methods: {
    // 点击按钮,修改当前页码
    changeCurrentPage(page) {
      // 修改当前的选中页码
      this.currentPage = page
      // 通知外部父级组件
      this.$emit('changeCurrentPage', page)
    }
  }

  // data() {
  //   // 当前组件初始化的时候,或者当前组件在创建的时候,data对象内部能不能使用props对象中的数据(完全可以使用)
  //   // 在data中是否可以读取props中的数据(是可以的),包括Vue原型对象上的属性 (是可以的)
  //   // console.log(this.pageConfig)
  //   // console.log(this.$bus)
  //   // 在data中可不可以直接读取data对象中的数据(不可以的)
  //   // console.log(this.currentPage)
  //   return {
  //     // currentPage: 0 // 当前页码
  //     currentPage: this.pageConfig.pageNo // 当前页码数----直接从props中获取的
  //   }
  // }
  // beforeCreate () { // 初始化之前
  //    console.log(this.currentPage)
  // },
  // created () { // 初始化之后
  //    console.log(this.currentPage)
  // }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

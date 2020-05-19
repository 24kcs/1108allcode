<template>
  <div class="searchContainer">
    <div class="search_content">
      <input
        type="text"
        placeholder="书中自有颜如玉"
        placeholder-class="placeholder"
        v-model="searchText"
        @confirm="search"
      />
      <span class="close" v-show="isShow" @click="clear">✖</span>
    </div>
    <div class="search_list" v-if="books.length">
      <BookList :books="books" />
    </div>
  </div>
</template>
<script>
import request from '../../utils/request'
// 引入BookList组件
import BookList from '../BookList/index.vue'
export default {
  data() {
    return {
      searchText: '', // 文本框中输入的数据内容
      isShow: false, // 默认不显示X
      books: [] // 书籍数组
    }
  },
  components: {
    BookList
  },
  watch: {
    // 监视文本框中的数据,设置X显示或者隐藏
    searchText() {
      this.isShow = this.searchText ? true : false
      this.books = []
    }
  },
  methods: {
    // 点击X清空文本框
    clear() {
      this.searchText = ''
    },
    // 搜索操作
    async search() {
      // 获取文本框的数据
      const searchText = this.searchText.trim()
      const result = await request('/search', { req: searchText }, 'GET')
      // console.log(result)
      this.books = result
      // 调用接口
      // wx.request({
      //   url: 'http://localhost:4000/search',
      //   data: {req:searchText},
      //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   success: function(res){
      //     console.log(res)
      //   }
      // })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.searchContainer
  width 100%
  .search_content
    width 90%
    height 80rpx
    margin 0 auto
    border-bottom 1rpx solid #02a774
    position relative
    input
      width 100%
      height 100%
      font-size 36rpx
      text-align center
      line-height 80rpx
      font-weight 700
      .placeholder
        color #02a774
    .close
      position absolute
      bottom 10rpx
      right 10rpx
      font-size 36rpx
      z-index 99
</style>
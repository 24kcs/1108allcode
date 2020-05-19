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
// 引入request
import request from '../../utils/request.js'
// 引入BookList组件
import BookList from '../BookList/index.vue'
export default {
  data() {
    return {
      searchText: '', // 用来获取文本框中输入的数据的
      isShow: false, // 默认不显示X
      books: []
    }
  },
  components: {
    BookList
  },
  watch: {
    // 监视文本框中的数据
    searchText() {
      this.isShow = this.searchText ? true : false
    }
  },
  methods: {
    clear() {
      this.searchText = ''
      // 清空数组数据
      this.books = []
    },
    // 搜索操作
    async search() {
      // 获取文本框中输入的数据
      const searchText = this.searchText
      // 微信小程序调用接口发送异步请求的操作
      const result = await request('/search', { req: searchText })
      this.books = result // 保存当前搜索到的数据
      // wx.request({
      //   url: 'http://localhost:4000/search',
      //   data: {req:searchText},
      //   method: 'GET',

      //   success: function(res){
      //     // 获取数据成功
      //     // console.log(res)
      //     this.books = res.data
      //   }
      // })
    }
  }
  /**
   * 文本框为空,X就不显示
   * 文本框输入数据,要实时的获取
   * 点击X 干掉文本框中的数据
   *
   *
   */
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
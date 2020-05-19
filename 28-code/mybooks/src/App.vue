<script>
// 引入request
import request from './utils/request'
export default {
  mounted() {
    // 小程序页面最开始加载的时候
    wx.login({
      success: async res => {
        // 获取到了code码的值
        const code = res.code
        const result = await request('/getopenid', { req: code })
        console.log(result)
      }
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
page
  width 100%
  height 100%
</style>
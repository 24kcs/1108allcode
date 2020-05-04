module.exports = {
  lintOnSave:false, // 关闭eslint语法检查
  // lintOnSave:'warning', // 只是输出提示的警告信息
  devServer: {
    proxy: {
      // 处理/api开头地址
      '/api': {
        target: 'http://47.93.148.192/', // 目标地址
        changeOrigin: true // 是否进行跨域
        // pathRewrite: {
        //   '^/api': '', // rewrite path
        // }
      }
    }
  }
}

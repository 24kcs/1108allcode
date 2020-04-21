module.exports = {
  lintOnSave: false, // 关闭eslint语法检查
  // lintOnSave:'warning', // eslint语法检查 只输出提示信息
  devServer: {
    proxy: {
      '/api': { // 处理/api开头的路径
        // target: 'http://182.92.128.115', // 目标位置
        target: 'http://47.93.148.192/',
        changeOrigin: true // 是否跨域
      }
    }
  }
}
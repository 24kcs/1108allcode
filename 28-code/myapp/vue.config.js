// vue.config.js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
  // return path.join(__dirname, '..', dir)
}
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // import Vue from 'vue/dist/vue.esm.js'
        'vue$': 'vue/dist/vue.esm.js',
        // import ff from 'src/components/Header/Header.vue'
        // import ff from 'src/components/Header/Header.vue'
        //  '@123': resolve('src/components')
        //  import ff from '@123/Header/Header.vue'
        '@': resolve('src')
      }
    },
  },
  devServer: {
    proxy: {
      '/api': {
        // 目标的地址
        target: 'http://localhost:5000',
        // 是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
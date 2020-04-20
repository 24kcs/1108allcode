/**
 * 
 * 脚手架2的下载命令
 * npm install -g vue-cli
 * 脚手架3的下载命令
 * npm install -g @vue/cli
 * 注意:如果电脑中安装了脚手架2了,不能直接安装脚手架3,必须要先干掉电脑中脚手架2,然后再安装脚手架3
 * npm uninstall vue-cli -g 先干掉脚手架2
 * npm install -g @vue/cli  再安装脚手架3
 * 
 * 通过脚手架2下载模版的命令
 * vue init webpack app-client2
 * 通过脚手架3下载模版的命令
 * vue create app-client3
 * 注意: 我干掉了脚手架2,也安装了脚手架3,但是我就想通过脚手架2的命令下载模版怎么办
 * 先需要全局安装一个桥接工具  命令:  npm install -g @vue/cli-init
 * 至此: 电脑中有可以通过脚手架2的命令下载模版,页可以通过脚手架3的命令下载模版
 * 
 * 脚手架2 启动 的命令和 打包  打包命令
 *  npm start 
 *  npm run build 
 *  serve dist
 *  
 * 脚手架3 启动 的命令和 打包  打包命令
 * npm run serve
 * npm run build 
 * serve dist
 * 
 * 脚手架2中浏览器自动打开的设置,config 目录中index.js 18行代码设置为true
 * 脚手架3中浏览器自动打开的设置,package.json 中 进行设置 
 * 
 * 脚手架2和脚手架3的目录的区别
 * public公共资源及index.html的目录
 * src目录中的main.js代码不一样
 * 
 * 脚手架2和脚手架3的eslint检查设置也不同
 * 
 * 
 * 
 */
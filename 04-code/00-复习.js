/**
 *  安装脚手架命令  脚手架2的命令
 *  npm install -g vue-cli
 *  vue -V 查看版本
 *  下载模版命令
 *  vue init webpack my-project
 * 
 *  npm run dev 运行项目命令---不会自动打开浏览器
 *  npm run build 打包 产生dist目录
 *  serve dist 运行打包文件
 * 
 *  npm start 可以直接运行,此时不会自动打开浏览器
 *  如果你用的是yarn 下载的,那么运行项目的时候  yarn 是不需要写run的
 * 
 *  在config目录中的index.js文件中的第18行代码:autoOpenBrowser: true 修改为true,自动打开浏览器
 *  在build目录中的webpack.base.conf.js文件中第25行: app: './src/main.js' 是整个项目的入口文件
 * node_modules 依赖包目录
 * eslint检查的问题
 * build目录是webpack的相关的设置
 * config目录配置文件,里面的index.js中可以设置是否让浏览器自动打开
 * dist目录---打包后的目录文件
 * node-modules--依赖包---相关的文件
 * static---存放的是静态资源,css样式,图片,字体
 * babelrc---文件--babel的相关配置----mint-ui中配置
 * .eslintignore---->可以直接用 *.vue 或者*.js 的方式全局的忽略检查
 * .eslintrc.js 文件中 rules---一项一项的配置eslint的相关检查----看我操作
 * index.html----项目主入口html文件
 * package.json配置文件
 * src目录
 * main.js程序的主入口的js文件
 * App.vue父级组件文件
 * assets目录---图片---直接干掉----不用
 * components目录-------里面放的都是组件文件(.vue后缀的文件,叫组件文件)
 * 组件:html+css+js----形成的一个.vue文件---组件
 * 组件:具有一定功能效果的集合,里面包含html+css+js
 * 抽取了多个的组件,就形成了组件化
 * 源码的分析:
 * 
 * 
 * scoped:有可能会影响父子级组件之间的样式
 * 
 * 
 * 很重要---面试题
 * Vue中组件之间的通信方式:
 * props----父子组件之间的通信
 * 自定义事件---父子组件之间
 * PubSub---不属于Vue---任意组件
 * 事件总线---任意组件----就是在Vue的原型上添加一个属性(该属性就是Vue的实例),任意组件都继承自Vue,所以,都可以直接使用该属性,调用相关的方法,从而实现任意组件之间通信
 * 插槽---父子(子父):占位(挖坑)-----很多组件中(多个页面中)用到了相同的结构及样式,而且这些组件中有的地方用到了不同的数据(不同的显示效果),此时可以使用插槽来实现
 * 插槽在使用的过程中,如果插槽有名字,那么该插槽可以叫命名插槽(也可以叫具名插槽)---父组件向子级组件传递数据
 * Vuex---任意组件
 */

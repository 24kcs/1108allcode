/**
 * 1. 封装接口在api目录中的product目录中新建一个trademark.js文件,里面封装各种接口函数
 * 2. 在api目录中的index.js文件中导出 导入默认暴露的trademark模块
 * 3. 在utils目录中的request.js文件中把baseURL的地址稍微修改一下
 * baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
 * 4. 在APP.vue组件中的mounted中测试接口,如果没有问题的情况(接口测试通过的情况)则进入正式的开发
 * 5. src目录中的view目录就是路由组件的存放目录
 * 6. view目录中的product目录中的trademark目录中的list.vue文件开始进行品牌管理模块的开发
 * 7. trademark品牌模块开发,需要使用element-ui组件库进行开发
 * 8. elelment-ui 中的常用组件:Icon图标/Button按钮/Input输入框/Upload上传/Form表单/Table表格/Message消息提示/MessageBox弹框/Dialog对话框/
 * 9. 组件的注意(重点)建议:常用,常看官方文档,多找例子
 */

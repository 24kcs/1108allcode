/**
 * 
 * 1. 脚手架3下载模版,测试打包,运行打包,干掉源码(自己写),可以设置浏览器是否自动打开
 * 2. 安装axios,vue-router,vuex,less,less-loader
 * 3. 创建当前项目需要的对应目录
 * api目录:存放ajax及接口的
 * components目录:普通组件
 * mock目录:模拟后台数据
 * pages目录:路由组件
 * router目录:配置路由
 * store目录:vuex
 * utils目录:缓存的操作
 * 4. 拆分组件并创建组件
 * Header组件---顶部------普通组件====================================
 * Home组件---中间---路由组件
 * Footer组件---底部------普通组件======================================
 * Login组件---登录---路由组件
 * Register组件---注册---路由组件
 * Search组件---搜索---商品列表----路由组件
 * 5.最终需要在App.vue中
 *  <Header/>
 *  <router-view></router-view>
 *  <Footer/>
 * 6.拆分组件---辉鸿目录---->home.html--->进行组件的拆分(需要在index.html中引入重置样式文件,reset.css(推荐使用绝对路径,暂时是相对路径(该文件中的第一行引入图标字体的代码暂时干掉)))
 * 
 * 7.声明式路由跳转和编程式路由跳转在Header组件内部实现
 *  1) 登录和注册使用的是声明式路由跳转
 *  2) 搜索按钮中使用的是编程式路由跳转
 *     跳转的时候还是当前的路由地址,多次点击的时候出现了bug,
 *     解决方案2个:
 *        1. 在路由跳转的时候传入成功或者失败的回调,或者调用catch方法内部传入空回调
 *        2. 在路由器对象中重写路由器对象的push和replace原型方法,内部在成功或者失败的参数上传入默认空函数,或者catch()
 * 
 * 
 * 8.路由跳转进行传参操作
 * 路由器一旦注册后,每个组件中都会出现两个对象
 * $router 路由器对象,可以调用相关的方法,实现编程式的路由跳转
 * $route 路由组件信息对象,可以获取路由传递的参数数据信息
 * 编程式路由进行跳转并传参数的时候:params和query的方式是有区别的
 * 编程式路由跳转及传递参数,可以使用字符串的方式,也可以使用对象的方式
 * 无论是query方式还是params方式.使用对象的方式传递参数的时候,都可以使用name属性,但是,如果使用path属性只能在query中,不能在params中
 * 
 * 
 * 总结:路由跳转及路由传参
 * 路由的跳转:声明式路由跳转,和编程式路由跳转
 * 声明式路由: <router-link to="地址" />配合<router-view>
 * 编程式路由:$router.push('地址')和$router.replace('地址')
 * 编程式路由跳转传参；
 * 字符串写法:$router.push('地址/参数')--->params的方式(需要占位)   $router.push('地址?参数')--->query的方式(不需要占位) 
 * 对象的写法:$router.push({name:'名字',params:{键:值}})--->params的方式(需要占位,设置name属性)   $router.push({path:'地址',query:{键:值}})--->query的方式(不需要占位) 
 * 
 * 面试题:正向代理和反向代理的问题
 * 
 * 脚手架2和脚手架3的跨域配置
 * 脚手架2的跨域可以在config目录中的index.js文件中: proxyTable: {},里面进行跨域的配置
 * 脚手架3的跨域可以在vue.config.js文件中:devServer:{} 里面进行跨域的配置
 * 
 * 
 * 脚手架2和脚手架3的eslint的设置
 * 脚手架2中可以在.eslintignore文件或者在eslintrc.js中对eslint语法进行进行关闭操作
 * 脚手架3中可以在package.json文件中的"rules": {}关闭相关的eslint语法检查 或者在vue.config.js文件中进行配置的方式关闭eslint语法检查
 * 
 * 面试题:你们的项目为什么要用vuex或者为什么不用vuex
 * 答:看老大
 * 涉及到的状态数据比较多,管理起来不是特别方便,而且多个组件之间要进行通信,所以,使用vuex可以解决这些问题
 * 
 * 
 * Vuex中模块的操作,及模块的命名
 * 为什么要有模块化的操作,如果不进行模块化的操作,最终state,mutations,actions,getters每个对象中会出现大量的代码,很雍容,管理起来(维护,升级,更新)不方便,所以要进行Vuex的模块化操作
 * 模块如何命名?
 * 可以根据功能来命名,也可以按照组件的使用来进行命名
 * a组件用到了3个数据,第一个模块的名字就是a
 * b组件用到了2个数据,第二个模块的名字就是b
 * Vuex中的模块如何定义(文件),创建一个modules目录,中每个模块都是一个js文件,
 * Vuex模块化后还有下面的这个问题
 * 当前vuex中的index.js文件还在引入state,mutations,actions,getters,何用,作何解释?
 * 每个模块中的state,mutations,actions,getters这些都是子的
 * 在store目录中的index.js文件中引入的state,mutations,actions,getters,是总的
 * 
 * 问题:三级菜单列表默认是通过:hover的方式切换二级菜单(三级菜单)显示和隐藏display: block;
 * 此时鼠标进入到一级菜单后,并没有真正的高亮显示效果(其他的功能)
 * 需求:鼠标进入一级菜单后,默认有高亮显示效果:
 * 思路: 每个一级菜单都有自己的索引,自己定义一个表达式用来存储索引,只要一级菜单的索引值和自定义的表达式中的索引值相同,此时当前的这个一级菜单就应用某个类样式,从而实现高亮显示效果
 * 自定义的表达式的值,如何设置,当鼠标进入到一级菜单后(鼠标进入事件)就设置自定义的表达式的值为当前索引值,鼠标离开后,干掉这个自定义表达式中存储的索引值
 * js的字符串推荐使用单引号的方式(Vue.js中),单词拼写的时候要多注意(不要拼写错了)
 * 
 * 函数的节流和防抖非常重要,面试笔试题,或者提问
 * 问题:要解决一级菜单鼠标进入的事件的触发频率导致的性能的问题(卡顿的)--->函数节流的方式--->手写的函数节流代码----->调用lodash库来解决----印记中文搜索(CDN搜索)
 * 
 * 问题1:点击菜单的时候,路由跳转,同时实现query的方式进行传参
 * 都跳转到了search界面  query方式传参  categoryName,category1Id,category2Id,category3Id
 *  ?categoryName=图书、音像、电子书刊&category1Id=1
 *  ?categoryName=电子书刊&category2Id=1
 *  ?categoryName=电子书&category3Id=1
 *  问题2:鼠标在一级菜单上切换,出现了卡顿的问题,-----多层v-for嵌套的同时内部生成了大量的路由链接
 *  每次鼠标快速移动菜单的时候,不停的触发菜单的鼠标进入事件(减少事件的不必要的触发的问题)--函数的节流,函数的防抖
 * 
 * 问题:TypeNav组件中为了解决路由跳转及传参,所有的三级分类菜单列表中出现了大量的router-link,所以,要进行优化操作(内部是使用的声明式路由跳转并携带参数)
 * 
 * 解决:编程式路由跳转携带参数(通过事件委托的方式)
 * 
 * 
 */
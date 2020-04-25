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
 * TypeNav组件中的数据就是通过调用接口,发送请求,获取数据,在组件内部实现功能
 * 
 * 问题:ListContainer组件和Floor组件,内部需要通过调用接口,发送异步请求,获取数据,在组件内部动态显示数据操作
 * 目的:组件内部获取数据,操作数据---->很抱歉,后台没有你要的数据
 * 前端程序要<--------Api调用接口------->后端进行交互(后台没有数据)
 * 前端程序员--->自己做数据(模拟后台程序员自己制作一些假的数据(和后台相关))=======>设计一些数据(模拟数据)--->先保证自己的前端页面中可以正常的使用
 * 后台暂时没有前台需要的数据,但是又不能影响真实的开发,前端程序员需要先自己设计部分数据,而且调用接口,发送异步请求,就可以获取这些数据,进行使用(组件内部可以使用)
 * 
 * 需要的数据暂时没有,该如何的设计数据(前端程序员必备技能)---
 * 例子:实现登录效果 帐号和密码  后台现在没有帐号和密码的数据(必须实现登录功能)
 * 用户--->人---对象--->属性和方法
 * 点击按钮,调用login()方法,实现登录
 * 需要:多个(帐号和密码)
 * {
 *  userName:'admin',
 *  userPwd:'123'
 * }
 * [
 *   {userName:'admin1',userPwd:'123'},
 *   {userName:'admin2',userPwd:'1234'},
 *   {userName:'admin3',userPwd:'1235'}
 * ]
 * 
 * ListContainer组件和Floor组件要用到数据(没有)
 * 在组件中调用接口---->发送异步请求---->获取数据,显示到页面中
 * 设计数据---->调用接口--->发送请求--->获取数据,显示到页面中
 * 设计数据---->把数据存放在json文件中(本地)--->调用接口--->发送请求--->获取数据,显示到页面中
 * 
 * ListContainer组件中的轮播图数据的设计:
 * [
 *   '/images/1.jpg',
 *   '/images/2.jpg',
 *   '/images/3.jpg',
 *   '/images/4.jpg',
 * ]
 * 使用什么类型来存储大量的数据?  数组或者对象---->json文件中
 * 
 * 
 * Mock的使用:
 * 先安装,然后调用Mcok相关的方法,设定指定格式的接口,准备好要响应回去的数据,即可
 * 
 * 
 * 
 * ListContainer组件内部在创建Swiper对象的时候,页面中轮播图无法正常的使用
 * 原因:从Vuex中获取的轮播图数据,动态的加载到页面上的时候,先创建的swiper对象,后显示轮播图,此时出现的bug
 * 本身轮播图应该先显示在页面中,然后在创建Swiper对象,这样,保证轮播图是效果正常的
 * 因为组件加载的时候,发送的异步请求,此时数据没有响应回来,但是页面已经显示了,Swiper对象在页面加载后的那一刹那之间就创建完了,所以,轮播图无法正常的使用
 * 解决:
 * 方式1:
 * 通过setTimeout()方法让创建Swiper对象的时机稍微的晚那么一点,等待数据响应回来后在创建Swiper,页面可以正常使用轮播图
 * 但是,可但是,但可是,也有缺陷,为啥捏?因为定时器设定的时间是无法准备的设定的,最好的方式,就是数据响应回来的一瞬间,直接创建Swiper对象会更好的
 * 
 * 方式2:this.$nextTick()或者Vue.nextTick(),将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
 * 
 * 
 * 轮播图的结构及样式,包括动态的数据---页面显示的轮播图效果在多个组件中使用,此时可以把这个重复使用率比较高的内容抽取出一个组件----全局组件(公共组件)----高复用组件
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
   // 当前Carousel该组件创建了,此时必然会执行mounted的这个生命周期回调
    /*
    mounted回调执行了3次,
    ListContainer组件内部使用过一次该组件,该组件肯定是创建了,所以,mounted肯定会执行---1次
    Floor组件内部使用过一次该组件,该组件肯定是创建了,所以,mounted肯定会执行---1次,但是Floor组件在Home组件中通过循环遍历的方式产生了两次的Floor组件,所以,最终Floor组件通过遍历的方式,导致了Carousel该组件创建了2次----
    大轮播图有4个数据,楼层中的轮播图数据有3个
    明确mounted回调函数是怎么回事(内部的代码肯定是在页面加载后才执行),明确该回调中的代码会执行几次?(从组件创建到组件销毁就执行一次)
    
    ListContainer组件中 Carousel组件是如何创建的
    一开始ListContainer中使用的Carousel组件,内部中通过carouselList="banners"传入了数据,注意,banners有没有数据都不会影响该组件的创建,一开始banners是没有数据的,但是Carousel组件还是正常的创建(此时banners数据还在异步请求的路上或者是响应回来的路上,总之此时banners没有数据,但是Carousel组件已经开始创建了),一旦创建,就会进入到mounted生命周期回调中,而此时该组件接收的传入进来的数据就是0=================>坑---->此时banners传入到了Carousel组件内部通过props接收了,存储到了carouselList数组中,但是没有数据,没有数据,那么轮播图为什么可以正常的显示出来----->大坑1
    大坑1: 一开始组件创建,没有数据,数据是0,但是此时正在发送异步请求,组件被创建出来了,数据也已经响应回来了,此时该组件内部的这个数据carouselList的数据发生了变化了,一旦变化,必然进入到watch中,然后就是数据变化,页面更新,Swiper被创建了,轮播图的效果就出来了

    Floor组件中Carousel组件是如何创建的
    Floor组件是在Home组件中使用的,但是Floor组件的创建和该组件中使用的v-for指令关系非常大
    Floor组件中的v-for指令中的floors这个数据是一个数组,数组有数据,v-for指令执行才有意义(可以遍历,可以遍历才可以创建Floor组件)
    floors是数组,该数组的数据是从一开始就有的吗?没有,因为Home组件中的内容加载后才发送异步请求,获取floors数据,该数据存在了,此时Floor组件才开始创建,创建的时候floors数据被传入到Floor组件内部,那么Floor组件内部使用的Carousel组件并传入的数据是存在的,也就意味着:Carousel组件创建的时候,轮播图的数据已经存在了,此时进入到mounted回调的时候,内部是可以拿到轮播图的数据的,就是3个,一共是两次,每次3个数据,mounted内部的代码已经执行完毕了,而且数据没有再次的更新了,界面也就不会变化了(页面不会被重新渲染了)=========>  坑---->此时既然有数据,为什么轮播图不能正常的显示----大坑2
    大坑2:一开始组件没有被创建,没有数据,后来有数据了(已经有数据了),组件才被创建,组件创建出来的时候,数据已经存在了(此时异步请求的数据早就回来,所以才会创建组件),所以,当这个组件出现在页面的时候,数据没有再变化过,既然没有变化过,就不会执行watch中的代码,既然里面代码没有被执行,所以,Swiper也不会被创建,所以,楼层中的轮播图无效

    结果:mounted确实执行了三次,数据是0,3,3,   watch就执行一次
    解决问题:让watch监视的时候,立刻的执行当前的回调

    通过观察,发现:watch竟然执行了一次,什么时候执行watch(监视中的代码什么时候会进入呢?)
    通过分析,watch中的代码应该最少执行三次,为什么?该组件被创建了三次,数据也传入了三次,只要数据变化,必然会最少执行三次,但是结果只有一次,说明数据就变化了一次
    
    */
    //分析的结果: 第一次进入mounted的时候有4个数据,二次和三次都是3个数据,3个数据
    // 但是,真实的结果,不是这样的,第一次进入到mounted的时候,数据是0个,第二次和第三次进来的时候的数据都是3个
    // 真实结果实际上是正确的
    //
    // console.log('mounted', this.carouselList.length)
    // 猜测:watch执行了多少次?



    /*
      Search组件内部需要的接口的参数的分析
      category1Id:   // 一级分类的id
      category2Id:   // 二级分类的id
      category3Id:   // 三级分类的id
      categoryName:  // 分类的名字
      trademark:     // 品牌      值:  "品牌id:品牌名字"--->"4:小米"
      order:         // 排序方式  值: "1:asc" 1--综合,2--价格, asc--升序 desc--降序
      pageNo:        // 当前第几页   数字值   
      pageSize: 10   // 每页多少条数据  数字值
      keyword:       // 搜索关键字    在搜索框中输入的内容
      props:         // 多个属性条件组成的数组, ["属性id:属性值:属性名字"]
      [
        "1:1700-2799:价格",
       "2:6.65-6.74英寸:屏幕尺寸"
      ]
    
     */
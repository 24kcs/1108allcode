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


     /**
      * 
      * Search组件内部,关于其他组件跳转到当前的Search组件出现bug
      * 1. 参数确实变化,请求没有发送
      * 原因:a组件--->跳转--->b组件   b组件会重新重新创建,组件就重新实例化,mounted也就会重新执行
      * b组件---->跳转---b组件    b组件是不会重新创建的,不会实例化,mounted也不会重新执行
      * 解决: vue-router官方找文档解决,通过watch监视$route
      * 提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
      *
      * 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象
      * 
      * 
      * 
      * 
      */


      /** 
       * 
       * bug: 在Search组件中分类名字点击进入搜索和Header组件内部输入关键字点击搜索按钮出现的bug
       * 1.点击分类名字,路由地址上会出现query参数,再次点击搜索按钮(搜索框中有关键字),路由地址上出现了params参数,之前的query参数没有了---bug
       * 
       * 2.点击搜索按钮(搜索框中有关键字),路由地址上出现了params参数,再次点击分类名字,路由地址上出现了query参数,之前的params参数没有了--bug
       *  第一种情况:先在TypeNav组件中点击的,然后再次点击搜索(在Header组件中发生的)
       * 
       *  第二种情况:先在Header组件中点击的,然后再次点击分类(在TypeNav组件中发生的) 解决了
       * 解决:路由跳转的时候需要判断当前的路由地址是否包含/search,说白了:跳转的时候判断是否在Search界面中进行的跳转,从而是否携带query参数和params参数
       * 
       * 
       * 需求:TypeNav组件跳转到Search页面的时候,使用的是push,我可以再次点击分类名字进行搜索,甚至,可以继续点击分类名字进行搜索,但是,我回退的时候,无论前面点了多少次的分类搜索,我都希望回退的时候能够回到home
       * 例子: H--->S--->S  退回---->H 怎么办
       * 
       * 
       * bug:输入关键字搜索,然后点击一级分类名字搜索,再次点击二级分类名字搜索,此时出现了bug,nextwork中的请求的参数中发现了问题；category1Id: "2",category2Id: "13"  此时应该是category2Id参数有值,前面的category1Id应该没有值
       * 原因:Search页面加载后,如果之前点击了一级菜单名字,此时组件内部的参数就会有缓存数据,再次点击二级菜单的时候,之前的一级菜单的数据还存在,二级菜单的数据也是存在的,但是路由会进行跳转,数据也会携带,说白了:每次跳转,携带的参数数据发生变化,就会进入到watch中,watch中的相关数据没有进行过重置操作
       * 解决:当上述情况发生的时候,应该把watch中部分参数进行重置操作
       * 
       * 
       * 
       * Header组件进入Search后
       * Search组件中全部结果中的信息,点击x的时候和Header进行通信---->任意组件----事件总线
       * 问题:点击全部结果中的信息,干掉Header组件中的搜索框中的数据
       * 事件总线的方式:
       * Header组件中绑定事件----页面加载后
       * Search组件中点击全部结果中的 关键字x 分发干掉关键字的事件
       * 
       * 
       * 
       * Pagination 分页组件的设计
       * 
       * 设计通用组件的基本的思路(面试题)
       * 1) 基本界面的结构和布局
       * 2) 设计内部状态数据
       *  currentPage:当前的页码
       * 3) 设计当前组件需要接收哪些动态的属性数据:
       *   total  总条数
       *   pageSize 每页多少条数据
       *   pageNo   默认显示第几页的数据
       *   showPageNo 默认显示的连续页码数(几个页码按钮是连续显示的) 
       * 4) 设计内部数据发生改变的时候,通知外部父级组件,自定义事件或者属性函数来实现
       *    当前页码发生变化,分发事件通知父级组件
       *    this.currentPage=currentPage
       *    this.$emit('事件名字',currentPage)
       * 
       * 
       * 设计连续页码算法
       * 1.连续页码必须有开始页码和结束页码---最终要计算出来
       * 2.连续页码的数量---可以直接限定出来---5个(连续的5个按钮显示出来---:3,4,5,6,7)
       * 3.总的页码数---先计算出来---总的数据条数17,每页显示多少条4---- 17/4----->5--->为什么是5?原因:向上取整
       * 
       * 
       * 开始页码:9
       * 结束页码:13
       * 已知当前页码是11
       * 已知连续页码是5
       * 求:开始页码:9,结束页码:13
       * 开始页码怎么算出来的,结束页码怎么算出来
       *   
       *     9，10，11，12，13
       * 
       * 
       *  在Detail组件点击添加购物车按钮的时候出现的
       *  // 如何根据提交的异步action的成功或者失败做不同的处理?
       * 两种方式:
       * 方式1:
       *   使用callback回调处理
       *     在组件内部,分发异步action的时候,使用dispatch()方法的时候,传入一个回调函数callback
       *     在异步action中,在请求处理成功或者失败的时候,调用这个回调函数callback,如果成功就向callback中传入空字符串,失败就传入错误的信息
       *     在callback回调函数内部,判断传入的是空串还是错误信息,根据空串或者错误信息来进行跳转处理
       * 方式2:
       *   使用async函数处理
       *   前提:async函数执行的返回值是一个promise对象
       *   promise成功的value: 函数执行时候没有错误,那么return 的就是value(不能是失败的promise)
       *   promise失败的reason:函数执行的时候出错或者抛出错误或者返回一个失败的promise
       *  this.$store.dispatch()的返回值就是action函数的返回值
       * 
       *   在组件中,普通的方式分发action, this.$store.dispatch('action的名字',参数)
       *   在异步action中,请求处理成功或者失败后,返回相关的错误消息(errorMsg(可能没有值(空串),可能有值(错误消息)))
       *    return result.code===200?'':(result.message||'添加购物车失败')
       *   在组件中,通过await得到当前的action返回的错误消息(可能是空串,也可能是有值错误消息),根据判断来处理对应的问题
       * 
       * 
       * sessionStorage或者localStorage 区别:
       * 相同点:
       * 都是在浏览器端进行存储
       * 语法相同: setItem(key)/getItem(key)/removeItem(key)
       * 不同点:
       * sessionStorage
       *  存储在浏览器运行的内存中---->浏览器关了,数据被清除了,重新打开浏览器也不会找到的
       *  速度是很快的
       * localStorage
       *  存储在浏览器的本地的文件中(硬盘)---->浏览器关闭,又打开了,数据还可以获取到
       *  速度相对于上面的方式而言,稍微慢一点
       * 
       * 文件:精华面试题宝典.txt(word文档)---总结起来---面试精讲(问题)
       * 
       * 
       * 1. 删除购物车中指定的商品  购物项
       * 2. 删除所有选中的 购物项
       * 3. 改变某个购物项的选中状态
       * 4. 改变所有购物项的选中状态
       * 5. 修改 某个购物项的 数量
       * 结算--必须要登录---->做注册和登录
       * 
       * 
       * 改变某个购物项的选中状态:
       * 1) 组件中从vuex读取的数据来显示是否勾选
       * 2) 当用户在组件中改变勾选状态的时候,将最新的勾选状态同步到vuex中(可能需要发送请求)
       * 
       * 
       * 注册失败的原因之一(非常明显的失败,请求都是成功的)
       * 针对咱们目前的这个项目而言:
       * 原因:
       * 显示图形验证码:
       * http://47.93.148.192/api/user/passport/code
       * 浏览器直接发送了一个请求,并没有经过代理服务器
       * 后台生成了一个图形码值code,保存在后台,并且以图片的形式返回给了浏览器,显示出来
       * 注册的时候:
       * 通过代理服务器的方式发送的请求,传过去的code码/mobile手机号/password密码
       * 后台要读取对应的code码,和传过去的code进行一个对比
       * 由于两次请求产生的图形码不是同一种方式发的请求(一个是通过http引擎,另一个是通过ajax引擎),后台肯定是找不到对应的code码
       * 两次code码比较,是失败的
       * 如何解决:
       * 都是用代理服务的方式来获取图形码的值code
       * 
       * 
       * 有的时候,图形码在html标签中的src中是一个请求的地址,页面中点击图形码,要进行验证码的更换的操作,在该点击事件中,肯定要获取图形码的标签,设置src属性值,如果html标签的src值和当前点击事件中的src设置的值是一样的,那么有的时候是不会更换图形码的(图形码点击,没有效果),怎么解决? 那么可以在图形码的地址后面加一个时间戳,即可
       * 如:
       * '/api/user/passport/code?time='+Date.now()  该地址中本身没有参数,你自己加了一个参数,是不会影响正常的请求
       * 
       *   
       * 
       * 
       * 
       * 
       * 
       * 
       */
      /*
      自动登录的方式:
      1.cookie方式:
临时cookie:浏览器,内存中存储,浏览器关闭了,销毁了
持久化cookie:浏览器发送请求给服务器,服务器检测各种请求后没有任何问题的情况下,创建临时cookie,然后设置maxAge的属性,把临时cookie变成了持久化cookie,内部携带用户的id或者携带用户的少量信息,还会设置有效期,返回给浏览器,浏览器在打开项目的时候,会自动的从cookie读取用户信息,或者读取的是用户id发送请求给服务器,服务器验证,没有问题的情况下,给浏览器返回用户的相关信息
cookie过期的问题,就要重新发送请求,执行上面的描述信息的思路


2.localStorage方式:当用户登录的时候,给服务器发送请求,服务器验证没有问题的情况下,返回用户信息给浏览器,浏览器获取用户信息的同时(保存到vuex中(临时的,内存中))在通过localStorage把用户相关信息存储到浏览器本地,刷新页面或者重新打开浏览器的时候从localStorage中读取用户信息,在页面中显示用户信息(人为干掉了浏览器的缓存信息),也要重复上面的操作


3.token:就是一个特定格式的字符串,内部有token标识(一般可以使用用户的id),过期时间,密钥
token方式:(推荐使用这种),针对目前项目,暂且无法正常使用,接口没有搞定
浏览器发送请求登录的时候,服务器端验证接口及相关检测,没有问题的情况下,此时从数据库获取用户信息,同时也会创建token对象(标识,过期时间,密钥(加密的钥匙))(后期的时候token是一个字符串) 然后返回给浏览器一个对象,用来存储用户信息及token,浏览器端获取返回的用户信息对象,存储token(localStorage和vuex(没有使用vuex,当然可以不存储到vuex中)),再次登录的时候获取token,放在请求头中进行携带,可以自动登录(访问特定的接口的时候需要携带token---我的订单(必须要登录的情况才能查看,需要携带token))

vuex中存储是临时,将来读取token的时候直接从这里读取,速度快(内存)
localStorage中存储是比较持久的,关闭浏览器,再次打开,还是可以使用的(速度相对vuex(略慢))
      
      */


      /*
      userTempId:临时用户id
token:登录成功后的标识字符串

1. 用户没有登录的情况添加商品到购物车
   获取购物车的商品的接口,是需要携带userTempId(即使你没有登录,但是你添加了购物车,如果关闭了浏览器,再次打开浏览器,你之前添加购物车的商品,同样可以再次的在购物车页面中可以看到)


2. 用户登录的情况添加商品到购物车
   之前用户没有登录过,也没有添加过商品到购物车中,那么现在登录了,就有了token,此时添加购物车商品,调用接口,关闭页面了,再次打开,依然是登录状态,访问购物车页面,需要调用购物车的接口,发送请求获取数据,此时后台是要求你需要在请求头携带token的,才能真正的查看到登录用户的购物车商品列表



3. 用户没登录然后又登录了的情况添加商品到购物车
一开始没登录用的是临时用户id凭证,添加购物车,添加了1个商品,此时在购物车界面,可以看到商品的,但是,此时直接登录了,又添加了1个商品到购物车中,那么此时查看购物车,该有几个商品?合并商品操作(把临时用户添加的购物车数据和登录的用户添加的购物车数据合并起来)
      
      
      */
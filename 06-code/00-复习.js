/**
 * 
 * Vue是可以使用vue-router,实现单页面应用(页面不刷新的情况,可以显示不同的内容(不同组件切换的显示结果))
 * 路由:前端路由和后端路由
 * 前端路由:就是一种映射关系,链接地址对应着某个组件,跳转地址,对应的组件内容就会显示
 * 链接地址发生变化,根据地址,在页面的指令的位置可以渲染对应的组件内容
 * 链接地址,就是一个a标签中有href,href中有地址
 * 路由链接:router-link 标签中有to='地址',最终在页面中会渲染成一对a标签,a标签就是所谓的链接地址
 * 路由视图:router-view 标签的位置最终会渲染路由地址对应的组件内容
 * 组件:普通组件,路由组件
 * 普通组件一般定义在components目录中,路由组件,一般定义在pages目录中
 * 路由的使用:
 * 首先通过npm install vue-router 安装这个包
 * 定义一个router目录,定义一个index.js文件
 * 先引入路由包,声明使用路由,实例化路由器对象,并暴露出去,在main.js中引入路由器对象并在实例化Vue的时候注册路由器
 * 普通的组件一旦进行路由的配置了,此时这个普通的组件就变成了路由组件
 * 定义路由的时候,每个路由都是一个对象$route,每个对象中都有path属性和component属性
 * 路由在跳转的时候,浏览器的地址栏中有的时候会有#,有的时候会没有#
 * 配置路由的时候可以通过mode属性来设置浏览器的地址栏中是否有#
 * 默认是hash模式,有#,如果mode:'history' 此时浏览器的地址栏中没有#
 * 路由:一级路由,二级路由,三级路由....
 * 路由重定向: {path:'地址',redirect:'地址'}
 * 路由传参:可以通过params和query的形式-----props---meta
 * params形式:布尔模式,对象模式,函数模式
 * 
 * 一旦路由器对象被注册(main.js中),每个组件的实例对象中都有一个$router属性(对象)
 * 通过router-link配合router-view,不写js代码的方式可以直接实现路由跳转,这种方式:声明式路由
 * 如果通过js代码的方式实现路由跳转,这种方式:编程式路由
 * router.push()和router.replace() 两个方法可以实现编程式路由
 * push()有上一次的历史记录
 * replace()没有上一次历史记录
 * back()可以返回上一次的路由
 * router-link和push()都有上一次记录,跳转结果一样,router-link这种方式是否可以实现replace的效果,可以,只需要在router-link标签上添加一个replace属性
 * 
 * keep-alive 标签是Vue中提供的内置组件,可以用来缓存路由组件
 * router-view 标签可以进行传参,在需要该参数的组件中使用props进行接口,即可使用了
 * 
 * 
 * 
 * 
 * 
 * Vuex---Vue中的组件之间通信的问题
 * Vuex用来做集中式管理状态数据的,任意组件之间的通信问题
 * Vuex是一种管理状态数据的模式,被集成到了Vue中
 * 一般情况如果一个项目用到了Vuex,通常会把Vuex的文件创建到对应的目录中
 * vuex目录,里面用store.js
 * 或者
 * store目录,里面用index.js文件------推荐这种方式
 * Vuex中的对象
 * 
 * state: 包含了多个状态数据的对象   age:10
 * mutations: 包含了多个直接修改状态数据的方法的对象  直接和state沟通
 * actions: 包含了多个间接修改状态数据的方法的对象     和mutations沟通--->state沟通
 * getters: 包含了多个状态的计算属性的get方法的对象  
 * 外部想要获取状态数据的值:$store.state.age 
 * 外部想要获取状态数据的*2的值: $store.getters.age2
 * mutations中会有很多的方法,每个方法都可以叫mutation,每个方法都有自己的方法名字,每个方法的名字都可以看成是当前的这个mutation的类型(type),一般情况,我们会把mutations中的每个mutation的type抽取出来单独的定义成常量,将来使用的时候引入即可
 * 同理:
 * actions中的每个方法都可以叫action
 * 如果想要修改状态数据:有两种方式,1通过mutations,2通过actions
 * 如果想要调用mutations中某个mutation,那么需要通过commit() -----可以叫:提交mutation修改状态数据
 * 如果想要调用actions中的某个action,那么需要通过dispatch()-----可以叫:提交action修改状态数据
 * 
 * mutations中都是同步的方法,actions中可以是同步操作也可以是异步操作,总结,所有的异步操作肯定都在actions
 * 外部可以使用简化的代码(辅助函数)来获取状态数据,或者是修改状态数据
 * ...mapState(['数据1','数据2']) 
 * ...mapMutations({}/[])  如果当前的方法的名字和mutation的type一致,那么使用数组方式,否则使用对象
 * ...mapActions({}/[])    
 * ...mapGetters([]) 
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
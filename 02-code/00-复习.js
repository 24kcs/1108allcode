/**
 * 
 * 
 * 1.Vue是渐进式的JavaScript框架
 * 2.React是用于构建用户界面的 JavaScript 库
 * 3.Vue:易用,灵活,高效,
 * 数据代理,双向数据绑定,强制数据绑定,事件绑定
 * 数据代理: data中的msg可以通过vm.msg来进行访问
 * 4.指令:
 * v-model:双向数据绑定,主要用在表单标签上
 * v-bind:强制数据绑定,主要用在标签的属性上,一般指的是该属性的值是动态的,简写---->  :属性名字="表达式"
 * v-on: 绑定事件,主要用在标签的属性上,用来绑定事件,事件名字是没有on的,是小写的,简写--->@事件名字="回调函数"
 * v-if: 用来切换显示标签是否在页面中展示出来,有可能在DOM树中不能存在
 * v-show: 用来切换显示标签是否在页面中展示出来,一直存在DOM树中
 * 和v-if配合的指令,v-else,v-else-if
 * v-for:用来遍历循环的
 * v-for="(item,index) in 数组"  :key="index/item.id"
 * v-for="item in 数组"
 * v-for="(val,key,index) in 对象"
 * v-index) in 对象" key--->键(对象的属性),val--->值(该属性对应的值),index--->索引for="(val,key,
 * 实例化Vue的对象的时候,配置对象中
 * $refs--->Vue实例对象的一个属性,该属性可以获取DOM元素,进行DOM操作
 * const vm = new Vue(配置对象)
 * 配置对象中:
 * el------>获取容器的属性
 * data---->数据
 * methods---->定义方法
 * computed--->计算属性:当某个属性的值发生变化的时候,和其相关联的属性的值会自动发生变化
 * 
 * watch----->监视(监听,侦听):当某个数据的值发生变化,需要做相关的操作的时候.
 * Vue中元素的样式操作:
 * 1. class方式,可以使用对象模式,数组模式,动态,静态
 * 2. style方式,对象模式,数组模式
 * 
 * 
 */
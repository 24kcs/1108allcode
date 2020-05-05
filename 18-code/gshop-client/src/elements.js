// 我要在组件中使用element-ui组件库,为了更加的方便使用,我也要根据element-ui官方的提示信息,把该组件库中常用的组件直接嵌入到组件的实例对象中(this.组件名字使用了)----把element-ui中的部分组件最终添加到Vue的原型上
// 引入Vue
import Vue from 'vue'
// 引入element ui
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
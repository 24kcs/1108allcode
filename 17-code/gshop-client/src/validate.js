// 引入Vuex
import Vue from 'vue'
// 引入表单验证插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 声明使用插件
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages, // 中文的提示设置
  // 相关的属性翻译成中文的解释
  attributes: {
    mobile: '手机号码',
    code:'图形验证码',
    password:'密码',
    password2:'确认密码'
  }
})
// 除了默认的表单验证方式以外,扩展其他的验证方式
VeeValidate.Validator.extend('checkMobile', {
  getMessage: field => `请输入正确的` + field,  // 该验证方式的提示信息
  validate: value => /^[1]\d{10}$/.test(value)  // 具体该如何验证
})
VeeValidate.Validator.extend('checkCode', {
  getMessage: field => `请输入正确的` + field,  // 该验证方式的提示信息
  validate: value => /^\d{4}$/.test(value)  // 具体该如何验证
})


// {
//   required: function (field) {
//     return '请输入' + field;
//   }
// },
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    OldPassword: '旧密码',
    NewPassword: '新密码',
    ConfirmNewPassword: '确认密码',
  }
});

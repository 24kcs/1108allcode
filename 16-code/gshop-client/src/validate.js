import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
var dict = {
  zh_CN: {
    messages: {
      required: function (field) {
        return '请输入' + field;
      },
      confirmed: function (field) {
        return '两次输入的密码不一致';
      }
    },
    attributes: {
      OldPassword: '旧密码',
      NewPassword: '新密码',
      ConfirmNewPassword: '确认密码',
    }
  }
};
VeeValidate.Validator.localize('zh_CN', dict.zh_CN);
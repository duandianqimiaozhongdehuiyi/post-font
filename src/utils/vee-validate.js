/*
 * @Author: your name
 * @Date: 2020-11-30 15:15:05
 * @LastEditTime: 2021-03-09 10:58:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\vee-validate.js
 */
import Vue from 'vue'
// import * as rules from 'vee-validate/dist/rules'
import { required, email, min, length, confirmed, is_not } from 'vee-validate/dist/rules'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
// Object.keys(rules).forEach((rule) => {
//   extend(rule, rules[rule])
// })
extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('is_not', is_not)
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

const dictionary = {
  code: 'zh-CN',
  messages: {
    ...zh_CN.messages,
    required: (field) => '请输入' + field,
    email: () => '请输入正确的邮箱格式',
    minmax: (field, args) => field + '长度要求' + args['min'] + '至' + args['max'],
    min: () => '不符合最小长度要求',
    // length: (field, args) => field + '长度要求' + args,
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '账号',
    username: '账号',
    code: '验证码',
    oldpassword: '旧密码',
    title: '标题',
    catalog: '分类',
  },
  fields: {
    password: {
      confirmed: (field, { target }) => {
        return `两次输入的${field}不一致`
      },
    },
    catalog: {
      is_not: '请选择{_field_}',
    },
  },
}

localize('zh-CN', dictionary)
// export default dictionary

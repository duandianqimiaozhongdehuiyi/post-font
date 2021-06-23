/* eslint-disable prettier/prettier */
/*
 * @Author: your name
 * @Date: 2021-02-04 10:10:55
 * @LastEditTime: 2021-02-05 17:42:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\i18n.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import ar from 'vee-validate/dist/locale/ar.json'
// import en from 'vee-validate/dist/locale/en.json'
import { extend } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
import validationMessages from 'vee-validate/dist/locale/en'

Vue.use(VueI18n)

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
})
console.log(zh_CN.messages)
const messages = {
  ...zh_CN.messages,
  required: '请输入{_field_}',
  email: '请输入正确的邮箱格式',
  minmax: '{_field_}长度要求{min}至{max}',
  // min: () => '不符合最小长度要求',
  // length: '{_field_}长度要求{length}',
}

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: {
      fields: {
        email: '邮箱',
        password: '密码',
        repassword: '密码',
        name: '昵称',
        username: '账号',
        code: '验证码',
      },
      // validation: zh_CN.messages,
      validation: messages,
    },
  },
})

export { i18n }

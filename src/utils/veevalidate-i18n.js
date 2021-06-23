/*
 * @Author: your name
 * @Date: 2021-02-04 10:11:43
 * @LastEditTime: 2021-02-04 10:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\veevalidate-i18n.js
 */
// import { extend, configure } from 'vee-validate'
import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, configure } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import { i18n } from './i18n'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`)

    return i18n.t(`validation.${values._rule_}`, values)
  },
})

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)

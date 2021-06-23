/*
 * @Author: your name
 * @Date: 2021-03-10 15:13:43
 * @LastEditTime: 2021-03-10 17:50:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\directives.js
 */
import { escapeHtml } from '@/utils/escapeHtml'
export default {
  richtext: {
    bind: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
  },
}

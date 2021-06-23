/*
 * @Author: your name
 * @Date: 2021-02-05 11:52:43
 * @LastEditTime: 2021-02-05 15:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\alert\index.js
 */
import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue, options) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 4. 添加实例方法
  Vue.prototype.$alert = (msg) => {
    // 逻辑...
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    // 逻辑...
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    instance.success = success
    instance.cancel = cancel
  }
}

export default Alert

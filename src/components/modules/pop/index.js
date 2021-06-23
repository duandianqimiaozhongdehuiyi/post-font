/*
 * @Author: your name
 * @Date: 2021-03-02 17:58:05
 * @LastEditTime: 2021-03-02 18:02:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\pop\index.js
 */
import PopComponent from './Pop.vue'

const Pop = {}
Pop.install = (Vue) => {
  // 注册Pop组件
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 添加实例方法，以供全局进行调用
  Vue.prototype.$pop = (type, msg) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default Pop

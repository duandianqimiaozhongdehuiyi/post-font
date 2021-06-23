/*
 * @Author: your name
 * @Date: 2020-11-26 15:09:41
 * @LastEditTime: 2021-03-10 15:19:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/utils/filter'
import directives from '@/utils/directives'

// import axios from 'axios'
import './utils/vee-validate.js'
// import { i18n } from './utils/i18n'
// import './utils/veevalidate-i18n'

import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert)
Vue.use(Pop)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false
// axios.defaults.baseURL =
//   process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://your.domain.com'

new Vue({
  // i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

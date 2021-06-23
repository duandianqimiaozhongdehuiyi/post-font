/*
 * @Author: your name
 * @Date: 2021-02-04 14:18:08
 * @LastEditTime: 2021-03-10 17:24:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: localStorage.getItem('sid'),
    isLogin: localStorage.getItem('isLogin'),
    token: '',
    userInfo: localStorage.getItem('userInfo'),
  },
  mutations: {
    setSid(state, value) {
      state.sid = value
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setIsLogin(state, value) {
      state.isLogin = value
      localStorage.setItem('isLogin', value)
    },
    setUserInfo(state, value) {
      if (value === '') {
        return
      }
      localStorage.setItem('userInfo', JSON.stringify(value))
      state.userInfo = value
    },
  },
})

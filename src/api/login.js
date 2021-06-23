/*
 * @Author: your name
 * @Date: 2020-11-30 14:29:50
 * @LastEditTime: 2021-02-07 11:24:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\login.js
 */
import axios from '@/utils/request'

/**
 *
 * @param {验证码} sid
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid,
    },
  })
}
/**
 *
 * @param {忘记密码} option
 */
const forget = (option) => {
  return axios.post('/login/forget', {
    ...option,
  })
}
/**
 *
 * @param {登录接口} loginInfo
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo,
  })
}
/**
 *
 * @param {注册接口} regInfo
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo,
  })
}

export { getCode, forget, login, reg }

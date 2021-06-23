/*
 * @Author: your name
 * @Date: 2021-02-04 13:42:33
 * @LastEditTime: 2021-02-04 13:48:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\request.js
 */
import HttpRequest from './axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod

const axios = new HttpRequest(baseUrl)

export default axios

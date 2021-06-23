/*
 * @Author: your name
 * @Date: 2021-02-04 11:10:40
 * @LastEditTime: 2021-03-03 17:35:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\utils\axios.js
 */
import axios from 'axios'
import errorHandle from './errorHandle'
import store from '@/store'
import publicConfig from '@/config'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.pending = {}
  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      headers: {
        // 'Content-Type': 'application/json;charset=utf-8',
        // Authorization: 'Bearer ' + store.state.token,
      },
      timeout: 1000 * 60,
    }
    return config
  }
  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }
  // 设定拦截器
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        let isPublic = false
        publicConfig.publicPath.map((path) => {
          isPublic = isPublic || path.test(config.url)
        })
        const token = store.state.token
        if (!isPublic && token) {
          config.headers.Authorization = 'Bearer ' + token
        }
        let key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c) => {
          this.pending[key] = c
        })
        return config
      },
      (error) => {
        // 对请求错误做些什么
        errorHandle(error)
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (response) => {
        // 对响应数据做点什么
        let key = response.config.url + '&' + response.config.method
        this.removePending(key)
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      (error) => {
        // 对响应错误做点什么
        errorHandle(error)
        return Promise.reject(error)
      },
    )
  }
  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions) // 相当于instance.request(newOptions)
  }
  get(url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url,
      },
      config,
    )
    return this.request(options)
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data,
    })
  }
}

// const instance = axios.create({
//   baseURL: process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//   },
//   timeout: 10000,
// })

// // 添加请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做些什么
//     return config
//   },
//   (error) => {
//     // 对请求错误做些什么
//     errorHandle(error)
//     return Promise.reject(error)
//   },
// )

// // 添加响应拦截器
// instance.interceptors.response.use(
//   (response) => {
//     // 对响应数据做点什么
//     if (response.status === 200) {
//       return Promise.resolve(response.data)
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   (error) => {
//     // 对响应错误做点什么
//     errorHandle(error)
//     return Promise.reject(error)
//   },
// )

export default HttpRequest

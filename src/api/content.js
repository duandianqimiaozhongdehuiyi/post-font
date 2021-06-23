/*
 * @Author: your name
 * @Date: 2021-02-24 10:46:56
 * @LastEditTime: 2021-03-11 15:56:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\contents.js
 */
import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

/**
 * 文章列表
 * @param {Object} options
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
/**
 * 温馨提醒
 *
 */
const getTips = () => {
  return axios.get('/public/tips')
}
/**
 * 友情链接
 *
 */
const getLinks = () => {
  return axios.get('/public/links')
}
/**
 * 本周热议
 *
 */
const getTop = () => {
  return axios.get('/public/topWeek')
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
 * 图片上传接口
 */
const uploadImg = (formData) => {
  return axios.post('/content/upload', formData)
}

/**
 * 发帖请求
 */
const addPost = (data) => {
  return axios.post('/content/add', {
    ...data,
  })
}

// 获取文章详情
const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token,
      },
    }
  }
  return axios.get('/public/detail?tid=' + tid, headers)
}

// 编辑帖子，更新文章
const updatePost = (data) => {
  return axios.post('/content/update', {
    ...data,
  })
}

export { getList, getTips, getLinks, getTop, uploadImg, addPost, getDetail, updatePost }

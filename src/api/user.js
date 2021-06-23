/*
 * @Author: your name
 * @Date: 2021-03-02 17:06:55
 * @LastEditTime: 2021-03-12 14:23:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\user.js
 */
import axios from '@/utils/request'
import qs from 'qs'
/**
 * 用户签到
 *
 */
const userSign = () => {
  // const headers = {
  //   Authorization: 'Bearer ' + store.state.token,
  //   'Content-Type': 'application/json',
  // }
  return axios.get('/user/fav', {
    // headers,
  })
}

/**
 *更新资料
 * @param {} option
 */
const updateUserInfo = (data) => {
  return axios.post('/user/basic', {
    ...data,
  })
}

/**
 * 修改用户密码
 * @param {*} data
 */
const changePassword = (data) => {
  return axios.post('/user/change-password', {
    ...data,
  })
}

/**
 * 设置/取消收藏
 */
const addCollect = (data) => {
  return axios.get('/user/set-collect?' + qs.stringify(data))
}

/**
 * 获取收藏列表
 */
const getCollect = (data) => {
  return axios.get('/user/collect?' + qs.stringify(data))
}
/**
 * 获取发表的文章列表
 */
const getPostListByUid = (data) => {
  return axios.get('/user/post?' + qs.stringify(data))
}

/**
 * 删除指定文章
 */
const deletePostByUid = (data) => {
  return axios.get('/user/delete-post?' + qs.stringify(data))
}
// 获取用户的基本信息
const getInfo = (data) => {
  return axios.get('/public/info?' + qs.stringify(data))
}

// 获取用户最近评论列表
const getCommentList = (data) => axios.get('/public/latestComment?' + qs.stringify(data))

// 获取用户未读消息
const getMsg = (data) => axios.get('/user/getmsg?' + qs.stringify(data))

// 设置用户未读消息
const setMsg = (data) => axios.get('/user/setmsg?' + qs.stringify(data))

export {
  userSign,
  updateUserInfo,
  changePassword,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo,
  getCommentList,
  getMsg,
  setMsg,
}

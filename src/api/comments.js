/*
 * @Author: your name
 * @Date: 2021-03-09 17:46:13
 * @LastEditTime: 2021-03-11 11:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\comments.js
 */
import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 获取文章中的评论列表
const getComments = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token,
      },
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}
// 添加评论
const addComment = (data) => {
  return axios.post('/comments/reply', { ...data })
}
// 更新评论
const updateComment = (data) => {
  return axios.post('/comments/update', { ...data })
}

// 采纳最佳评论
const setCommentBest = (params) => {
  return axios.get('/comments/accept?' + qs.stringify(params))
}

// 设置点赞
const setHands = (params) => {
  return axios.get('/comments/hands?' + qs.stringify(params))
}

export { getComments, addComment, updateComment, setCommentBest, setHands }

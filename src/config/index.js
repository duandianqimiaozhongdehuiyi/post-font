/*
 * @Author: your name
 * @Date: 2021-02-04 11:32:49
 * @LastEditTime: 2021-03-03 11:17:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\config\index.js
 */
export default {
  baseURL: {
    dev: 'http://localhost:3000',
    prod: 'http://localhost:3000',
  },
  publicPath: [/^\/public/, /^\/login/],
}

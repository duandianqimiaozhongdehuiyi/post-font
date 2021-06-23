/*
 * @Author: your name
 * @Date: 2020-11-26 15:34:26
 * @LastEditTime: 2020-11-26 15:49:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['prettier', 'prettier/vue', 'plugin:prettier/recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}

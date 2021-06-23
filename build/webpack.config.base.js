/*
 * @Author: your name
 * @Date: 2020-11-27 14:13:10
 * @LastEditTime: 2020-11-30 11:02:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\build\webpack.config.base.js
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const createVueLoaderOptions = require("./vue-loader.config.js");
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    //输出文件名,开发环境不能使用chunkhash，正式环境中需要进行一个修改
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: createVueLoaderOptions(isDev),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //   exclude: /node_modules/
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.(jpg|gif|jpeg|png|svg)$/,
        use: [
          {
            // 将图片转化成base64的代码，直接卸载js内容里而不用生成新的文件，减少http请求
            loader: 'url-loader',
            // 还可以指定输出的文件名字
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: 'font/',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
    ],
  },
}

module.exports = config

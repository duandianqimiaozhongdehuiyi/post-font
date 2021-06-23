const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
// 只在生产环境用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.config.base.js')
let config
const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  // 热加载,改了一个组件的某部分则只渲染这个组件的这个部分
  hot: true,
  // histroryFallback: {

  // }
  // 每次都自动打开浏览器页面
  // open: true
}
const defaultPlugins = [
  new HTMLPlugin({
    // 生成html页面会根据这个模板生成
    template: path.join(__dirname, '../public/index.html'),
  }),
  new webpack.DefinePlugin({
    'process.env': isDev ? '"development"' : '"production"',
  }),
]
if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          // css-loader会解析css文件，合并成一段css代码
          // style-loader：在得到css-loader生成的css内容后，style-loader会把它挂到页面的head部分
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss?$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // 配置使用stylus-loader,会生成sourcemap,postcss-loader自己也会生成sourcemap,
                // 当有一个处理器生成了sourcemap后,postcss-loader可以帮我们直接使用前面生成的sourcemap,提高编译效率
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    // source-map可以映射代码跟编译代码之后代码的关系,但是效率比较低,文件比较大,导致webpack编译比较慢
    // eval会出现混乱的情况
    // 下面是webpack官方推荐的映射工具,效率比较高,准确性也比较高
    devtool: 'eval-cheap-module-source-map',
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      //   new webpack.NoEmitOnErrorsPlugin(),
    ]),
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../src/main.js'),
      vendor: ['vue'],
    },
    output: {
      filename: "[name].[chunkhash:8].js'",
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // false则使用commonjs语法，true则使用es语法
                esModule: true,
              },
            },
            'css-loader',
            'postcss-loader',
            'stylus-loader',
          ],
        },
      ],
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'styles.[contentHash:8].css',
      }),
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          // 这里开始设置缓存的 chunks
          commons: {
            chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            minSize: 0, // 最小尺寸，默认0,
            minChunks: 2, // 最小 chunk ，默认1
            maxInitialRequests: 5, // 最大初始化请求书，默认1
          },
          vendor: {
            test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
            chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
            priority: 10, // 缓存组优先级
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },
  })
}

module.exports = config

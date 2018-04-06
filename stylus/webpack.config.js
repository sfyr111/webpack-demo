var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    // chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertInto: '#app', // 插入元素
              singleton: true, // 使用 一个style 标签
              transform: './css.transform.js', // transform 函数, 浏览器环境下 loader 插入HTML时运行
            }
            // loader: 'style-loader/url' // style-loader/url 不常用
            // loader: 'style-loader/useable' // style-loader/useable 可控
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true, // 压缩
              modules: true, // css-module
              localIdentName: '[path][name]_[local]_[hash:base64:5]', // css-module 命名
            }
            // loader: 'file-loader' // style-loader/url 不常用
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  },

  plugins: []
}
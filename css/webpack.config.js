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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertInto: '#app', // 插入元素
              singleton: true, // 使用 一个style 标签
              transform: './css.transform.js', // transform 函数, 浏览器环境下 loader 插入HTML时运行
            }
            // loader: 'style-loader/url' // style-loader/url 不常用
            // loader: 'style-loader/useable' // style-loader/useable 可控
          },
          {
            loader: 'css-loader'
            // loader: 'file-loader' // style-loader/url 不常用
          }
        ]
      }
    ]
  },

  plugins: []
}
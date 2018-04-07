var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     publicPath: '',
          //     outputPath: 'dist/',
          //     useRelativePath: true
          //   }
          // },
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 小于 value 时 base64
              publicPath: '',
              outputPath: 'dist/',
              useRelativePath: true
            }
          },
          // 压缩图片
          {
            loader: 'img-loader',
            options: {
              pngquant: {
                quality: 80
              }
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true, // 使用 一个style 标签
              transform: './css.transform.js', // transform 函数, 浏览器环境下 loader 插入HTML时运行
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true, // 压缩
                // modules: true, // css-module
                // localIdentName: '[path][name]_[local]_[hash:base64:5]', // css-module 命名
              }
              // loader: 'file-loader' // style-loader/url 不常用
            },
            {
              loader: 'stylus-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({ // 和css-module 冲突
      filename: '[name].min.css', // 提取的css
      allChunks: false, // 提取css 的范围, 默认false 提取初始化的
    })
  ]
}
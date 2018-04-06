var Webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true, // 使用 一个style 标签
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true, // 压缩
                modules: true, // css-module
                localIdentName: '[path][name]_[local]_[hash:base64:5]', // css-module 命名
              }
              // loader: 'file-loader' // style-loader/url 不常用
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // require('autoprefixer')(),
                  require('postcss-cssnext')()
                ]
              }
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
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', // 提取的css
      allChunks: false, // 提取css 的范围, 默认false 提取初始化的
    }),
    new Webpack.optimize.UglifyJsPlugin() // js tree-shaking
  ]
}
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
            // loader: 'style-loader'
            // loader: 'style-loader/url' // style-loader/url 不常用
            loader: 'style-loader/useable' // style-loader/url 不常用
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
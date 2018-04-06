var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'page1': './src/page1',
    'page2': './src/page2',
    'vendor': ['lodash']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common', // 异步
      children: true, // 两个页面下的子依赖
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
  ]
}
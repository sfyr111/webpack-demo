const webpack = require('webpack')
const PurifyWebpack = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

const path = require('path')
const glob = require('glob-all')

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    new PurifyWebpack({
      paths: glob.sync([
        './*.html',
        './src/*.js'
      ])
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HtmlInlinkChunkPlugin({
      inlineChunks: ['manifest']
    })
  ]
}

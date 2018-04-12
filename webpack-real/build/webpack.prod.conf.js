const webpack = require('webpack')
const PurifyWebpack = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')
const glob = require('glob-all')

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(), // 打包分析
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

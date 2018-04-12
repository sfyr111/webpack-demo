const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

const baseConfig = {
  entry: {
    react: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash:5].css'
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks: Infinity
    })
  ]
}

const generatePage = ({
  title = '',
  entry = '',
  template = './src/index.html',
  name = '',
  chunks = []
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      title,
      chunks,
      template,
      filename: name + '.html'
    })
  ]
})

const pages = [
  generatePage({
    title: 'pageA',
    entry: {
      a: './src/pages/a.js'
    },
    name: 'a',
    chunks: ['react', 'a']
  }),
  generatePage({
    title: 'pageB',
    entry: {
      b: './src/pages/b.js'
    },
    name: 'b',
    chunks: ['react', 'b']
  }),
  generatePage({
    title: 'pageC',
    entry: {
      c: './src/pages/c.js'
    },
    name: 'c',
    chunks: ['react', 'c']
  }),
]

module.exports = merge([baseConfig].concat(pages))
var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // '/' 开http-sever
    filename: 'js/[name]-bundle-[hash:5].js',
    // chunkFilename: '[name].chunk.js'
  },

  // js 的source-map
  devtool: 'cheap-module-source-map', // source-map, cheap-module-source-map. eval

  // webpack-dev-server 配置
  devServer: {
    port: 9001,
    overlay: true, // eslint 浏览器中开启
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true, // 改变host
        logLevel: 'debug', // 控制台打印
        headers: {
          'Cookie': 'abc=123',
          'x-cc': 'a',
        }
      }
    },
    hot: true, // 模块热更新
    hotOnly: true, // 不通过刷新页面热更新
    historyApiFallback: { // true
      rewrites: [
        {
          // pages/a => pages/a.html
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function (context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    }
    // inline: false // 打包状态
  },

  resolve: {
    alias: {
      // 本地第三方库打包
      jquery$: path.resolve(__dirname, 'src/libs/js/jquery.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'src/libs')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
          // {
          //   loader: 'eslint-loader',
          //   options: {
          //     formatter: require('eslint-friendly-formatter')
          //   }
          // }
        ]
      },
      {
        test: /\.(eot|woff2?|woff|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 5000, 
              publicPath: '',
              // outputPath: 'dist/',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 1000, // 小于 value 时 base64
              publicPath: '',
              outputPath: 'dist/assets/image/',
              // useRelativePath: true
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
        // 模块热更新不用 ExtractTextWebpackPlugin.extract
        // use: ExtractTextWebpackPlugin.extract({
        //   fallback: {
        //     loader: 'style-loader',
        //     options: {
        //       singleton: true, // 使用 一个style 标签
        //       transform: './css.transform.js', // transform 函数, 浏览器环境下 loader 插入HTML时运行
        //     }
        //   },
        use: [
          {
            // 热更新使用
            loader: 'style-loader',
            options: {
              // singleton: true, // 使用 一个style 标签 和source-map 冲突
              transform: './css.transform.js', // transform 函数, 浏览器环境下 loader 插入HTML时运行
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
              // minimize: true, // 压缩
              // modules: true, // css-module
              // localIdentName: '[path][name]_[local]_[hash:base64:5]', // css-module 命名
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
        // })
      },
      // imports 注入第三方模块
      // {
      //   test: path.resolve(__dirname, 'src/app.js'),
      //   use: [
      //     {
      //       loader: 'imports-loader',
      //       options: {
      //         $: 'jquery',
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({ // 和css-module 冲突
      filename: 'css/[name]-bundle-[hash:5].css', // 提取的css
      allChunks: false // 提取css 的范围, 默认false 提取初始化的
      
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html', // 指定模板
      // chunks: ['app'], // 指定入口
      minify: {
        // collapseWhitespace: true
      }
      // inject: false, // 自动生成注入资源
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HtmlInlinkChunkPlugin({
      inlineChunks: ['manifest']
    }),
    new CleanWebpackPlugin(['dist']),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 第三方全局模块注入 $
    new webpack.ProvidePlugin({
      $: 'jquery' // node_modules 本地文件用 reslove alias
    })
  ]
}

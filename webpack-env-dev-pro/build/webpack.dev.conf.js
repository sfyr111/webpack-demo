const webpack = require('webpack')

module.exports = {
  // js 的source-map
  devtool: 'cheap-module-source-map', // source-map, cheap-module-source-map. eval

  // webpack-dev-server 配置
  devServer: {
    port: 9001,
    overlay: true, // eslint 浏览器中开启
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {"^/api" : ""},
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
  
  plugins: [
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
## 分析打包结果
offical analyse tool
webpack-bundle-analyzer
```
webpack --profile --json > stats.json
```
plugin: BundleAnalyzerPlugin
cmd: webpack-bundle-analyzer stats.json

## 优化打包速度
### 方法一
+ 分开 vendor 和 app
+ DllPlugin
+ DllReferencePlugin

### 方法二
+ UglifyJsPlugin
  + parallel
  + cache

### 方法三
+ HappyPack
+ HappyPack.ThreadPool

### 方法四
+ babel-loader
  + options.cacheDirectory
  + include
  + exclude

### 其他
+ 减少resolve
+ Devtool: 去除 sourcemap
+ cache-loader
+ 升级 node webpack

## 长缓存优化
+ 场景
  + 改变 app 代码
  + 改变 vendor 

+ 解决
  + 提取 vendor
  + hash -> chunkhash
  + 提取 webpack runtime

+ 解决引入新模块、模块顺序变化, vendor hash 变化
  + NamedChunksPlugin
  + NamedModulesPlugin

+ 总结
  + 独立打包 vendor Common
  + 抽离 manifest (webpack runtime) Common
  + 使用 NamedChunksPlugin 
  + 使用 NamedModulesPlugin
  + 动态模块给定 模块名称
  ```
  import(/* webpackChunkName: 'async' */'./async').then(() => // ...)
  ```

## 多页面应用
+ 多入口 entry
+ 多页面 html
+ 每个页面不同的 chunk
+ 每个页面不同的参数

### 多页面多配置
+ webpack 3.1.0
+ parallel-webpack (提高打包速度)

#### 特点 
+ parallel-webpack 提高打包速度
+ 配置独立灵活
+ 不能多页面共享代码(缺点)

#### parallel-webpack 
+ parallel-webpack --watch
+ parallel-webpack --config

### 多页面单配置
+ 可以共享各个 entry 之间的公用代码
+ 打包速度慢
+ 输出的内容比较复杂
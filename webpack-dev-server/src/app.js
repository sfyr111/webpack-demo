/**
 * css-module
 */
import base from './css/base.styl'
import common from './css/common.styl'

console.log($);

var host = 'https://api.github.com'
var url = '/api/users/sfyr111'

$.get(url, {}, function(data) {
  console.log(data);
})

// js配合模块热更新代码 // vue-hot-loader react-hot-loader
if (module.hot) {
  // module.hot.accept('./component/a', function() {
    // 删除之前的dom 
    // let ComponentA = require('./component/a')
    // 重新require 进来进行操作逻辑
    // ...
  // })
  module.hot.accept()
}
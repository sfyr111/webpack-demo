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
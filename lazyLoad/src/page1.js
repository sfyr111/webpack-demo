// require.include('./module1') // 和page1 打包到一起

import * as _ from 'lodash'

var page = 'subPage1'

if (page === 'subPage1') require.ensure(['./subPage1'], function() {
  var subPage1 = require('./subPage1')
}, 'subPage1')
else require.ensure(['./subPage2'], function() {
  var subPage1 = require('./subPage2')
}, 'subPage2')

export default 'page1'
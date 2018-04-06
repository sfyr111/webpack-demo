// require.include('./module1') // 和page2 打包到一起

import * as _ from 'lodash'

var page = 'subPage1'

if (page === 'subPage1') {
  import(/* webpackChunkName: 'subPage1' */'./subPage1')
    .then(subPage1 => console.log(subPage1))
}
else {
  import(/* webpackChunkName: 'subPage2' */'./subPage2')
    .then(subPage1 => console.log(subPage2))
}

// require.ensure(['lodash'], function() {
//   var _ = require('lodash')
//   _.join([1, 2], 3)
// }, 'vendor')

export default 'page1'
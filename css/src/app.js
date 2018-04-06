/**
 * style-loader 
 * style-loader/url
 */
// import './css/base.css'
// import './css/common.css'

/**
 * style-loader/useable
 */
// import base from './css/base.css'
// import common from './css/common.css'

// base.use()
// base.unuse()

// var flag = false

// setInterval(() => {
//   if (flag) base.unuse()
//   else base.use()
//   flag = !flag
// }, 500)

/**
 * css-module
 */
import base from './css/base.css'
import common from './css/common.css'

var app = document.getElementById('app')
app.innerHTML = `<div class="${base.wrapper}"></div>`
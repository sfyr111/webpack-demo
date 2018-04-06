/**
 * css-module
 */
import base from './css/base.styl'
import common from './css/common.styl'

var app = document.getElementById('app')
app.innerHTML = '<div class="' + base.wrapper +  '"></div>'

import { a } from './common/util'
console.log(a())

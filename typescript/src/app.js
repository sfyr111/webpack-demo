"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
_.chunk([1, 2, 3, 4, 5], 3);
var n = 4;
function touchCat(cat) {
    console.log('mmm', cat.name);
}
touchCat({
    name: 'hhh',
    sex: 'mmm'
});

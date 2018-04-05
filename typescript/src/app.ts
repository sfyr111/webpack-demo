import * as _ from 'lodash'

console.log(_.chunk([1, 2, 3, 4, 5], 2));

const n = 4

interface Cat {
  name: String,
  sex: String
}

function touchCat(cat: Cat) {
  console.log('mmm', cat.name)
}

touchCat({
  name: 'hhh',
  sex: 'mmm'
})
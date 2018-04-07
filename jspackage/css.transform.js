module.exports = function (css) {
  console.log(css);
  console.log(window.innerWidth)

  if (window.innerWidth >= 760) {
    return css.replace('blue', 'yellow')
  } else {
    return css.replace('blue', 'red')
  }

}
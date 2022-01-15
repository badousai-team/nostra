const rimraf = require('rimraf')
const webpack = require('webpack')

const task = require('./task')

global.DEBUG = false

// Bundle JavaScript, CSS and image files with Webpack
const bundle = task('bundle', () => {
  const webpackConfig = require('../webpack.config')
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        console.log(err)
        reject(err)
      } else if (stats.hasErrors()) {
        const info = stats.toJson()
        console.log(info.errors)
        reject(new Error(info.errors))
      } else {
        console.log(stats.toString(webpackConfig.stats))
        resolve()
      }
    })
  })
})

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
module.exports = task('build', () => {
  rimraf.sync('dist/*', { nosort: true, dot: true })
  return Promise.resolve()
    .then(bundle)
})

'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    fs.readdirSync('dist/').filter(o => /\.html$/.test(o)).forEach(filename => {
      let target = 'dist/' + filename;
      let html = fs.readFileSync(target, 'utf8')
      fs.writeFileSync(target, html.replace(/\/static\//g, 'static/'))
    })

    fs.readdirSync('dist/static/js/').filter(o => /\.js$/.test(o)).forEach(filename => {
      let target = 'dist/static/js/' + filename;
      let js = fs.readFileSync(target, 'utf8')
      fs.writeFileSync(target, js.replace(/\/static\/assets/g, 'static/assets'))
    })

    fs.readdirSync('dist/static/css/').forEach(filename => {
      let target = 'dist/static/css/' + filename
      let css = fs.readFileSync('dist/static/css/' + filename, 'utf8')
      fs.writeFileSync(target, css.replace(/\/static\/assets/g, '../assets'))
    })

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

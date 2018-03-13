const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const mockfrom = 'src/mock/'
const mockto = 'public/mockData/'
const log = console.log

function requireCode (filename) {
  let code = fs.readFileSync(path.resolve(mockfrom, filename))
  let module = { exports: {} }
  new Function('module', 'exports', code)(module, module.exports)
  return module.exports
}

function run (filename = '', isinit) {
  try {
    const c = requireCode(filename)
    fs.writeFileSync(path.resolve(mockto, filename.replace('.js', '.json')), JSON.stringify(c))
    if (!isinit) {
      log(chalk.bgBlue.bold(' COMPLATE '))
      log('\n')
      log(chalk.bgGreen.bold(' WATCHING '))
    }
  } catch (e) {
    log(chalk.bgRed.bold(' ERROR '))
    log('\n')
    console.log(e)
    log('\n')
    log(chalk.bgGreen.bold(' WATCHING '))
  }
}

function init () {
  let files = fs.readdirSync(mockfrom, 'utf-8')
  files.forEach(o => run(o, true))

  log(chalk.bgGreen.bold(' WATCHING '))

  let timer
  fs.watch(mockfrom, (event, filename) => {
    clearTimeout(timer)
    timer = setTimeout(() => run(filename), 1000)
  })
}

init()

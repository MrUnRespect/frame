var ora = require('ora')
var chalk = require('chalk')
var fs = require('fs')
stat = fs.statSync

var clear = () => {
  process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
}
var todo = (txt) => {
  let spinner = ora(chalk.blue.bold(` ${txt} `)).start()
  return {
    success (t) {
      spinner.succeed([t || 'success'])
    },
    fail (t) {
      spinner.fail([t || 'fail'])
    }
  }
}

var readline = done => {
  process.stdout.write('Please print out the path you want to save (default save to d:/generate/): ')
  process.stdin.once('data', (dist) => {
    let savePath = dist.toString('utf-8').replace(/\r\n/ig, '')
    if (/^[a - zA - Z]:(((\\(?! )[^/:*?<>\""|\\]+)+\\?)|(\\)?)\s*$"/.test(savePath) || savePath === '') {
      done(savePath || 'd:/generate')
    } else {
      readdir(done)
    }
  })
}

var copy = function (src, dst) {
  let paths = fs.readdirSync(src)
  paths.forEach(function (path) {
    var _src = src + '/' + path,
      _dst = dst + '/' + path,
      readable, writable
    var st = stat(_src)
    if (st.isFile()) {
      readable = fs.createReadStream(_src)
      writable = fs.createWriteStream(_dst)
      readable.pipe(writable)
    } else if (st.isDirectory()) {
      exists(_src, _dst, copy)
    }
  })
}
var exists = function (src, dst, callback) {
  if (fs.existsSync(dst)) {
    callback(src, dst)
  } else {
    fs.mkdir(dst, function () {
      callback(src, dst)
    })
  }
}

clear()
readline(function (savePath) {
  let spinner = todo(' Copy file to path ... ')
  exists('./viewsource', savePath, copy)
  spinner.success(' copy file success !')
  process.exit()
})

// file.walkSync('src', (a, dirPath, dirs, files) => console.log(files))

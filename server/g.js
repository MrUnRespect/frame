var fs = require('fs')
var path = require('path')
var stat = fs.statSync
var walkfiles = require('walkfiles')
var Zip = require('node-native-zip')
var { spawn } = require('child_process')

function camelCase (str) {
  return str.replace('@', 'default-').replace(/\-([^\-])/g, function (m, m1) { return m1.toLocaleUpperCase() })
}
function wideTraversal (selectNode) {
  var nodes = []
  if (selectNode != null) {
    var queue = []
    queue.unshift(selectNode)
    while (queue.length !== 0) {
      var item = queue.shift()
      nodes.push(item)
      var children = item.children || []
      for (var i = 0; i < children.length; i++) { queue.push(children[i]) }
    }
  }
  return nodes
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
    fs.mkdirSync(dst)
    callback(src, dst)
  }
}

var mkdir = function (root, dist, todo) {
  let dists = dist.split('/')
  let dir = dists.shift()
  while ((dir = dists.shift()) && dir.indexOf('.') === -1) {
    if (!fs.existsSync(path.join(root, dir))) {
      fs.mkdirSync(path.join(root, dir))
    }
    root = path.join(root, dir)
  }
  todo(root)
}

function runCode (code) {
  let module = { exports: {} }
  new Function('module', 'exports', 'module.exports  = ' + code)(module, module.exports)
  return module.exports
}

function run (resolve, reject, req, res, data, file) {
  let state = fs.readFileSync(path.join(__dirname, `../db/${req.params.filename}.json`), { encoding: 'utf-8' })
  let resource = runCode(state)
  var savepath = path.join(__dirname, '../', 'view-source', req.params.filename)

  let g = function () {
    // 拷贝文件
    exists('./view-source-template', savepath, copy)
    // 生成state.json
    fs.writeFileSync(path.join(savepath, 'db/state.json'), state)
    // 生成conf.json
    data.name = req.params.filename
    fs.writeFileSync(path.join(savepath, 'public/config.json'), data)
    // 生成state.js
    fs.writeFileSync(path.join(savepath, 'src/store/state.js'), `export default ${state}`)
    // 生成预览图
    if (file) fs.writeFileSync(path.join(savepath, 'public/snapshot.bmp'), file.buffer)
    // 生成install.js
    let list = wideTraversal(resource).filter(o => !/layout-/ig.test(o.frame || o.name))
    let install = []
    for (let i = 0; i < list.length; i++) {
      let component = list[i]
      let componentName = component.frame || component.name
      let type = component.type
      if (install.findIndex(o => o.name === componentName) === -1) {
        if (!type && component.frame) {
          install.push({
            name: componentName,
            component: `import ${camelCase(componentName)} from '../src/template/frames/${componentName}/index'`,
            from: path.join(__dirname, `../src/template/frames/${componentName.replace('default-', '@')}`),
            to: path.join(savepath, `src/template/frames/${componentName.replace('default-', '@')}`),
            register: `let ${camelCase(componentName)}Mixin = settingMixin(${camelCase(componentName)}.setting)\n${camelCase(componentName)}.mixins = [${camelCase(componentName)}Mixin, dataMixin]\nVue.component('${componentName.replace('@', 'default-')}', ${camelCase(componentName)})`
          })
        } else if (type && type === 'box') {
          install.push({
            name: componentName,
            component: `import ${camelCase(componentName)} from '../src/template/boxs/${componentName.replace('default-', '@')}/index'`,
            from: path.join(__dirname, `../src/template/boxs/${componentName.replace('default-', '@')}`),
            to: path.join(savepath, `src/template/boxs/${componentName.replace('default-', '@')}`),
            register: `let ${camelCase(componentName)}Mixin = settingMixin(${camelCase(componentName)}.setting)\n${camelCase(componentName)}.mixins = [${camelCase(componentName)}Mixin, dataMixin, boxMixin]\nVue.component('${componentName.replace('@', 'default-')}', ${camelCase(componentName)})`
          })
        } else if (type === 'item') {
          install.push({
            name: componentName,
            component: `import ${camelCase(componentName)} from '../src/template/items/${componentName.replace('default-', '@')}/index'`,
            from: path.join(__dirname, `../src/template/items/${componentName.replace('default-', '@')}`),
            to: path.join(savepath, `src/template/items/${componentName.replace('default-', '@')}`),
            register: `let ${camelCase(componentName)}Mixin = settingMixin(${camelCase(componentName)}.setting)\n${camelCase(componentName)}.mixins = [${camelCase(componentName)}Mixin, dataMixin, itemMixin]\nVue.component('${componentName.replace('@', 'default-')}', ${camelCase(componentName)})`
          })
        }
      }
    }
    let installCode = `import Vue from 'vue'
import settingMixin from '@/components/common/mixins/setting-mixin/index'
import dataMixin from '@/components/common/mixins/control-mixin/data'
import boxMixin from '@/components/common/mixins/box-mixin'
import itemMixin from '@/components/common/mixins/item-mixin'\n`
    installCode += install.map(o => o.component + '\n').join('')
    installCode += install.map(o => o.register + '\n').join('')
    fs.writeFileSync(path.join(savepath, 'src/install.js'), installCode)

    // 拷贝自定义组件
    install.forEach(o => exists(o.from, o.to, copy))

    // 拷贝图片
    install.forEach(o => {
      let vue = o.from + '/index.vue'
      let content = fs.readFileSync(vue, { encoding: 'utf-8' })
      let ex, reg = /\/static\/assets\/[^\.]*?\.(png|jpg|jpeg|gif|bmp)/ig, re, wr
      while ((ex = reg.exec(content))) {
        mkdir(savepath, ex[0], () => {
          re = fs.createReadStream(path.join(__dirname, '../', ex[0]))
          wr = fs.createWriteStream(path.join(savepath, ex[0]))
          re.pipe(wr)
        })
      }
    })

    // 拷贝JSON模拟数据
    wideTraversal(resource).filter(o => o.type === 'box' && o.name === 'default-source-base').map(o => ({
      name: o.setting.sourceIndex,
      source: path.join(__dirname, `../src/mock/${o.setting.sourceIndex}.js`),
      mock: path.join(__dirname, `../public/mockData/${o.setting.sourceIndex}.json`)
    })).forEach(({ name, source, mock }) => {
      fs.createReadStream(source).pipe(fs.createWriteStream(path.join(savepath, `src/mock/${name}.js`)))
      fs.createReadStream(mock).pipe(fs.createWriteStream(path.join(savepath, `public/mockData/${name}.json`)))
    })

    setTimeout(() => {
      res.json({
        code: 1,
        message: '生成文件成功！'
      })
    })
  }

  let rmpath = function () {
    if (fs.existsSync(savepath)) {
      let bat = spawn('rm', ['-rf', savepath], {
        shell: true,
        stdio: 'inherit'
      })
      bat.on('exit', g)
    } else g()
  }

  if (fs.existsSync(savepath + '.zip')) {
    spawn('rm', [savepath + '.zip'], {
      shell: true,
      stdio: 'inherit'
    }).on('exit', rmpath)
  } else { rmpath() }
}

function exportsZIP (resolve, reject, req, res) {
  var savepath = path.join(__dirname, '../', 'view-source', req.params.filename)
  var archive = new Zip()

  let zipfiles = walkfiles(savepath).map(o => ({
    name: o.replace(savepath + '\\', ''),
    path: o
  }))

  archive.addFiles(zipfiles, function (err) {
    if (err) {
      throw err
    } else {
      var buff = archive.toBuffer()
      fs.writeFile(savepath + '.zip', buff, function () {
        res.set({
          'Content-type': 'application/octet-stream',
          'Content-Disposition': 'attachment;filename=' + encodeURI(req.params.filename + '.zip')
        })
        fReadStream = fs.createReadStream(savepath + '.zip')
        fReadStream.on('data', (chunk) => res.write(chunk, 'binary'))
        fReadStream.on('end', function () {
          res.end()
          resolve()
        })
      })
    }
  })
}

module.exports =
  {
    run (req, res, data, file) {
      return new Promise((resolve, reject) =>
        run(resolve, reject, req, res, data, file))
    },
    exportZIP (req, res) {
      return new Promise((resolve, reject) =>
        exportsZIP(resolve, reject, req, res)
      )
    }
  }

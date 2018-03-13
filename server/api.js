var router = require('express').Router()
const fs = require('fs')
const path = require('path')
const g = require('./g.js')
const multer = require('multer')

router.get('/frameTemplates', function (req, res) {
  fs.readdir('static/template/frames/', (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(Array.from(new Set(files.map(o => o.substr(0, o.lastIndexOf('.'))))))
  })
})

router.get('/boxTemplates', function (req, res) {
  fs.readdir('static/template/boxs/', (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(Array.from(new Set(files.map(o => o.substr(0, o.lastIndexOf('.'))))))
  })
})

router.get('/itemTemplates', function (req, res) {
  fs.readdir('static/template/items/', (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(Array.from(new Set(files.map(o => o.substr(0, o.lastIndexOf('.'))))))
  })
})

router.get('/files', function (req, res) {
  fs.readdir('db/', (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(Array.from(new Set(files.map(o => o.substr(0, o.lastIndexOf('.'))))).filter(o => o !== ''))
  })
})

router.get('/file/:filename', function (req, res) {
  fs.readFile(`db/${req.params.filename}.json`, (err, data) => {
    if (err) throw err
    res.json({
      data: JSON.parse(data)
    })
  })
})

router.post('/file', function (req, res, next) {
  req.setEncoding('utf8')
  var buf = ''
  req.on('data', function (chunk) { buf += chunk })
  req.on('end', function () {
    try {
      let data = JSON.parse(buf)
      let filename = path.join(__dirname, '../db/', data.filename + '.json')
      // if (fs.existsSync(filename)) {
      //   res.json({
      //     code: 0,
      //     message: '已经存在相同的文件名！'
      //   })
      //   next()
      // } else {
      fs.writeFile(filename, JSON.stringify(data.data), function (err) {
        if (err) throw err
        res.json({
          code: 1,
          message: '保存成功！'
        })
        next()
      })
      // }
    } catch (err) {
      err.body = buf
      return next(err)
    }
  })
})

var upload = multer().any()

router.post('/export/:filename', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) throw err
    g.run(req, res, req.body.conf, req.files.length === 0 ? null : req.files[0]).then(function () {
      next()
    }).catch(function (e) {
      res.json({
        code: 0,
        message: e
      })
    })
  })
})
router.get('/export/:filename', function (req, res, next) {
  g.exportZIP(req, res).then(function () {
    next()
  })
})

module.exports = router

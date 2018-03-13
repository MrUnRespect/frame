import fs from 'fs'
import path from 'path'
import merge from 'merge'
import vue from 'rollup-plugin-vue2'
import css from 'rollup-plugin-css-only'
// import stylus from 'rollup-plugin-stylus-to-css'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

let baseConfig =
  {
    output: {
      format: 'cjs'
    },
    plugins: [
      vue(),
      css(),
      buble(),
      nodeResolve({ browser: true, jsnext: true, main: true }),
      commonjs(),
      uglify()
    ]
  }
let source = 'src'
let dist = 'static'
let dirs = fs.readdirSync('src/template')
export default dirs.map(dir =>
  fs.readdirSync(`src/template/${dir}/`).map(filepath => {
    let savePath = `template/${dir}/`
    let config = merge.recursive(true, baseConfig, {
      name: filepath,
      input: path.join(__dirname, source, savePath, filepath, 'index.js'),
      output: {
        file: path.join(__dirname, dist, savePath, `${filepath}.js`)
      }
    })
    config.plugins[1] = css({ output: path.join(__dirname, dist, savePath, `${filepath}.css`) })
    return config
  })
).reduce((a, b) => a.concat(b))

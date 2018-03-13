import Vue from 'vue'
import runbyCJS from './runbyCJS'
import settingMixin from '@/components/common/mixins/setting-mixin/index'
import dataMixin from '@/components/common/mixins/control-mixin/data'
import itemMixin from '@/components/common/mixins/item-mixin'
import boxMixin from '@/components/common/mixins/box-mixin'
// const loadComponent = async function (url) {
//   let { componentName, component } = await loadComponentObject(url)
//   Vue.component(componentName, component)
//   return componentName
// }

let componentsHash = {}

const loadComponentObject = async function (url) {
  let { data } = await axios.get(url)
  let { exports: component } = runbyCJS(data)
  let componentName = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.')).replace('@', 'default-')
  return {
    componentName,
    component
  }
}

const appendStyle = function (id, str) {
  let style = document.querySelector(`#${id.replace('@', 'default-')}`)
  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }
  style.innerHTML = str
}

export const loadStyle = async function (url) {
  let { data } = await axios.get(url)
  return data
}

const loadFrameStyle = async function (name) {
  let styleStr = await loadStyle(`static/template/frames/${name}.css`)
  appendStyle('frame-css', styleStr)
}
const loadFrameComponent = async function (name) {
  let res = await loadComponentObject(`static/template/frames/${name}.js`)
  return res
}

export const loadFrame = async function (name) {
  if (!componentsHash[name]) {
    await loadFrameStyle(name)
    let { componentName, component } = await loadFrameComponent(name)
    let mixin = settingMixin(component.setting)
    component.mixins = [mixin, dataMixin]
    Vue.component(componentName, component)
    componentsHash[name] = { componentName, component }
  } else {
    await loadFrameStyle(name)
  }
  return componentsHash[name]
}

const loadItemStyle = async function (name) {
  let styleStr = await loadStyle(`static/template/items/${name}.css`)
  appendStyle(name, styleStr)
}
const loadItemComponent = async function (name) {
  let res = await loadComponentObject(`static/template/items/${name}.js`)
  return res
}

export const loadItem = async function (name) {
  if (!componentsHash[name]) {
    await loadItemStyle(name)
    let { componentName, component } = await loadItemComponent(name)
    let mixin = settingMixin(component.setting)
    component.mixins = [mixin, dataMixin, itemMixin]
    Vue.component(componentName, component)
    componentsHash[name] = { componentName, component }
  }
  return componentsHash[name]
}

const loadBoxStyle = async function (name) {
  let styleStr = await loadStyle(`static/template/boxs/${name}.css`)
  appendStyle(name, styleStr)
}
const loadBoxComponent = async function (name) {
  let res = await loadComponentObject(`static/template/boxs/${name}.js`)
  return res
}

export const loadBox = async function (name) {
  if (!componentsHash[name]) {
    await loadBoxStyle(name)
    let { componentName, component } = await loadBoxComponent(name)
    let mixin = settingMixin(component.setting)
    component.mixins = [mixin, dataMixin, boxMixin]
    Vue.component(componentName, component)
    componentsHash[name] = { componentName, component }
  }

  return componentsHash[name]
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

export const loadFile = function (name) {
  return new Promise(function (resolve, reject) {
    axios.get(`api/file/${name}`).then(function ({ data }) {
      let { data: resource } = data
      let list = wideTraversal(resource).filter(o => !/layout-/ig.test(o.frame || o.name))
      let requires = []
      for (let i = 0; i < list.length; i++) {
        let component = list[i]
        let componentName = component.frame || component.name
        let type = component.type
        if (!type && component.frame) {
          requires.push(loadFrame(componentName))
        } else if (type && type === 'box') {
          requires.push(loadBox(componentName.replace(/^default\-/, '@')))
        } else if (type === 'item') {
          requires.push(loadItem(componentName.replace(/^default\-/, '@')))
        }
      }
      Promise.all(requires).then(function () {
        resolve(resource)
      })
    })
  })
}

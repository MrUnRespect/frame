import Vue from 'vue'
import maskConstructorObject from './index.vue'

let MaskConstructor = Vue.extend(maskConstructorObject)

let mask = new MaskConstructor({
  el: document.createElement('div')
})

window.addEventListener('load', () => {
  document.body.appendChild(mask.$el)
})

export default mask

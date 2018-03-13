import { toString } from '@/common/util'
class ElementFromPoint {
  constructor () {
    this.listeners = {}
    this.except = null
    this.old = null
    window.addEventListener('load', () => this.init())
  }

  add (target) {
    this.listeners[target._uid] = target
  }

  remove (target) {
    this.listeners[target._uid] = null
    delete this.listeners[target._uid]
  }

  trigger (posX, posY, vue) {
    this.except = vue
    this.event(posX, posY)
  }

  destroyExcept () {
    this.except = null
  }

  event (posX, posY) {
    let el = this.filter(document.elementFromPoint(posX, posY))
    if (this.old !== el && el != null) {
      this.old = el
      for (let key in this.listeners) {
        let vue = this.listeners[key]
        if (vue.$el === el) {
          vue.mouseenter(this.except ? this : null)
        } else {
          vue.mouseout()
        }
      }
    }
  }

  init () {
    window.addEventListener('mousemove', ({ clientX, clientY }) => this.event(clientX, clientY))
  }

  filter (el) {
    if (el && el.className !== undefined && toString(el.className) === '[object String]') {
      do {
        if (el.className !== undefined && el.className.indexOf('control-item') > -1 && ((this.except && el !== this.except.$el) || !this.except)) {
          return el
        }
      } while (el.tagName !== undefined && el.tagName.toLocaleLowerCase() !== 'body' && (el = el.parentNode))
      return null
    }
    return null
  }
}

export default new ElementFromPoint()

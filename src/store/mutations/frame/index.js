export default {
  /**
   * 改变模板
   * 
   * @param {any} state 
   * @param {any} frameName 
   */
  toChangeFrameTemplate (state, { componentName, setting }) {
    localStorage.setItem('system-default-frame', componentName)
    state.frame = componentName
    state.setting = setting
  }
}

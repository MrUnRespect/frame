export default {
  /**
   * 改变框架设置
   * 
   * @param {any} state 
   * @param {any} size 
   */
  toChangeSetting (state, setting) {
    state.setting = setting
  },
  
  /**
   * 改变真实尺寸
   * 
   * @param {any} state 
   * @param {any} size 
   */
  toChangeRealSize (state, size) {
    state.systemSetting.realSize = size
  }
}

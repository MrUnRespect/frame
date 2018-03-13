export default {
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

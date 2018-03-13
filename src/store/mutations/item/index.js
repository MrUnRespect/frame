import Vue from 'vue'
export default {
  /**
   * 设置内容
   * 
   * @param {any} state 
   * @param {any} source 
   */
  toSetItems (state, source) {
    Vue.set(state, 'children', source || [])
  },
  /**
   * 添加基础
   * 
   * @param {any} state 
   * @param {any} baseItem 
   */
  toAddBaseItems (state, baseItem) {
    state.children.push(baseItem)
  }
}

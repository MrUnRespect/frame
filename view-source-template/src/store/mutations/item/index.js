export default {
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

import { loadFrame, loadFile } from '@/common/load-component'
import analysisSetting from '@/common/analysisSetting'
export default {
  async loadFrame ({ state, commit }, name) {
    let cname = name || state.frame
    if (name && cname === state.frame) return
    commit('toSetItems')

    let { componentName, component } = await loadFrame(cname)
    let setting = analysisSetting(component.setting)
    if (name) {
      commit('toChangeFrameTemplate', { componentName, setting })
    } else {
      commit('toChangeSetting', setting)
    }
  },
  async loadSave ({ state, commit }, filename) {
    let { frame: componentName, setting, children } = await loadFile(filename)
    commit('toChangeFrameTemplate', { componentName, setting })
    commit('toSetItems', children)
  }
}

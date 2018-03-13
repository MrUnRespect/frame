
export default function (setting) {
  let keys = Object.keys(setting)
  let res = {
    computed: {}
  }

  keys.forEach(key => {
    res.computed[key] = {
      get () {
        return this.currentValue.setting[key]
      },
      set (val) {
        this.currentValue.setting[key] = val
      }
    }
  })

  return res
}

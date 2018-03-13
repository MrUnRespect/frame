export default function (props) {
  let keys = Object.keys(props)
  let res = {}
  keys.forEach(key => {
    switch (props[key].type) {
      case Number:
      case String:
      case Boolean:
        res[key] = props[key]['default']
        break
      case Array:
      case Object:
        res[key] = props[key]['default']()
    }
  })
  return res
}

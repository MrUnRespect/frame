function wideTraversal (selectNode, excludeSelf) {
  var nodes = []
  if (selectNode != null) {
    var queue = []
    queue.unshift(selectNode)
    while (queue.length !== 0) {
      var item = queue.shift()
      nodes.push(item)
      var children = item.$children || []
      for (var i = 0; i < children.length; i++) { queue.push(children[i]) }
    }
  }
  return nodes.slice(excludeSelf ? 1 : 0)
}
export default {
  methods: {
    walkUp (condition) {
      let parent = this.$parent
      do {
        if (condition(parent)) {
          return parent
        }
      } while ((parent = parent.$parent))
    },
    walkDown (condition, excludeSelf = false) {
      return wideTraversal(this, excludeSelf).filter(condition)
    }
  }
}

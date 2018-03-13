export default {
  methods: {
    toolsResize (posX, posY) {
      let instance = this.$children[0]
      instance.$once('visible', (state) => {
        if (!state) {
          instance.trigger(posX, posY)
        }
      })
      instance.visible = false
    }
  }
}

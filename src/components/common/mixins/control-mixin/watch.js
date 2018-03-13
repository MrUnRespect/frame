export default {
  watch: {
    currentValue () {
      this.$emit('input', this.currentValue)
    }
  }
}

import Vue from 'vue'
import App from '@/main/App'
import store from '@/store'
import '@/components/common/install'
import '@/install.js'
import '@/style/index.styl'

Vue.config.productionTip = false
/* eslint-disable no-new */
let baseInstances = []
let timer
new Vue({
  el: '#app',
  data: {
    params: {}
  },
  components: { App },
  render: (h) => h(App),
  store,
  watch: {
    params: {
      deep: true,
      handler: function () {
        this.$emit('params:change')
      }
    }
  },
  methods: {
    resize() {
      clearTimeout(timer)
      timer = setTimeout(() =>
        this.$emit('resize'))
    },
    baseInstanceUpdate() {
      this.$nextTick(function () {
        for (let i = 0; i < baseInstances.length; i++) {
          baseInstances[i].setSource(i)
        }
      })
    },
    register(vueInstance) {
      baseInstances.push(vueInstance)
    },
    unregister(vueInstance) {
      for (let i = baseInstances.length - 1; i >= 0; i--) {
        if (vueInstance === baseInstances[i]) {
          baseInstances.splice(i, 1)
          break
        }
      }
    }
  }
})

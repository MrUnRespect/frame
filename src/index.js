import Vue from 'vue'
import App from '@/main/App'
import store from '@/store'
import '@/components/common/install'
import '@/style/index.styl'

Vue.config.productionTip = false
global.Vue = Vue
/* eslint-disable no-new */
let baseInstances = []
let timer
new Vue({
  el: '#app',
  data: {
    params: {},
    preview: false,
    importindex: 0,
    file: ''
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
        this.$emit('resize'), 200)
    },
    baseInstanceUpdate() {
      this.$nextTick(function () {
        for (let i = 0; i < baseInstances.length; i++) {
          baseInstances[i].setSource(i)
        }
        this.$on('frame-update')
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

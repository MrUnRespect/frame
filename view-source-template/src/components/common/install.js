import Vue from 'vue'
import layoutBase from './layout/base'
import layoutRow from './layout/row'
import layoutCol from './layout/col'
import boxContainer from './layout/box-container'
import boxInner from './layout/box-inner'
import itemContainer from './layout/item-container'
import sizeMixin from './mixins/size-mixin/index'
import propsMixin from './mixins/control-mixin/prop'
import commonMixin from './mixins/common-mixin'
import echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'
import $ from 'jquery'

global.$ = $
window.$ = $
global.jQuery = $
window.jQuery = $

global.Vue = Vue
window.Vue = Vue

global.axios = axios
window.axios = axios
Vue.axios = axios
Vue.prototype.$axios = axios

global.echarts = echarts
window.echarts = echarts
Vue.echarts = echarts
Vue.prototype.$echarts = echarts

global._ = _
window._ = _

Vue.mixin(commonMixin)
Vue.mixin(sizeMixin)
Vue.mixin(propsMixin)
Vue.component('layout-base', layoutBase)
Vue.component('layout-row', layoutRow)
Vue.component('layout-col', layoutCol)
Vue.component('box-container', boxContainer)
Vue.component('box-inner', boxInner)
Vue.component('item-container', itemContainer)

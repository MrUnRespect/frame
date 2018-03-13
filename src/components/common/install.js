import Vue from 'vue'
import vmodal from 'vue-js-modal'
import toolContainer from './container/index'

import layoutBase from './layout/base'
import layoutRow from './layout/row'
import layoutCol from './layout/col'
import boxContainer from './layout/box-container'
import boxInner from './layout/box-inner'
import itemContainer from './layout/item-container'

import mask from './mask/'

import sizeMixin from './mixins/size-mixin/index'
import propsMixin from './mixins/control-mixin/prop'
import commonMixin from './mixins/common-mixin'

import VueCodeMirror from 'vue-codemirror'
import echarts from 'echarts'
import VueScroller from 'vue-scroller'
import axios from 'axios'
import html2canvas from 'html2canvas'

import $ from 'jquery'
import _ from 'lodash'

global.$ = $ 
global.jQuery = $

global.axios = axios
Vue.axios = axios
Vue.prototype.$axios = axios

global.echarts = echarts
Vue.echarts = echarts
Vue.prototype.$echarts = echarts

global.mask = mask
Vue.mask = mask
Vue.prototype.$mask = mask

global.html2canvas = html2canvas
Vue.html2canvas = html2canvas
Vue.prototype.$html2canvas = html2canvas

global._ = _

Vue.mixin(commonMixin)
Vue.mixin(sizeMixin)
Vue.mixin(propsMixin)

Vue.use(VueScroller)
Vue.use(VueCodeMirror)
Vue.use(vmodal, { dialog: true })

Vue.component('tools-container', toolContainer)

Vue.component('layout-base', layoutBase)
Vue.component('layout-row', layoutRow)
Vue.component('layout-col', layoutCol)

Vue.component('box-container', boxContainer)
Vue.component('box-inner', boxInner)

Vue.component('item-container', itemContainer)

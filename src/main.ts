import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Draggable from 'vuedraggable'
import Listview from '@laomao800/vue-listview'

import '@/style/common.less'
import '@/style/element-ui-overwrite.less'

import App from '@/App.vue'
import store from '@/store'
import AceEditor from '@/components/AceEditor.vue'
import ButtonTypeSelect from '@/components/ButtonTypeSelect.vue'
import IconSelector from '@/components/IconSelector.vue'
import DragItem from '@/components/DragItem.vue'
import PaneTitle from '@/components/PaneTitle.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TipsBlock from '@/components/TipsBlock.vue'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(Listview)
Vue.component('Draggable', Draggable)
Vue.component('AceEditor', AceEditor)
Vue.component('ButtonTypeSelect', ButtonTypeSelect)
Vue.component('IconSelector', IconSelector)
Vue.component('DragItem', DragItem)
Vue.component('PaneTitle', PaneTitle)
Vue.component('SvgIcon', SvgIcon)
Vue.component('TipsBlock', TipsBlock)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

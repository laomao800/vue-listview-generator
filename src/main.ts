import Vue from 'vue'
import 'normalize.css'
import App from './app.vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@laomao800/vue-listview'
import Draggable from 'vuedraggable'
import DragItem from '@/views/components/drag-item.vue'
import AceEditor from '@/components/ace-editor'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Listview)
Vue.component(Draggable.name, Draggable)
Vue.component(DragItem.name, DragItem)
Vue.component(AceEditor.name, AceEditor)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

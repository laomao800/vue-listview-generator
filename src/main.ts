import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Draggable from 'vuedraggable'
import Listview from '@laomao800/vue-listview'
import App from '@/App.vue'
import store from '@/store'
import AceEditor from '@/components/AceEditor'
import DragItem from '@/views/components/DragItem.vue'

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

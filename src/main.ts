import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Draggable from 'vuedraggable'
import Listview from '@laomao800/vue-listview'
import App from '@/App.vue'
import store from '@/store'
import AceEditor from '@/components/AceEditor'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(Listview)
Vue.component('Draggable', Draggable)
Vue.component('AceEditor', AceEditor)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

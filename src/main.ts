import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Draggable from 'vuedraggable'
import Listview from '@laomao800/vue-listview'

// App base
import '@/style/common.less'
import '@/style/element-ui-overwrite.less'
import App from '@/App.vue'
import store from '@/store'

// Base components
import AceEditor from '@/components/AceEditor.vue'
import AddItemHolder from '@/components/AddItemHolder.vue'
import ButtonTypePreviewBlock from '@/components/ButtonTypePreviewBlock.vue'
import DragItem from '@/components/DragItem.vue'
import PaneTitle from '@/components/PaneTitle.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TipsBlock from '@/components/TipsBlock.vue'
import SelectOptionsEditor from '@/components/SelectOptionsEditor.vue'

// Field config components
import FieldDivider from '@/components/Fields/FieldDivider.vue'
import FieldItemBasic from '@/components/Fields/FieldItemBasic.vue'
import FieldButtonType from '@/components/Fields/FieldButtonType.vue'
import FieldIcons from '@/components/Fields/FieldIcons.vue'
import FieldInput from '@/components/Fields/FieldInput.vue'
import FieldFilterFieldType from '@/components/Fields/FieldFilterFieldType.vue'
import FieldDateType from '@/components/Fields/FieldDateType.vue'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(Listview)
Vue.component('Draggable', Draggable)
Vue.component('AceEditor', AceEditor)
Vue.component('AddItemHolder', AddItemHolder)
Vue.component('ButtonTypePreviewBlock', ButtonTypePreviewBlock)
Vue.component('DragItem', DragItem)
Vue.component('PaneTitle', PaneTitle)
Vue.component('SvgIcon', SvgIcon)
Vue.component('TipsBlock', TipsBlock)
Vue.component('SelectOptionsEditor', SelectOptionsEditor)
Vue.component('FieldDivider', FieldDivider)
Vue.component('FieldItemBasic', FieldItemBasic)
Vue.component('FieldButtonType', FieldButtonType)
Vue.component('FieldIcons', FieldIcons)
Vue.component('FieldInput', FieldInput)
Vue.component('FieldFilterFieldType', FieldFilterFieldType)
Vue.component('FieldDateType', FieldDateType)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

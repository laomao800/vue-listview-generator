import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import localforage from 'localforage'

// App base
import '@/style/common.less'
import '@/style/element-ui-overwrite.less'
import App from '@/App.vue'
import store from '@/store'

// Base components
import MonacoEditor from '@/components/MonacoEditor.vue'
import AddItemHolder from '@/components/AddItemHolder.vue'
import ButtonTypePreviewBlock from '@/components/ButtonTypePreviewBlock.vue'
import IconMenuItem from '@/components/IconMenuItem.vue'
import PaneTitle from '@/components/PaneTitle.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TipsBlock from '@/components/TipsBlock.vue'
import SortableList from '@/components/SortableList.vue'
import SortableItem from '@/components/SortableItem.vue'

// /PopEditors/ menu item components
import EditorItemBase from '@/components/PopEditors/EditorItemBase.vue'
import EditorItemDivider from '@/components/PopEditors/EditorItems/Divider.vue'
import EditorItemButtonType from '@/components/PopEditors/EditorItems/ButtonType.vue'
import EditorItemIcons from '@/components/PopEditors/EditorItems/Icons.vue'
import EditorItemInput from '@/components/PopEditors/EditorItems/Input.vue'
import EditorItemFilterFieldType from '@/components/PopEditors/EditorItems/FilterFieldType.vue'
import EditorItemDateType from '@/components/PopEditors/EditorItems/DateType.vue'

if (process.env.NODE_ENV === 'production') {
  const Sentry = require('@sentry/browser')
  const Integrations = require('@sentry/integrations')
  Sentry.init({
    dsn: 'https://eee5983bc12d4d3ab8bd75426536c93e@sentry.io/1446697',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
        logErrors: true
      })
    ]
  })
}

Vue.config.productionTip = false

localforage.config({ name: 'ListviewGenerator' })

Vue.use(ElementUI, { size: 'small' })
Vue.component('MonacoEditor', MonacoEditor)
Vue.component('AddItemHolder', AddItemHolder)
Vue.component('ButtonTypePreviewBlock', ButtonTypePreviewBlock)
Vue.component('IconMenuItem', IconMenuItem)
Vue.component('PaneTitle', PaneTitle)
Vue.component('SvgIcon', SvgIcon)
Vue.component('TipsBlock', TipsBlock)
Vue.component('SortableList', SortableList)
Vue.component('SortableItem', SortableItem)
Vue.component('EditorItemDivider', EditorItemDivider)
Vue.component('EditorItemBase', EditorItemBase)
Vue.component('EditorItemButtonType', EditorItemButtonType)
Vue.component('EditorItemIcons', EditorItemIcons)
Vue.component('EditorItemInput', EditorItemInput)
Vue.component('EditorItemFilterFieldType', EditorItemFilterFieldType)
Vue.component('EditorItemDateType', EditorItemDateType)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

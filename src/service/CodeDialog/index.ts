import _ from 'lodash'
import { Vue } from 'vue-property-decorator'
import CodeDialog from './CodeDialog.vue'

const DialogConstructor = Vue.extend(CodeDialog)

export default function(options: any) {
  const defaultOptions = _.isPlainObject(options) ? options : {}

  let data
  if (_.isPlainObject(options)) {
    data = options
  } else if (_.isString(options)) {
    data = {
      content: options
    }
  } else {
    data = {}
  }
  const instance = new DialogConstructor({
    data: Object.assign({}, defaultOptions, data)
  })
  const vm = instance.$mount()
  document.body.appendChild(vm.$el)

  // @ts-ignore
  vm.visible = true

  return {
    hide() {
      vm.visible = false
    }
  }
}

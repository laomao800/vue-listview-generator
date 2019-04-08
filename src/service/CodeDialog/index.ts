import _ from 'lodash'
import { Vue } from 'vue-property-decorator'
import CodeDialog from './CodeDialog.vue'

export default function(options: any) {
  const DialogConstructor = Vue.extend(CodeDialog)
  const defaultOptions = _.isPlainObject(options) ? options : {}
  let vm: any
  return {
    show(options: any) {
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
      vm = instance.$mount()
      document.body.appendChild(vm.$el)
      // @ts-ignore
      vm.visible = true
    },
    hide() {
      // @ts-ignore
      vm && (vm.visible = false)
    }
  }
}

import Vue from 'vue'
import _ from 'lodash'
import Dialog from './Dialog.vue'

const DialogConstructor = Vue.extend(Dialog)

export default function(options: any) {
  const defaultOptions = _.isPlainObject(options) ? options : {}

  let data
  if (_.isPlainObject(options)) {
    data = options
  } else {
    data = {}
  }
  const instance = new DialogConstructor({
    data: Object.assign({}, defaultOptions, data)
  })
  const vm = instance.$mount()
  document.body.appendChild(vm.$el)

  vm.visible = true
  vm.hide = () => (vm.visible = false)

  return vm
}

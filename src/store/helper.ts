import { mapState, mapActions } from 'vuex'
import { createDecorator, VueDecorator } from 'vue-class-component'

// TODO: 支持返回 function 类型以自定义 state 名
export function VModelState(
  namespace: string,
  updateFn: string = 'updateField'
): VueDecorator {
  return createDecorator((componentOptions, key) => {
    const compComputed =
      componentOptions.computed || (componentOptions.computed = {})
    const getterMap = { [key]: (state: any) => state[key] }

    compComputed[key] = {
      get: namespace
        ? mapState(namespace, getterMap)[key]
        : mapState(getterMap)[key],
      set(newVal) {
        const setterObject = { updateFn }
        const updateAction = (namespace
          ? mapActions(namespace, setterObject)['updateFn']
          : mapActions(setterObject)['updateFn']
        ).bind(this)
        updateAction({
          name: key,
          value: newVal
        })
      }
    }
  })
}

import { mapState, mapActions } from 'vuex'
import { createDecorator, VueDecorator } from 'vue-class-component'

export function VModelState(
  namespace: string,
  updateFn: string = 'updateConfig'
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

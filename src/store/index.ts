import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import json5 from 'json5'
import { isFunctionString, createFunction, uuid } from '@/utils'
import modules from './modules'

Vue.use(Vuex)

const funcDelimiters = ['{{', '}}']

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  actions: {
    getConfig({ dispatch }, runtime) {
      return dispatch('project/getConfig', runtime)
    },
    async getConfigString({ dispatch }) {
      const config = await dispatch('getConfig')
      const funcMap: any = {}

      const configString = json5.stringify(
        config,
        function(key: string, value: any) {
          if (_.isFunction(value)) {
            const id = uuid()
            funcMap[id] = value
            return `${funcDelimiters[0]}${id}${funcDelimiters[1]}`
          } else if (key === 'render') {
            // TODO: return
          }
          return value
        },
        2
      )

      const funcPlaceHolderReg = new RegExp(
        `['"]${funcDelimiters[0]}(.{6})${funcDelimiters[1]}['"]`,
        'g'
      )
      return configString.replace(funcPlaceHolderReg, function() {
        try {
          return funcMap[arguments[1]].toString()
        } catch (e) {}
        return "''"
      })
    }
  }
})

// 自动执行每个模块的 init 方法
for (const moduleName of Object.keys(modules)) {
  const actions = modules[moduleName].actions
  if (actions && actions.init) {
    store.dispatch(`${moduleName}/init`).catch()
  }
}

export default store

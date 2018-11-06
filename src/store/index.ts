import Vue from 'vue'
import Vuex, { Commit, Dispatch } from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

// 自动执行每个模块的 init 方法
for (const moduleName of Object.keys(modules)) {
  const actions = modules[moduleName].actions
  if (actions && actions.init) {
    store.dispatch(`${moduleName}/init`).catch()
  }
}

export default store

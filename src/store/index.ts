import _ from 'lodash'
import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import modules from './modules'
import actions from './actions'

Vue.use(Vuex)

interface State {
  isLoading: boolean
  isPreview: boolean
  updateAt: Date | null
}

const state: State = {
  isLoading: false,
  isPreview: false,
  updateAt: null
}

const mutations: MutationTree<typeof state> = {
  SET_APP_LOADING(state, payload: boolean) {
    state.isLoading = payload
  },
  SET_PREVIEW(state, payload: boolean) {
    state.isPreview = payload
  },
  SET_UPDATE_AT(state, payload: Date) {
    state.updateAt = payload
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  modules,
  mutations,
  actions
})

// 自动执行每个模块的 init 方法
for (const moduleName of Object.keys(modules)) {
  const actions = modules[moduleName].actions
  if (actions && actions.init) {
    store.dispatch(`${moduleName}/init`).catch()
  }
}

export default store

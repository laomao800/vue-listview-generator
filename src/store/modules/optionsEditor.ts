import _ from 'lodash'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { FilterField } from '@laomao800/vue-listview'

type OptionsData = FilterField['options']

function validateOptionsData(data: any) {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        _.isPlainObject(item) &&
        typeof item.label === 'string' &&
        item.hasOwnProperty('value')
    )
  )
}

export interface State {
  [x: string]: any
  visible: boolean
  options: OptionsData
}

const initialState: State = {
  visible: false,
  options: []
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  SET_EDIT_OPTIONS(state: State, payload: OptionsData) {
    state.options = payload
  },
  SET_EDITOR_VISIBLE(state: State, payload: boolean) {
    state.visible = payload
  }
}

let emitResolver: any

const actions: ActionTree<State, any> = {
  edit({ commit, dispatch }, payload: OptionsData) {
    if (validateOptionsData(payload)) {
      commit('SET_EDIT_OPTIONS', payload)
    } else {
      throw new Error('Options config is not validated')
    }
    dispatch('show')
    return new Promise(resolve => {
      emitResolver = resolve
    })
  },
  emit({ dispatch }, payload: OptionsData) {
    if (validateOptionsData(payload)) {
      emitResolver && emitResolver(payload)
      dispatch('hide')
    } else {
      throw new Error('Options config is not validated')
    }
  },
  show({ commit }) {
    commit('SET_EDITOR_VISIBLE', true)
  },
  hide({ commit }) {
    commit('SET_EDITOR_VISIBLE', false)
    commit('SET_EDIT_OPTIONS', [])
  }
}

export { initialState as state, mutations, getters, actions }

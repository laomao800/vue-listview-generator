import _ from 'lodash'
import { MutationTree, GetterTree, ActionTree } from 'vuex'

export interface State {
  [x: string]: any
  visible: boolean
  title: string
  lang: string
  data: any
}

const initialState: State = {
  visible: false,
  title: '',
  lang: 'jsx',
  data: ''
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  SET_EDITOR_DATA(state: State, payload: any) {
    state.data = payload
  },
  SET_EDITOR_VISIBLE(state: State, payload: boolean) {
    state.visible = payload
  },
  SET_EDITOR_TITLE(state: State, payload: string) {
    state.title = payload
  },
  SET_EDITOR_LANG(state: State, payload: string) {
    state.lang = payload
  }
}

let emitResolver: any

const actions: ActionTree<State, any> = {
  show(
    { commit },
    payload: {
      data?: any
      title?: string
      lang?: string
      onSuccess: () => void
    } = {
      data: null,
      onSuccess: () => {}
    }
  ) {
    const { data, title, lang, onSuccess } = payload
    data && commit('SET_EDITOR_DATA', data)
    title && commit('SET_EDITOR_TITLE', title)
    lang && commit('SET_EDITOR_LANG', lang)
    commit('SET_EDITOR_VISIBLE', true)
    return new Promise(resolve => {
      emitResolver = onSuccess || resolve
    })
  },
  hide({ commit }) {
    emitResolver = null
    commit('SET_EDITOR_DATA', null)
    commit('SET_EDITOR_VISIBLE', false)
  },
  emit({ dispatch }, payload: any) {
    emitResolver && emitResolver(() => dispatch('hide'), payload)
  },
  setLang({ commit }, payload: string) {
    commit('SET_EDITOR_LANG', payload)
  }
}

export { initialState as state, mutations, getters, actions }

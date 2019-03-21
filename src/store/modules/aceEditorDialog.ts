import _ from 'lodash'
import { MutationTree, GetterTree, ActionTree } from 'vuex'

export interface State {
  [x: string]: any
  visible: boolean
  title: string
  editorProps: Partial<{
    [x: string]: any
    width: number
    height: number
    lang: string
    content: any
    readonly: boolean
    options: object
  }>
}

function getInitialState(): State {
  return {
    visible: false,
    title: '',
    editorProps: {
      lang: 'javascript',
      content: '',
      width: 800,
      height: 600,
      readonly: false
    }
  }
}

const initialState = getInitialState()

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  SET_DIALOG_CONFIG(state: State, payload: any) {
    Object.keys(payload).forEach(key => {
      if (state.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    })
  },
  SET_EDITOR_CONFIG(state: State, payload: any) {
    Object.keys(payload).forEach(key => {
      if (state.editorProps.hasOwnProperty(key)) {
        state.editorProps[key] = payload[key]
      }
    })
  }
}

let emitResolver: any

const actions: ActionTree<State, any> = {
  show({ commit }, payload: Partial<State['editorProps']>) {
    const { onSuccess, title, ...editorConfig } = payload
    commit('SET_EDITOR_CONFIG', editorConfig)
    commit('SET_DIALOG_CONFIG', { visible: true, title })
    return new Promise(resolve => {
      emitResolver = onSuccess || resolve
    })
  },
  hide({ commit }) {
    emitResolver = null
    commit('SET_DIALOG_CONFIG', { visible: false })

    setTimeout(() => {
      commit('SET_DIALOG_CONFIG', getInitialState())
    }, 200)
  },
  emit({ dispatch }, payload: any) {
    emitResolver && emitResolver(() => dispatch('hide'), payload)
  }
}

export { initialState as state, mutations, getters, actions }

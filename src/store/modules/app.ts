import _ from 'lodash'
import Vue from 'vue'
import localforage from 'localforage'
import { ActionTree, MutationTree } from 'vuex'
import store from '@/store'
import { version } from '@/../package.json'

interface State {
  [x: string]: any
  version: String
  isSaving: Boolean
  updatedAt: Date | null
}

const DATA_KEY = 'project-data'

const state: State = {
  version: version,
  isSaving: false,
  updatedAt: null
}

const mutations: MutationTree<State> = {}

const actions: ActionTree<State, any> = {
  checkLastSaved() {
    // const currentProjectB64 = btoa(JSON.stringify(state.project))
    // let lastSavedProjectB64 = await localforage.getItem('gh-last-saved')
    // if (currentProjectB64 === lastSavedProjectB64) {
    //   commit(types._toggleHasChanges, false)
    // } else {
    //   commit(types._toggleHasChanges, true)
    // }
    // dispatch(types.saveProject, currentProjectB64)
  },

  async saveProject({ commit, state, rootState }, data) {
    const projectData = data || rootState.editor
    await localforage.setItem(DATA_KEY, projectData)
  },

  async loadProject({ commit, state }) {
    const projectData = await localforage.getItem(DATA_KEY)

    if (projectData) {
      try {
        const newState = _.merge({}, state, { editor: projectData })
        store.replaceState(newState)
      } catch (e) {
        Vue.prototype.$message(e)
      }
    }
  },

  clearProject() {}
}

export { state, mutations, actions }

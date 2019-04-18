import _ from 'lodash'
import Vue from 'vue'
import localforage from 'localforage'
import json5 from 'json5'
import { uuid } from '@/utils'
import { ActionTree, MutationTree } from 'vuex'
import store from '@/store'
import { version } from '@/../package.json'
import { version as listviewVersion } from '@laomao800/vue-listview/package.json'

interface State {
  [x: string]: any
  version: String
  isSaving: Boolean
  isPreview: Boolean
  updatedAt: Date | null
}

const DATA_KEY = 'project-data'

export const mapFields = true

const state: State = {
  version,
  listviewVersion,
  isSaving: false,
  isPreview: false,
  updatedAt: null,

  // DataSource Pane
  requestType: 'default',
  setContentDataMap: false,
  setResolveResponseErrorMessage: false,
  setValidateResponse: false,
  setContentMessage: false
}

const mutations: MutationTree<State> = {}

const actions: ActionTree<State, any> = {
  getProjectConfig({ dispatch }) {
    return dispatch('project/getConfig', null, { root: true })
  },

  async getProjectConfigString({ dispatch }) {
    const funcDelimiters = ['{{', '}}']
    const config = await dispatch('getProjectConfig')
    const funcMap: any = {}

    const configString = json5.stringify(config, function(
      key: string,
      value: any
    ) {
      if (_.isFunction(value)) {
        const id = uuid()
        funcMap[id] = value
        return `${funcDelimiters[0]}${id}${funcDelimiters[1]}`
      } else if (key === 'render') {
        // TODO: return
      }
      return value
    })

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
  },

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

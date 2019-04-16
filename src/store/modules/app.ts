import _ from 'lodash'
import Vue from 'vue'
import localforage from 'localforage'
import download from 'downloadjs'
import json5 from 'json5'
import { uuid, prettify } from '@/utils'
import { ActionTree, MutationTree } from 'vuex'
import store from '@/store'
import { version } from '@/../package.json'
import { version as listviewVersion } from '@laomao800/vue-listview/package.json'

function simpleTpl(content: string, variables: any) {
  const keys = Object.keys(variables)
  const reg = new RegExp(`<%= ?(${keys.join('|')}) ?%>`, 'g')
  return content.replace(reg, function(match, p1) {
    return variables[p1] || ''
  })
}

interface State {
  [x: string]: any
  version: String
  isSaving: Boolean
  updatedAt: Date | null
}

const DATA_KEY = 'project-data'

const state: State = {
  version,
  listviewVersion,
  isSaving: false,
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
  async exportProject({ rootState, dispatch }, { type = 'config' }) {
    let exportFileContent = null
    let exportFileName = null
    switch (type) {
      case 'config':
        exportFileName = `listview_config_${+new Date()}.json`
        exportFileContent = JSON.stringify({
          version,
          listviewVersion,
          data: json5.stringify(rootState.project)
        })
        break
      case 'html':
      case 'vue':
        exportFileName = `listview_page_${+new Date()}.${type}`
        // prettier-ignore
        const configString = await dispatch('app/getProjectConfigString', null, { root: true })
        // eslint-disable-next-line import/no-webpack-loader-syntax
        const templateMap: any = {
          html: require(`!!raw-loader!@/constants/exportTemplate/html.tpl`)
            .default,
          vue: require(`!!raw-loader!@/constants/exportTemplate/vue.tpl`)
            .default
        }
        const templateContent = templateMap[type]
        exportFileContent = simpleTpl(templateContent, {
          listviewConfig: configString,
          listviewVersion
        })
        exportFileContent = prettify(exportFileContent, {
          parser: type
        })
        break
    }
    if (exportFileContent && exportFileName) {
      download(exportFileContent, exportFileName, 'text/plain')
    }
  },

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

export const mapFields = true
export { state, mutations, actions }

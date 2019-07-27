import _ from 'lodash'
import localforage from 'localforage'
import json5 from 'json5'
import { uuid, prettify, simpleTpl } from '@/utils'
import { ActionTree } from 'vuex'
import store from '@/store'

const STORAGE_KEY = 'LISTVIEW_PROJECT'

// eslint-disable-next-line import/no-webpack-loader-syntax
const TEMPLATE_MAP: any = {
  html: require(`!!raw-loader!@/constants/exportTemplate/html.tpl`).default,
  vue: require(`!!raw-loader!@/constants/exportTemplate/vue.tpl`).default
}

function getInitialState() {
  return {
    isLoading: false,
    isPreview: false,
    updateAt: null
  }
}

const actions: ActionTree<any, any> = {
  preview({ commit }, status: boolean) {
    commit('SET_PREVIEW', status)
  },

  getConfig({ dispatch }) {
    return dispatch('project/getProjectConfig', null, { root: true })
  },

  async getConfigString({ dispatch }) {
    const funcDelimiters = ['{{', '}}']
    const config = await dispatch('getConfig')
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

  async getConfigContent({ dispatch, rootState }, type: string) {
    const configString = await dispatch('getConfigString')
    let content = ''
    switch (type) {
      case 'project':
        content = JSON.stringify(rootState)
        break
      case 'config':
        content = prettify(`const listviewProps = ${configString}`)
        break
      case 'html':
      case 'vue':
        const templateContent = TEMPLATE_MAP[type]
        content = simpleTpl(templateContent, {
          listviewConfig: configString,
          listviewVersion: rootState.workspace.listviewVersion
        })
        content = prettify(content, {
          parser: type
        })
        break
      default:
        throw new Error(`不支持获取 ${type} 类型的配置`)
    }
    return content
  },

  getInitialState,

  newProject({ dispatch }) {
    Promise.all([
      dispatch('getInitialState'),
      dispatch('project/getInitialState'),
      dispatch('workspace/getInitialState')
    ]).then(([app, project, workspace]) => {
      const newState = {
        ...app,
        project,
        workspace
      }
      store.replaceState(newState)
      localforage.removeItem(STORAGE_KEY)
    })
  },

  saveProject: _.throttle(async function({ rootState, commit }, force = false) {
    const curProject = _.pick(rootState, ['workspace', 'project'])
    // 强制保存（手动保存时）跳过对比步骤直接进入保存环节
    if (!force) {
      const lastProject = await localforage.getItem(STORAGE_KEY)
      const curProjectStr = JSON.stringify(curProject)
      const lastProjectStr = JSON.stringify(lastProject)
      if (curProjectStr === lastProjectStr) {
        return
      }
    }
    commit('SET_LOADING', true)
    await localforage.setItem(STORAGE_KEY, curProject)
    commit('SET_UPDATE_AT', new Date())
    setTimeout(() => commit('SET_LOADING', false), 500)
  }, 5000),

  async loadProject({ rootState, dispatch, commit }, content?: string) {
    commit('SET_LOADING', true)
    let loadedState = null
    try {
      if (content !== undefined) {
        loadedState = _.isPlainObject(content) ? content : JSON.parse(content)
      } else {
        loadedState = await localforage.getItem(STORAGE_KEY)
      }
    } catch (error) {
      throw new Error(error)
    }

    // TODO: loadedState 结构验证
    if (loadedState) {
      const newState = {
        ...rootState,
        ...loadedState
      }
      store.replaceState(newState)
      if (content !== undefined) {
        dispatch('saveProject')
      }
    }
    setTimeout(() => commit('SET_LOADING', false), 500)
  }
}

export default actions

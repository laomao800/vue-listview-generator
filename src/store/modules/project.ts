import _ from 'lodash'
import has from 'has-values'
import { ActionTree, MutationTree } from 'vuex'
import {
  TableColumn,
  ListviewProps,
  FilterField,
  FilterButton
} from '@laomao800/vue-listview'
import { createFunction, prettify } from '@/utils'
import {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
} from '@/store/listStateMutations'

type ToList<T> = { id: string; data: T }[]
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
type StoreTableColumn = Merge<
  TableColumn,
  {
    formatter?: string | TableColumn['formatter']
    render?: string | TableColumn['render']
  }
>
type InnerState = Merge<
  ListviewProps,
  {
    requestHandler: string
    filterButtons: ToList<FilterButton>
    filterFields: ToList<FilterField>
    tableColumns: ToList<StoreTableColumn>
  }
>
type State = Partial<InnerState>

export const mapFields = true

function getInitialState(): State {
  return {
    // DataSource
    requestMethod: 'post',
    requestUrl: '',
    requestHandler: 'myRequestHandler',
    autoload: true,
    contentMessage: null,
    contentDataMap: {
      items: 'result.items',
      total: 'result.total_count'
    },
    validateResponse: prettify(`
    function validateResponse(response) {
      try {
        return response.is_success
      } catch (e) {
        return false
      }
    }
  `),
    resolveResponseErrorMessage: prettify(`
    function resolveResponseErrorMessage(response) {
      try {
        return response.error_info.msg
      } catch (e) {
        return '未知错误'
      }
    }
  `),

    // Basic
    headerTitle: '',
    headerNav: [],
    fullHeight: true,
    height: '',
    usePage: true,
    pageSize: 20,
    pageSizes: [20, 50, 100],

    // Filterbar
    filterButtons: [],
    filterFields: [],

    // Content
    tableColumns: []
  }
}

export const state = getInitialState()

export const mutations: MutationTree<typeof state> = {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
}

export const actions: ActionTree<typeof state, any> = {
  getInitialState,

  addListItem({ commit }, { stateProp, data, insertAfter } = {}) {
    commit('LIST_STATE_ADD', {
      stateProp,
      data: data || {},
      insertAfter
    })
  },
  updateListItem({ commit }, { stateProp, data, updateIndex } = {}) {
    commit('LIST_STATE_UPDATE', {
      stateProp,
      data,
      updateIndex
    })
  },
  deleteListItem({ commit }, { stateProp, deleteIndex }) {
    commit('LIST_STATE_DELETE', {
      stateProp,
      deleteIndex
    })
  },

  getProjectConfig({ state, rootState }) {
    const finalConfig: any = {}

    // DataSource
    if (state.requestMethod !== 'post') {
      finalConfig['requestMethod'] = state.requestMethod
    }
    if (rootState.workspace.requestType === 'default') {
      finalConfig['requestUrl'] = state.requestUrl
    } else {
      finalConfig['requestHandler'] = state.requestHandler
    }
    if (rootState.workspace.setContentDataMap) {
      finalConfig['contentDataMap'] = state.contentDataMap
    }
    if (!state.autoload) {
      finalConfig['autoload'] = false
    }
    if (rootState.workspace.setContentMessage) {
      finalConfig['contentMessage'] = state.contentMessage
    }
    if (rootState.workspace.setValidateResponse) {
      finalConfig['validateResponse'] = createFunction(state.validateResponse)
    }
    if (rootState.workspace.setResolveResponseErrorMessage) {
      finalConfig['resolveResponseErrorMessage'] = createFunction(
        state.resolveResponseErrorMessage
      )
    }

    // Basic
    if (state.headerTitle) {
      finalConfig['headerTitle'] = state.headerTitle
    }
    if (state.headerNav!.length > 0) {
      finalConfig['headerNav'] = state.headerNav
    }
    if (!state.fullHeight) {
      finalConfig['fullHeight'] = state.fullHeight
    }
    if (!state.fullHeight && state.height) {
      finalConfig['height'] = state.height
    }
    if (!state.usePage) {
      finalConfig['usePage'] = state.usePage
    }
    if (state.pageSize !== 20) {
      finalConfig['pageSize'] = state.pageSize
    }
    if (!_.isEqual(state.pageSizes, [20, 50, 100])) {
      finalConfig['pageSizes'] = state.pageSizes
    }

    // Filterbar
    if (state.filterButtons!.length > 0) {
      finalConfig['filterButtons'] = state.filterButtons!.map(item => item.data)
    }
    if (state.filterFields!.length > 0) {
      finalConfig['filterFields'] = state.filterFields!.map(item => {
        const { data } = item
        // @ts-ignore
        if (has(data.componentProps)) {
          return data
        } else {
          // @ts-ignore
          const { componentProps, ...resData } = data
          return resData
        }
      })
    }

    // Content
    if (state.tableColumns!.length > 0) {
      finalConfig['tableColumns'] = state.tableColumns!.map(item => {
        const cloneColumn = _.cloneDeep(item.data) as StoreTableColumn
        if (_.isString(cloneColumn.formatter)) {
          const formatter = createFunction(cloneColumn.formatter, true)
          if (formatter) {
            cloneColumn.formatter = formatter
          }
        }
        // TODO:
        // if (isFunctionString(item.data.render)) {
        //   item.data.render = createFunction(item.data.render)
        // }
        return cloneColumn
      })
    }

    return finalConfig
  }
}

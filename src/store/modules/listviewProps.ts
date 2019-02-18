import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { ListviewProps } from '@laomao800/vue-listview'

// type State = { [K in keyof (typeof initialState)]: ListviewProps[K] }

interface State {
  requestUrl: ListviewProps['requestUrl']
  requestMethod: ListviewProps['requestMethod']
  contentDataMap: ListviewProps['contentDataMap']
  validateResponse: ListviewProps['validateResponse']
  resolveResponseErrorMessage: ListviewProps['resolveResponseErrorMessage']
  autoload: ListviewProps['autoload']
  headerTitle: ListviewProps['headerTitle']
  headerNav: ListviewProps['headerNav']
  fullHeight: ListviewProps['fullHeight']
  height: ListviewProps['height']
  usePage: ListviewProps['usePage']
  pageSize: ListviewProps['pageSize']
  pageSizes: ListviewProps['pageSizes']
  contentMessage: ListviewProps['contentMessage']
  contentMinHeight: ListviewProps['contentMinHeight']
}

const initialState: State = {
  requestUrl:
    'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
  requestMethod: 'post',
  contentDataMap: {
    items: 'result.items',
    total: 'result.total_count'
  },
  validateResponse(response: any) {
    try {
      return response.is_success
    } catch (e) {
      return false
    }
  },
  resolveResponseErrorMessage(response: any) {
    try {
      return response.error_info.msg
    } catch (e) {
      return '未知错误'
    }
  },
  autoload: true,
  headerTitle: '',
  headerNav: [],
  fullHeight: true,
  height: '',
  usePage: true,
  pageSize: 20,
  pageSizes: [20, 50, 100],
  contentMessage: null,
  contentMinHeight: 160
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  UPDATE_CONFIG(state: State, payload) {
    const { name, value } = payload
    if (state.hasOwnProperty(name)) {
      state[name as keyof State] = value
    }
  }
}

const actions: ActionTree<State, any> = {
  updateConfig({ commit }, payload) {
    commit('UPDATE_CONFIG', payload)
  }
}

export { initialState as state, mutations, getters, actions }

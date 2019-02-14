import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { Props } from '@laomao800/vue-listview'

export interface State {
  requestUrl: Props['requestUrl']
  requestMethod: Props['requestMethod']
  contentDataMap: Props['contentDataMap']
  validateResponse: Props['validateResponse']
  resolveResponseErrorMessage: Props['resolveResponseErrorMessage']
}

const initialState: State = {
  requestUrl:
    'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
  requestMethod: 'post',
  contentDataMap: {
    items: 'result.items',
    total: 'result.total_count'
  },
  validateResponse: function(response) {
    try {
      return response.is_success
    } catch (e) {
      return false
    }
  },
  resolveResponseErrorMessage: function(response) {
    try {
      return response.error_info.msg
    } catch (e) {
      return '未知错误'
    }
  }
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

import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { ListviewProps, FilterButton } from '@laomao800/vue-listview'
import { uuid } from '@/utils'

type WithId<T> = {
  id: string
  data: T
}

export interface State {
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
  filterButtons: WithId<FilterButton>[]
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
  filterButtons: []
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  UPDATE_FIELD(state: State, payload) {
    const { name, value } = payload
    if (state.hasOwnProperty(name)) {
      state[name as keyof State] = value
    }
  },
  ADD_FILTER_BUTTON(
    state: State,
    payload: { data: FilterButton; insert?: number }
  ) {
    const { data, insert = -1 } = payload
    const newData = {
      id: uuid(),
      data
    }
    if (insert > -1 && insert < state.filterButtons.length) {
      state.filterButtons.splice(insert, 0, newData)
    } else {
      state.filterButtons.push(newData)
    }
  },
  UPDATE_FILTER_BUTTON(
    state: State,
    payload: { index: number; data: FilterButton }
  ) {
    const { index, data } = payload
    const target = state.filterButtons[index]
    if (target) {
      state.filterButtons[index].data = data
    }
  },
  DELETE_FILTER_BUTTON(state: State, payload: any) {
    const deleteIndex = state.filterButtons.indexOf(payload)
    if (deleteIndex > -1) {
      state.filterButtons.splice(deleteIndex, 1)
    }
  }
}

const actions: ActionTree<State, any> = {
  updateField({ commit }, payload) {
    commit('UPDATE_FIELD', payload)
  },
  addFilterButton({ commit }, payload = { data: { text: '按钮文本' } }) {
    commit('ADD_FILTER_BUTTON', payload)
  },
  updateFilterButton({ commit }, payload) {
    commit('UPDATE_FILTER_BUTTON', payload)
  },
  deleteFilterButton({ commit }, payload) {
    commit('DELETE_FILTER_BUTTON', payload)
  }
}

export { initialState as state, mutations, getters, actions }

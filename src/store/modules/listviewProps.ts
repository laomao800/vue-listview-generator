import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { ListviewProps, FilterButton } from '@laomao800/vue-listview'
import { uuid } from '@/utils'

type WithId<T> = {
  id: string
  data: T
}

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
  filterButtons: [
    {
      id: 'da145541-aec1-4f25-b027-6f301beea208',
      data: {
        type: 'success',
        icon: 'el-icon-circle-plus-outline',
        text: '添加'
      }
    },
    {
      id: '4edca1d8-25b1-43b0-915a-8c6dfd4c4e44',
      data: {
        type: 'danger',
        icon: 'el-icon-remove-outline',
        text: '删除'
      }
    }
  ]
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {
  UPDATE_FIELD(state: State, payload) {
    const { name, value } = payload
    if (state.hasOwnProperty(name)) {
      state[name as keyof State] = value
    }
  },
  ADD_FILTER_BUTTON(state: State, payload: FilterButton) {
    const newData = {
      id: uuid(),
      data: payload
    }
    state.filterButtons.push(newData)
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
  }
}

const actions: ActionTree<State, any> = {
  updateField({ commit }, payload) {
    commit('UPDATE_FIELD', payload)
  },
  addFilterButton({ commit }, payload = { text: '按钮文本' }) {
    commit('ADD_FILTER_BUTTON', payload)
  },
  updateFilterButton({ commit }, payload) {
    commit('UPDATE_FILTER_BUTTON', payload)
  }
}

export { initialState as state, mutations, getters, actions }

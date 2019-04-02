import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { FilterButton, FilterField } from '@laomao800/vue-listview'
import { uuid } from '@/utils'

type ToList<T> = {
  id: string
  data: T
}[]

interface MutateListPayload {
  stateProp: string
  data?: any
  insertAfter?: number
  updateIndex?: number
  deleteIndex?: number
}

export const state: {
  [x: string]: any
  filterButtons: ToList<FilterButton>
  filterFields: ToList<FilterField>
} = {
  filterButtons: [
    {
      id: '0e234106',
      data: { type: 'success', icon: 'el-icon-plus', text: '添加' }
    },
    {
      id: '8a7ef70d',
      data: { type: 'danger', icon: 'el-icon-delete', text: '批量删除' }
    }
  ],
  filterFields: []
}

export const getters: GetterTree<typeof state, any> = {
  props(state) {
    const { filterButtons, filterFields } = state

    const finalProps: any = {}

    if (filterButtons.length > 0) {
      finalProps['filterButtons'] = filterButtons
    }

    if (filterFields.length > 0) {
      finalProps['filterFields'] = filterFields
    }

    return finalProps
  }
}

export const mutations: MutationTree<typeof state> = {
  LIST_PROP_ADD(state, payload: MutateListPayload) {
    const { stateProp, data, insertAfter = -1 } = payload
    const target = state[stateProp]
    const newData = { id: uuid(), data }
    if (insertAfter > -1) {
      target.splice(insertAfter + 1, 0, newData)
    } else {
      target.push(newData)
    }
  },

  LIST_PROP_UPDATE(state, payload: MutateListPayload) {
    const { stateProp, data, updateIndex } = payload
    const target = state[stateProp]
    target[updateIndex!].data = data
  },

  LIST_PROP_DELETE(state, payload: MutateListPayload) {
    const { stateProp, deleteIndex } = payload
    const target = state[stateProp]
    target.splice(deleteIndex, 1)
  }
}

export const actions: ActionTree<typeof state, any> = {
  addFilterButton({ commit }, { data, insertAfter } = {}) {
    commit('LIST_PROP_ADD', {
      stateProp: 'filterButtons',
      data: data || { text: '按钮文本' },
      insertAfter
    })
  },
  updateFilterButton({ commit }, { updateIndex, data } = {}) {
    commit('LIST_PROP_UPDATE', {
      stateProp: 'filterButtons',
      data,
      updateIndex
    })
  },
  deleteFilterButton({ commit }, deleteIndex: number) {
    commit('LIST_PROP_DELETE', {
      stateProp: 'filterButtons',
      deleteIndex
    })
  }
}

import _ from 'lodash'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { uuid } from '@/utils'

type ToList<T> = {
  id: string
  data: T
}[]

export interface State {
  [x: string]: any
  // requestUrl: ListviewProps['requestUrl']
  // requestMethod: ListviewProps['requestMethod']
  // requestHandler: any
  // contentDataMap: ListviewProps['contentDataMap']
  // validateResponse: ListviewProps['validateResponse']
  // resolveResponseErrorMessage: ListviewProps['resolveResponseErrorMessage']
  // autoload: ListviewProps['autoload']
  // headerTitle: ListviewProps['headerTitle']
  // headerNav: ListviewProps['headerNav']
  // fullHeight: ListviewProps['fullHeight']
  // height: ListviewProps['height']
  // usePage: ListviewProps['usePage']
  // pageSize: ListviewProps['pageSize']
  // pageSizes: ListviewProps['pageSizes']
  // contentMessage: ListviewProps['contentMessage']
  // filterButtons: ToList<FilterButton>
  // filterFields: ToList<FilterField>
  // tableColumns: ToList<TableColumn>
}

interface MutateListPayload {
  stateProp: string
  data?: any
  insertAfter?: number
  updateIndex?: number
  deleteIndex?: number
}

function separateFuncInObj(obj: any, funcMap: any = {}) {
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (_.isFunction(value)) {
      const id = uuid()
      funcMap[id] = value
      obj[key] = `$func_${id}$`
    } else if (_.isPlainObject(value)) {
      separateFuncInObj(value, funcMap)
    } else if (Array.isArray(value)) {
      value.forEach(item => {
        separateFuncInObj(item, funcMap)
      })
    }
  })
  return [obj, funcMap]
}

const initialState: State = {
  tableColumns: [
    {
      id: '0e234105',
      data: {
        label: '自定义标签',
        prop: 'sku',
        width: 100,
        align: 'center',
        fixed: true
      }
    },
    {
      id: '8a7ef70c',
      data: { label: '修改时间', prop: 'date', align: 'center', fixed: 'right' }
    },
    {
      id: '2420d850',
      data: {
        label: '折扣率',
        align: 'center',
        formatter: (row: any) =>
          row.hasOwnProperty('discount') && row.discount.toFixed(2)
      }
    }
  ]
}

const mutations: MutationTree<State> = {
  UPDATE_FIELD(state: State, payload) {
    const { name, value } = payload
    if (state.hasOwnProperty(name)) {
      state[name as keyof State] = value
    }
  },

  LIST_PROP_ADD(state: State, payload: MutateListPayload) {
    const { stateProp, data, insertAfter = -1 } = payload
    const target = state[stateProp]
    const newData = { id: uuid(), data }
    if (insertAfter > -1) {
      target.splice(insertAfter + 1, 0, newData)
    } else {
      target.push(newData)
    }
  },

  LIST_PROP_UPDATE(state: State, payload: MutateListPayload) {
    const { stateProp, data, updateIndex } = payload
    const target = state[stateProp]
    target[updateIndex!].data = data
  },

  LIST_PROP_DELETE(state: State, payload: MutateListPayload) {
    const { stateProp, deleteIndex } = payload
    const target = state[stateProp]
    target.splice(deleteIndex, 1)
  }
}

const actions: ActionTree<State, any> = {
  updateField({ commit }, payload) {
    commit('UPDATE_FIELD', payload)
  },

  // TableColumns
  addTableColumn({ commit }, { data, insertAfter } = {}) {
    commit('LIST_PROP_ADD', {
      stateProp: 'tableColumns',
      data: data || {
        label: '列名',
        prop: 'property_name'
      },
      insertAfter
    })
  },
  updateTableColumn({ commit }, { updateIndex, data } = {}) {
    commit('LIST_PROP_UPDATE', {
      stateProp: 'tableColumns',
      data,
      updateIndex
    })
  },
  deleteTableColumn({ commit }, deleteIndex: number) {
    commit('LIST_PROP_DELETE', {
      stateProp: 'tableColumns',
      deleteIndex
    })
  },

  getResult({ state }) {
    return separateFuncInObj(_.cloneDeep(state))
  }
}

export { initialState as state, mutations, actions }

import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { TableColumn } from '@laomao800/vue-listview'
import {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
} from '@/store/listStateMutations'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

type StoreTableColumn = Merge<
  TableColumn,
  {
    formatter?: string | TableColumn['formatter']
    render?: string | TableColumn['render']
  }
>

type ToList<T> = {
  id: string
  data: T
}[]

export const state: {
  [x: string]: any
  tableColumns: ToList<StoreTableColumn>
} = {
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
        formatter:
          'function formatter(row) {\n' +
          "  return row.hasOwnProperty('discount') && row.discount.toFixed(2);\n" +
          '}'
      }
    }
  ]
}

export const getters: GetterTree<typeof state, any> = {
  props(state) {
    const { tableColumns } = state

    const finalProps: any = {}

    if (tableColumns.length > 0) {
      finalProps['tableColumns'] = tableColumns.map(item => item.data)
    }

    return finalProps
  }
}

export const mutations: MutationTree<typeof state> = {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
}

export const actions: ActionTree<typeof state, any> = {
  addTableColumn({ commit }, { data, insertAfter } = {}) {
    commit('LIST_STATE_ADD', {
      stateProp: 'tableColumns',
      data: data || {
        label: '列名',
        prop: 'property_name'
      },
      insertAfter
    })
  },
  updateTableColumn({ commit }, { updateIndex, data } = {}) {
    commit('LIST_STATE_UPDATE', {
      stateProp: 'tableColumns',
      data,
      updateIndex
    })
  },
  deleteTableColumn({ commit }, deleteIndex: number) {
    commit('LIST_STATE_DELETE', {
      stateProp: 'tableColumns',
      deleteIndex
    })
  }
}

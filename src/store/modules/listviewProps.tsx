import { MutationTree, GetterTree, ActionTree } from 'vuex'
import {
  ListviewProps,
  FilterButton,
  FilterField
} from '@laomao800/vue-listview'
import { uuid } from '@/utils'

type ToList<T> = {
  id: string
  data: T
}[]

export interface State {
  [x: string]: any
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
  filterButtons: ToList<FilterButton>
  filterFields: ToList<FilterField>
}

interface MutateListPayload {
  stateProp: string
  data?: any
  insertAfter?: number
  updateIndex?: number
  deleteIndex?: number
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
  filterButtons: [],
  filterFields: [
    {
      id: '0e234105-cf49-46a0-b5a3-1f104c1903cd',
      data: {
        type: 'text',
        model: 'eq_name',
        label: '文本字段',
        componentSlots: { prepend: '$', append: '$' },
        componentProps: { 'suffix-icon': 'el-icon-date' }
      }
    },
    {
      id: '2420d850-aa78-40f6-9a8a-02c15d26ca9c',
      data: {
        type: 'label',
        label: '文本'
      }
    },
    {
      id: '8a7ef70c-143f-4320-8015-3f5dce1d5f27',
      data: {
        type: 'number',
        label: '数字',
        model: 'eq_number'
      }
    },
    {
      id: '26f109ae-c138-4c7d-b43e-3be3084c55bb',
      data: {
        type: 'select',
        model: 'eq_select',
        label: '单选字段',
        options: [
          { label: '单选选项 1', value: 1 },
          { label: '单选选项 2', value: 2 },
          { label: '单选选项 3', value: 3 }
        ]
      }
    },
    {
      id: 'b1f1ec28-6f3c-4854-896f-c8b3d618c353',
      data: {
        type: 'multipleSelect',
        model: 'eq_multipleSelect',
        label: '多选字段',
        options: [
          { label: '多选选项 1', value: 1 },
          { label: '多选选项 2', value: 2 },
          { label: '多选选项 3', value: 3 }
        ]
      }
    },
    {
      id: '06019ed5-d47e-43bb-8f57-adf03d9e4eec',
      data: {
        type: 'cascader',
        model: 'eq_cascader',
        label: '级联选项',
        options: [
          {
            value: '1',
            label: '菜单1',
            children: [
              {
                value: '2',
                label: '菜单2',
                children: [
                  {
                    value: '3',
                    label: '菜单3',
                    children: [{ value: '4', label: '菜单4' }]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      id: 'cddbe3c4-75e5-43f0-86d1-e9fe3b7569b5',
      data: { type: 'date', model: 'eq_date', label: '日期选择' }
    },
    {
      id: '9e01b81d-bdde-4076-8fcb-31cd70cf77ff',
      data: { type: 'dateTime', model: 'eq_dateTime', label: '日期时间' }
    },
    {
      id: '01567dcd-9bef-46e1-991e-fa794043011a',
      data: { type: 'dateRange', model: 'eq_dateRange', label: '日期范围' }
    },
    {
      id: 'dda011e6-a423-4c67-a203-97f005182706',
      data: {
        type: 'dateTimeRange',
        model: 'eq_dateTimeRange',
        label: '日期时间范围'
      }
    },
    {
      id: '512ac8c0-951b-46a3-b6cc-772ee78c3fd9',
      data: { type: 'timeSelect', model: 'eq_timeSelect', label: '固定时间' }
    },
    {
      id: '5b86d025-eb5a-4eb3-954c-a0bbd32edf40',
      data: { type: 'timePicker', model: 'eq_timePicker', label: '任意时间' }
    },
    {
      id: 'e96eac05-d011-4e76-9108-8f35ba32cd90',
      data: {
        type: 'timePickerRange',
        model: 'eq_timePickerRange',
        label: '时间范围'
      }
    }
  ],
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
    // {
    //   id: '26f109ae',
    //   data: {
    //     label: '是否启用',
    //     align: 'center',
    //     render: (prop: any) => {
    //       if (prop.row.enable) {
    //         return <div style="color:#67c23a">启用</div>
    //       } else {
    //         return <div style="color:#f56c6c">禁用</div>
    //       }
    //     }
    //   }
    // }
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

  // FilterButtons
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
  },

  // FieldFields
  addFilterField({ commit }, { data, insertAfter } = {}) {
    commit('LIST_PROP_ADD', {
      stateProp: 'filterFields',
      data: data || {
        type: 'text',
        label: '字段文本标签',
        model: 'param_name'
      },
      insertAfter
    })
  },
  updateFilterField({ commit }, { updateIndex, data } = {}) {
    commit('LIST_PROP_UPDATE', {
      stateProp: 'filterFields',
      data,
      updateIndex
    })
  },
  deleteFilterField({ commit }, deleteIndex: number) {
    commit('LIST_PROP_DELETE', {
      stateProp: 'filterFields',
      deleteIndex
    })
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
  }
}

export { initialState as state, mutations, getters, actions }

import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { FilterButton, FilterField } from '@laomao800/vue-listview'
import {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
} from '@/store/listStateMutations'

type ToList<T> = {
  id: string
  data: T
}[]

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
  filterFields: [
    {
      id: '0e234105',
      data: {
        type: 'text',
        model: 'eq_name',
        label: '文本字段',
        componentSlots: { prepend: '$', append: '$' },
        componentProps: { 'suffix-icon': 'el-icon-date' }
      }
    },
    {
      id: '2420d850',
      data: {
        type: 'label',
        label: '文本'
      }
    },
    {
      id: '8a7ef70c',
      data: {
        type: 'number',
        label: '数字',
        model: 'eq_number'
      }
    },
    {
      id: '26f109ae',
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
      id: 'b1f1ec28',
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
      id: '06019ed5',
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
      id: 'cddbe3c4',
      data: { type: 'date', model: 'eq_date', label: '日期选择' }
    },
    {
      id: '9e01b81d',
      data: { type: 'dateTime', model: 'eq_dateTime', label: '日期时间' }
    },
    {
      id: '01567dcd',
      data: { type: 'dateRange', model: 'eq_dateRange', label: '日期范围' }
    },
    {
      id: 'dda011e6',
      data: {
        type: 'dateTimeRange',
        model: 'eq_dateTimeRange',
        label: '日期时间范围'
      }
    },
    {
      id: '512ac8c0',
      data: { type: 'timeSelect', model: 'eq_timeSelect', label: '固定时间' }
    },
    {
      id: '5b86d025',
      data: { type: 'timePicker', model: 'eq_timePicker', label: '任意时间' }
    },
    {
      id: 'e96eac05',
      data: {
        type: 'timePickerRange',
        model: 'eq_timePickerRange',
        label: '时间范围'
      }
    }
  ]
}

export const getters: GetterTree<typeof state, any> = {
  props(state) {
    const { filterButtons, filterFields } = state

    const finalProps: any = {}

    if (filterButtons.length > 0) {
      finalProps['filterButtons'] = filterButtons.map(item => item.data)
    }

    if (filterFields.length > 0) {
      finalProps['filterFields'] = filterFields.map(item => item.data)
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
  addFilterButton({ commit }, { data, insertAfter } = {}) {
    commit('LIST_STATE_ADD', {
      stateProp: 'filterButtons',
      data: data || { text: '按钮文本' },
      insertAfter
    })
  },
  updateFilterButton({ commit }, { updateIndex, data } = {}) {
    commit('LIST_STATE_UPDATE', {
      stateProp: 'filterButtons',
      data,
      updateIndex
    })
  },
  deleteFilterButton({ commit }, deleteIndex: number) {
    commit('LIST_STATE_DELETE', {
      stateProp: 'filterButtons',
      deleteIndex
    })
  },
  addFilterField({ commit }, { data, insertAfter } = {}) {
    commit('LIST_STATE_ADD', {
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
    commit('LIST_STATE_UPDATE', {
      stateProp: 'filterFields',
      data,
      updateIndex
    })
  },
  deleteFilterField({ commit }, deleteIndex: number) {
    commit('LIST_STATE_DELETE', {
      stateProp: 'filterFields',
      deleteIndex
    })
  }
}

import _ from 'lodash'
import has from 'has-values'
import { ActionTree, MutationTree } from 'vuex'
import { TableColumn } from '@laomao800/vue-listview'
import { createFunction, prettify } from '@/utils'
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

export const mapFields = true

export const state = {
  // Basic
  headerTitle: '',
  headerNav: [],
  fullHeight: true,
  height: '',
  usePage: true,
  pageSize: 20,
  pageSizes: [20, 50, 100],

  // Filterbar
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
        componentProps: { suffixIcon: 'el-icon-date' }
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
  ],

  // DataSource
  requestUrl:
    'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
  requestMethod: 'post',
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

  // Content
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
          "  return row.hasOwnProperty('discount') && row.discount.toFixed(2)\n" +
          '}'
      }
    }
  ]
}

export const mutations: MutationTree<typeof state> = {
  LIST_STATE_ADD,
  LIST_STATE_UPDATE,
  LIST_STATE_DELETE
}

export const actions: ActionTree<typeof state, any> = {
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

  getConfig({ state, rootState }, runtime = false) {
    const finalConfig: any = {}

    // Basic
    if (state.headerTitle) {
      finalConfig['headerTitle'] = state.headerTitle
    }
    if (state.headerNav.length > 0) {
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
    if (state.filterButtons.length > 0) {
      finalConfig['filterButtons'] = state.filterButtons.map(item => item.data)
    }
    if (state.filterFields.length > 0) {
      finalConfig['filterFields'] = state.filterFields.map(item => {
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

    // DataSource
    if (!state.autoload) {
      finalConfig['autoload'] = false
    }
    if (state.requestMethod !== 'get') {
      finalConfig['requestMethod'] = state.requestMethod
    }
    if (rootState.app.requestType === 'default') {
      finalConfig['requestUrl'] = state.requestUrl
    } else {
      finalConfig['requestHandler'] = state.requestHandler
    }
    if (rootState.app.setContentDataMap) {
      finalConfig['contentDataMap'] = state.contentDataMap
    }
    if (rootState.app.setContentMessage) {
      finalConfig['contentMessage'] = state.contentMessage
    }
    if (rootState.app.setResolveResponseErrorMessage) {
      finalConfig['resolveResponseErrorMessage'] = createFunction(
        state.resolveResponseErrorMessage
      )
    }
    if (rootState.app.setValidateResponse) {
      finalConfig['validateResponse'] = createFunction(state.validateResponse)
    }

    // Content
    if (state.tableColumns.length > 0) {
      finalConfig['tableColumns'] = state.tableColumns.map(item => {
        const cloneColumn = _.cloneDeep(item.data) as StoreTableColumn
        if (_.isString(cloneColumn.formatter)) {
          cloneColumn.formatter = createFunction(cloneColumn.formatter)
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

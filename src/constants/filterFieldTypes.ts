import _ from 'lodash'
import { FilterField } from '@laomao800/vue-listview'

const filterFieldTypes = [
  { name: '文本标签', icon: 'string', type: 'label' },
  { name: '文本框', icon: 'text', type: 'text' },
  { name: '数字', icon: 'number', type: 'number' },
  { name: '单选选项', icon: 'select', type: 'select' },
  { name: '多选选项', icon: 'select', type: 'multipleSelect' },
  { name: '级联选项', icon: 'select', type: 'cascader' },
  { name: '日期选择', icon: 'date', type: 'date' },
  { name: '日期范围', icon: 'date', type: 'dateRange' },
  { name: '日期时间', icon: 'date', type: 'dateTime' },
  { name: '日期时间范围', icon: 'date', type: 'dateTimeRange' },
  { name: '固定时间', icon: 'time', type: 'timeSelect' },
  { name: '任意时间', icon: 'time', type: 'timePicker' },
  { name: '任意时间范围', icon: 'time', type: 'timePickerRange' }
]

const filterFieldTypesMap = _.keyBy(filterFieldTypes, 'type')

export { filterFieldTypes, filterFieldTypesMap }

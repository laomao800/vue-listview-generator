import _ from 'lodash'

export function formatJson(val: any, defaultValue: string = ''): string {
  return _.isPlainObject(val) ? JSON.stringify(val, null, 2) : defaultValue
}

// TODO: 重构后删除
export function jsonToString(val: any) {
  return val ? JSON.stringify(val, null, 2) : ''
}

import _ from 'lodash'

export function formatJson(val: any, defaultValue: string = ''): string {
  return _.isPlainObject(val) ? JSON.stringify(val, null, 2) : defaultValue
}

// TODO: 重构后删除
export function jsonToString(val: any) {
  return val ? JSON.stringify(val, null, 2) : ''
}

/**
 * 带数值单位字符转换
 * 50 -> '50px'
 * '50px' -> '50px'
 * '50.5px' -> '50px'
 * '50%' -> '50%'
 * '50.5%' -> '50%'
 * 'a' -> null
 */
export function parseSizeWithUnit(value: number | string): string | null {
  const isPercent = /\d+%/.test(value.toString())
  const num = typeof value === 'string' ? parseInt(value, 10) : value
  return num ? (isPercent ? `${num}%` : `${num}px`) : null
}

export function uuid() {
  let d = _.now()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + _.random(16)) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

import _ from 'lodash'

export function formatJson(val: any, defaultValue: string = ''): string {
  return _.isPlainObject(val) || Array.isArray(val)
    ? JSON.stringify(val, null, 2)
    : defaultValue
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
export function parseSizeWithUnit(value: any): string | null {
  if (/^-?\d+(.\d+)?(%|(px))$/.test(value)) {
    return value
  } else if (typeof value === 'number') {
    return `${value}px`
  }
  const num = parseInt(value, 10)
  return !isNaN(num) ? `${num}px` : null
}

export function uuid() {
  let d = _.now()
  return 'xxxxxx'.replace(/x/g, function(c) {
    const r = (d + _.random(16)) % 16 | 0
    d = Math.floor(d / 16)
    return r.toString(16)
  })
}

export const JSONfn = {
  stringify(obj: object, space?: number) {
    return JSON.stringify(
      obj,
      function(key, value) {
        return typeof value === 'function' ? value.toString() : value
      },
      space
    )
  },
  parse(str: string) {
    return JSON.parse(str, function(key, value) {
      if (typeof value !== 'string') return value
      if (value.substring(0, 8) === 'function') {
        // eslint-disable-next-line no-new-func
        const newFunc = new Function(`return ${value}`)()
        return newFunc
      }
      return value
    })
  }
}

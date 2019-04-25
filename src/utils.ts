import _ from 'lodash'
import * as prettier from 'prettier/standalone'
import * as prettierBabylon from 'prettier/parser-babylon'
import * as prettierHTML from 'prettier/parser-html'

export function prettify(code: string, prettierOptions = {}) {
  return prettier.format(code, {
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: true,
    parser: 'babel',
    plugins: [prettierBabylon, prettierHTML],
    ...prettierOptions
  })
}

export function prettifyJson(data: any): string {
  return prettify(JSON.stringify(data), {
    parser: 'json5'
  })
}

export function prettifyJsonStringify(data: any): string {
  return prettify(JSON.stringify(data), {
    parser: 'json-stringify'
  })
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

export function isFunctionString(input: any) {
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(`return ${input}`)()
    return _.isFunction(func)
  } catch (e) {}
  return false
}

export function createFunction(input: any) {
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(`return ${input.trim()}`)()
    if (_.isFunction(func)) {
      return func
    }
  } catch (e) {}
  return () => {}
}

export function simpleTpl(content: string, variables: any) {
  const keys = Object.keys(variables)
  const reg = new RegExp(`<%= ?(${keys.join('|')}) ?%>`, 'g')
  return content.replace(reg, function(match, p1) {
    return variables[p1] || ''
  })
}

export function dataMapping(data: any = {}, dataMap: any = {}) {
  const get = require('get-value')
  const result: any = {}
  const keysMap = Object.keys(dataMap)

  keysMap.forEach(key => {
    try {
      const dataKey = key.toString()
      const dataValue = get(data, dataMap[key])
      result[dataKey] = dataValue
    } catch (e) {}
  })

  return result
}

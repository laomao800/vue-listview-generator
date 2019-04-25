import Vue from 'vue'
import _ from 'lodash'
import codeDialogServices from '@/service/CodeDialog'
import { prettifyJsonStringify } from '@/utils'

function optionsValidator(data: any) {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        _.isPlainObject(item) &&
        typeof item.label === 'string' &&
        item.hasOwnProperty('value')
    )
  )
}

function parseOptionsCode(code = '') {
  try {
    const parsedData = JSON.parse(code)
    if (optionsValidator(parsedData)) {
      return parsedData
    } else {
      throw Error('所有选项数据必须符合类型 {label: string, value: any}[] 。')
    }
  } catch (e) {
    Vue.prototype.$message.error(e.toString())
  }
}

export default function({ options = [] }) {
  return new Promise((resolve, reject) => {
    const codeDialog = codeDialogServices({
      content: prettifyJsonStringify(options),
      title: '选项编辑',
      width: 800,
      height: 300,
      buttons: [
        {
          text: '取消',
          click() {
            // eslint-disable-next-line
            reject('cancel')
            codeDialog.hide()
          }
        },
        {
          text: '确定',
          type: 'primary',
          click: (content: string) => {
            if (content.trim() === '') {
              resolve([])
              codeDialog.hide()
            } else {
              const options = parseOptionsCode(content)
              if (options) {
                resolve(options)
                codeDialog.hide()
              }
            }
          }
        }
      ]
    })
  })
}

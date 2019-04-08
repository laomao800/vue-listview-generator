import { ActionTree } from 'vuex'
import { createFunction } from '@/utils'

export const mapFields = true

export const state = {
  requestType: 'default',
  setContentDataMap: false,
  setResolveResponseErrorMessage: false,
  setValidateResponse: false,
  setContentMessage: false,
  props: {
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
    validateResponse: `function validateResponse(response) {
  try {
    return response.is_success
  } catch (e) {
    return false
  }
}`,
    resolveResponseErrorMessage: `function resolveResponseErrorMessage(response) {
  try {
    return response.error_info.msg
  } catch (e) {
    return '未知错误'
  }
}`
  }
}

export const actions: ActionTree<typeof state, any> = {
  getConfig({ state }) {
    {
      const {
        requestType,
        setContentDataMap,
        setResolveResponseErrorMessage,
        setValidateResponse,
        setContentMessage,
        props
      } = state
      const finalProps: any = {}

      if (!props.autoload) {
        finalProps['autoload'] = false
      }

      if (props.requestMethod !== 'get') {
        finalProps['requestMethod'] = props.requestMethod
      }

      if (requestType === 'default') {
        finalProps['requestUrl'] = props.requestUrl
      } else {
        finalProps['requestHandler'] = props.requestHandler
      }

      if (setContentDataMap) {
        finalProps['contentDataMap'] = props.contentDataMap
      }

      if (setContentMessage) {
        finalProps['contentMessage'] = props.contentMessage
      }

      if (setResolveResponseErrorMessage) {
        finalProps['resolveResponseErrorMessage'] = createFunction(
          props.resolveResponseErrorMessage
        )
      }

      if (setValidateResponse) {
        finalProps['validateResponse'] = createFunction(props.validateResponse)
      }

      return finalProps
    }
  }
}

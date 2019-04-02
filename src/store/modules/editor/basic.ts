import _ from 'lodash'
import { GetterTree } from 'vuex'

export const state = {
  props: {
    headerTitle: '',
    headerNav: [],
    fullHeight: true,
    height: '',
    usePage: true,
    pageSize: 20,
    pageSizes: [20, 50, 100]
  }
}

export const getters: GetterTree<typeof state, any> = {
  props(state) {
    const { props } = state

    const finalProps: any = {}

    if (props.headerTitle) {
      finalProps['headerTitle'] = props.headerTitle
    }

    if (props.headerNav.length > 0) {
      finalProps['headerNav'] = props.headerNav
    }

    if (!props.fullHeight) {
      finalProps['fullHeight'] = props.fullHeight
    }

    if (!props.fullHeight && props.height) {
      finalProps['height'] = props.height
    }

    if (!props.usePage) {
      finalProps['usePage'] = props.usePage
    }

    if (props.pageSize !== 20) {
      finalProps['pageSize'] = props.pageSize
    }

    if (!_.isEqual(props.pageSizes, [20, 50, 100])) {
      finalProps['pageSizes'] = props.pageSizes
    }

    return finalProps
  }
}

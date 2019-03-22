import { MutationTree, GetterTree, ActionTree } from 'vuex'

export interface State {
  [x: string]: any
  configType: 'default' | 'custom'
}
const initialState: State = {
  configType: 'default',
  setContentDataMap: false,
  setResolveResponseErrorMessage: false,
  setValidateResponse: false,
  useContentMessage: false,
  contentDataResult: null,
  interContentMessage: {
    type: 'info',
    message: '初次打开页面不加载数据，请组合条件进行搜索。'
  }
}

const getters: GetterTree<State, any> = {}

const mutations: MutationTree<State> = {}

const actions: ActionTree<State, any> = {}

export { initialState as state, mutations, getters, actions }

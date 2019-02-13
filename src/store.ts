import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [
      {
        title: '测试页面1',
        data: {}
      }
    ]
  },
  mutations: {},
  actions: {}
})

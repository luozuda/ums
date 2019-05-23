import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userName: ""
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserName(state, userName) {
      state.userName = userName
    }
  },
  actions: {

  }
})

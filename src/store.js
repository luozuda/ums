import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    },
    //退出当前账号
    logout(state) {
      localStorage.clear();
      state.token = ""
      state.userName = ""
      router.replace({ path: '/login' })
    }
  },
  actions: {

  }
})

export default store

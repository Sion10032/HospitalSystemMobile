import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      email: '',
      username: '请登录',
      profile: {
        address: ''
      }
    },
    isLogin: false,
    isCheck: false
  },
  mutations: {
    setUser: function (state, user) {
      state.user.id = user.id
      state.user.email = user.email
      state.user.username = user.username
      state.user.profile = user.profile
    },
    setLogin: function (state, loginState) {
      state.isLogin = loginState
    },
    setCheck: function (state, isCheck) {
      state.isCheck = isCheck
    }
  },
  actions: {
  },
  modules: {
  }
})

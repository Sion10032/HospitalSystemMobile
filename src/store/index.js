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
    isCheck: false,
    department: [],
    bookingTimes: []
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
    },
    setDepartment: function (state, department) {
      for (let it of department) {
        state.department.push(it)
      }
    },
    setBookingTimes: function (state, bookingTimes) {
      for (let it of bookingTimes) {
        state.bookingTimes.push(it)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

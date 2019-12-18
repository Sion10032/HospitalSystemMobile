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
    bookingTimes: [],
    doctors: {},
    medicineHandout: []
  },
  getters: {
    getLab: function (state) {
      return function (id) {
        for (let it of state.department) {
          if (it.id === id) {
            return it.name
          }
        }
      }
    },
    getTime: function (state) {
      return function (id) {
        for (let it of state.bookingTimes) {
          if (it.id === id) {
            return it.start + ' - ' + it.end
          }
        }
      }
    },
    getDoctor: function (state) {
      return function (id) {
        for (let k in state.doctors) {
          for (let it of state.doctors[k]) {
            if (it.id === id) {
              return it.profile.name
            }
          }
        }
      }
    },
    // 返回药物发放id
    getMedicineHandout: function (state) {
      return function (id) {
        for (let k in state.medicineHandout) {
          for (let it of state.medicineHandout[k]) {
            if (it.prescription.patient === id) {
              return it.id
            }
          }
        }
      }
    }
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
    },
    addDoctors: function (state, doctors) {
      Vue.set(state.doctors, doctors.id, doctors.docs)
    }
  },
  actions: {
  },
  modules: {
  }
})

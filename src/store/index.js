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
    medicines: [],
    doctors: {},
    handoutStatus: ['待配药', '配药中', '待发药', '发药中', '发药完成']
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
    getMedicine: function (state) {
      return function (id) {
        for (let it of state.medicines) {
          if (it.id === id) {
            return it.name
          }
        }
      }
    },
    getMedicinePrice: function (state) {
      return function (id) {
        for (let it of state.medicines) {
          if (it.id === id) {
            return it.price
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
    setMedicines: function (state, medicines) {
      state.medicines.splice(0, state.medicines.length)
      for (let it of medicines) {
        state.medicines.push(it)
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

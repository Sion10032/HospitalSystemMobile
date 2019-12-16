import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import VueAuth from '@websanova/vue-auth'
import VueAuthAuth from '@websanova/vue-auth/drivers/auth/bearer.js'
import VueAuthHttp from '@websanova/vue-auth/drivers/http/axios.1.x.js'
import VueAuthRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x.js'
import {
  Tabbar, TabbarItem, Cell, CellGroup,
  Image, Grid, GridItem, Tab, Tabs,
  Search, Panel, Button, NavBar,
  Step, Steps, Lazyload, Field, Popup,
  Picker, DatetimePicker
} from 'vant'

Vue.use(VueAxios, axios)

Vue.use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)
  .use(Image).use(Grid).use(GridItem).use(Tab).use(Tabs)
  .use(Search).use(Panel).use(Button).use(NavBar)
  .use(Step).use(Steps).use(Lazyload).use(Field).use(Popup)
  .use(Picker).use(DatetimePicker)

Vue.router = router
Vue.use(VueAuth, {
  auth: VueAuthAuth,
  http: VueAuthHttp,
  router: VueAuthRouter
})

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://47.106.164.144:8000/api/'
Vue.prototype.$axios = axios

axios.all([
  axios({ methods: 'get', url: '/departments/' }),
  axios({ methods: 'get', url: '/reservation-time/' })
]).then(axios.spread((department, bookingTimes) => {
  store.commit('setDepartment', department.data)
  store.commit('setBookingTimes', bookingTimes.data)
})).then(async () => {
  if (localStorage.getItem('refresh')) {
    await axios({
      method: 'post',
      url: '/auth/refresh/',
      data: {
        refresh: localStorage.getItem('refresh')
      }
    }).then((result) => {
      // 设置header
      localStorage.setItem('access', result.data['access'])
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
    }).catch((err) => {
      store.commit('setLogin', false)
      localStorage.clear()
      console.log(err)
    })
  }
}).then(async () => {
  if (localStorage.getItem('access')) {
    // 刷新用户信息
    await axios({
      method: 'get',
      url: '/auth/user/'
    }).then((result) => {
      store.commit('setUser', result.data)
      store.commit('setLogin', true)
    })
  }
}).finally(() => {
  store.commit('setCheck', true)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import {
  Tabbar, TabbarItem, Cell, CellGroup,
  Image, Grid, GridItem, Tab, Tabs,
  Search, Panel, Button, NavBar,
  Step, Steps, Lazyload, Field, Popup,
  Picker, DatetimePicker, Tag, Divider
} from 'vant'

Vue.use(VueAxios, axios)

Vue.use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)
  .use(Image).use(Grid).use(GridItem).use(Tab).use(Tabs)
  .use(Search).use(Panel).use(Button).use(NavBar)
  .use(Step).use(Steps).use(Lazyload).use(Field).use(Popup)
  .use(Picker).use(DatetimePicker).use(Tag).use(Divider)

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
}).then(async () => {
  let urls = []
  for (let it of store.state.department) {
    urls.push(axios({
      method: 'get',
      url: /groups/ + it.id + '/users/'
    }))
  }
  await axios.all(urls).then((result) => {
    for (let it of result) {
      store.commit('addDoctors', { id: it.config.url.split('/')[5], docs: it.data })
    }
  })
}).finally(() => {
  store.commit('setCheck', true)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

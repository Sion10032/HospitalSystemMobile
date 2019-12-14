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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

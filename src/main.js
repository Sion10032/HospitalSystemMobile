import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Tabbar, TabbarItem, Cell, CellGroup,
  Image, Grid, GridItem, Tab, Tabs,
  Search, Panel, Button, NavBar,
  Step, Steps, Lazyload, Field, Popup,
  Picker, DatetimePicker
} from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)
  .use(Image).use(Grid).use(GridItem).use(Tab).use(Tabs)
  .use(Search).use(Panel).use(Button).use(NavBar)
  .use(Step).use(Steps).use(Lazyload).use(Field).use(Popup)
  .use(Picker).use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

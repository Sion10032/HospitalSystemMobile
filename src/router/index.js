import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/me',
    name: 'me',
    component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue')
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import(/* webpackChunkName: "bookings" */ '../views/Patient/BookingList.vue')
  },
  {
    path: '/bookings/:id',
    name: 'booking',
    component: () => import(/* webpackChunkName: "booking" */ '../views/Patient/Booking.vue')
  },
  {
    path: '/bookingcreate',
    name: 'bookingcreate',
    component: () => import(/* webpackChunkName: "bookingcreate" */ '../views/Patient/BookingCreate.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
  }, {
    path: '/payments',
    name: 'payments',
    component: () => import(/* webpackChunkName: "payments" */ '../views/Finance/Payments.vue')
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import(/* webpackChunkName: "cases" */ '../views/Patient/Cases.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

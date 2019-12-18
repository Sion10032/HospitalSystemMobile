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
    path: '/fee/:id',
    name: 'fee',
    props: true,
    component: () => import(/* webpackChunkName: "fee" */ '../views/Patient/Fee.vue')
  },
  {
    path: '/bookings/:id',
    name: 'booking',
    props: true,
    component: () => import(/* webpackChunkName: "booking" */ '../views/Patient/Booking.vue')
  },
  {
    path: '/medicalrecords/:id',
    name: 'medicalrecord',
    props: true,
    component: () => import(/* webpackChunkName: "booking" */ '../views/Patient/MedicalRecord.vue')
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
  },
  {
    path: '/madicalrecords',
    name: 'madicalrecords',
    component: () => import(/* webpackChunkName: "medicalrecords" */ '../views/Patient/MedicalRecordList.vue')
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/farming',
    component: () => import('../views/Farming.vue')
  },
  {
    path: '/wallet',
    component: () => import('../views/Wallet.vue')
  },
  {
    path: '/open-pack',
    component: () => import('../views/OpenPack')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

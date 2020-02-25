import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) => {
  Nprogress.start()
  next()
})

router.afterEach((to,from) => {
  Nprogress.done()
})

export default router

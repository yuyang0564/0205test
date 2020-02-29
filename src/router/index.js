import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import routes from './routes'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  Nprogress.start()
  let auth = router.app.$options.store.getters.auth
  //!! 已登录用户，无需重复登录
  if(auth && to.path.includes('/auth')) {
    next('/')
  } else {
    next()
  } 
  
})

router.afterEach((to,from) => {
  Nprogress.done()
})



export default router

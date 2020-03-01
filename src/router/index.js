import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import routes from './routes'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes
})


router.beforeEach((to, from, next) => {
  Nprogress.start()
  let store = router.app.$options.store
  let auth = store.getters.auth
  let user = store.state.user
  //!! 已登录用户，无需重复登录
 
  if(
    (auth && to.path.includes('/auth')) ||
    (to.meta.auth && !auth) ||
    (to.path.includes('/user') && to.params.userid != user.id )
    ) {
    next('/')
  } else {
    next()
  } 
  
})

router.afterEach((to,from) => {
  Nprogress.done()
})



export default router


export default [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "auth" */ "@/views/auth/Register")
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "auth" */ "@/views/auth/Login")
    }
]
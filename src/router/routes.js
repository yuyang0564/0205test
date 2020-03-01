
export default [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/auth/Register")
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/auth/Login")
  },
  {
    path: "/user/:userid",
    name: "UserEdit",
    component: () => import(/* webpackChunkName: "user" */ "@/views/user/Edit"),
    meta: { auth: true },
    children: [
      {
        path: "edit",
        name: "UserEditProfile",
        component: () => import(/* webpackChunkName: "user" */ "@/views/user/Profile")
      },
      {
        path: "edit_avatar",
        name: "UserEditAvatar",
        component: () => import(/* webpackChunkName: "user" */ "@/views/user/Avatar")
      },
      {
        path: "edit_password",
        name: "UserEditPassword",
        component: () => import(/* webpackChunkName: "user" */ "@/views/user/Password")
      }
    ]
  },
]
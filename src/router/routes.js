
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
  {
    path: "/articles/create",
    name: "CreateArticle",
    component: () => import(/* webpackChunkName: "articles" */ "@/views/articles/Create"),
    meta: { auth: true }
  },
  {
    path: "/articles/:articleId/edit",
    name: "ArticleUpdate",
    component: () => import(/* webpackChunkName: "articles" */ "@/views/articles/Edit"),
    meta: { auth: true }
  },
  {
    path: "/:username/column",
    component: () => import(/* webpackChunkName: "userarticlecolumn" */ "@v/articles/Column"),
    children: [
      {
        path: "",
        name: "UserArticleColumn",
        component: () => import(/* webpackChunkName: "userarticlecolumn" */ "@v/articles/List")
      },
      { //! 根据文章id 
        path: ":articleId",
        name: "ArticleContent",
        component: () => import(/* webpackChunkName: "userarticlecolumn" */ "@/views/articles/Content")
      },
    ]
  }
]
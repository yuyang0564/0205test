import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/utils/ls'
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ls.getItem('user') || false,
    menuList: ls.getItem('menus') || false,
    uid: ""
  },
  getters: {
    auth(state)
    {
      return state.user
    },
    menus(state)
    {
      return state.menuList
    }
  },
  mutations: {
    UPDATE_USER(state, user)
    {
      state.user = user
      ls.setItem('user', user)
    },
    CLEAN_USER(state)
    {
      state.user = ''
      ls.remove('user')
    },
    SET_MENUS(state, menus)
    {
      state.menuList = menus
      ls.setItem('menus', menus)
    },
    SET_UID(state, uid)
    {
      state.uid = uid
    }
  },
  actions: {
    login({ commit }, data)
    {
      if (data) commit('UPDATE_USER', data)
      router.app.$notify({ title: "登录信息提示", type: "success", text: "登录成功" })
      router.replace({ name: 'Home' })
    },
    logout({ commit })
    {
      commit('CLEAN_USER')
      router.app.$notify({ title: "登录信息提示", type: "success", text: "退出成功" })
      if (router.currentRoute.name !== 'Home') {
        router.replace({ name: "Home" })
      }
    },
    updateUser({ commit }, data)
    {
      commit('UPDATE_USER', data)
    },
    setMenus({ commit }, data)
    {
      commit('SET_MENUS', data)
    },
    setUid({ commit }, data)
    {
      commit('SET_UID', data)
    }
  },
  modules: {
  }
})

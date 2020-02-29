import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/utils/ls'
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ls.getItem('user') || '',
  },
  getters: {
    auth(state) {
      return state.user || false
    }
  },
  mutations: {
    UPDATE_USER(state,user) {
      state.user = user
      ls.setItem('user',user)
    },
    CLEAN_USER(state) {
      state.user = ''
      ls.remove('user')
    }
  },
  actions: {
    login({commit},data) {
      if(data) commit('UPDATE_USER',data)
      router.app.$notify({title:"登录信息提示",type: "success", text: "登录成功"})
      router.replace({name: 'Home'})
    },
    logout({commit}) {
      commit('CLEAN_USER')
      router.app.$notify({title:"登录信息提示",type: "success", text: "退出成功"})
      if(router.currentRoute.name !== 'Home') {
        router.replace({name: "Home"})
      }
    }
  },
  modules: {
  }
})

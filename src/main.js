import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import './styles/main.scss'
import './styles/extra.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

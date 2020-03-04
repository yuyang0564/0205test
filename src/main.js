import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Dialog from 'vuejs-dialog'
import Notify from 'vue-notification'

import './directives'
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'font-awesome/scss/font-awesome.scss'
import './styles/main.scss'
import './styles/extra.scss'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.use(Dialog)
Vue.use(Notify)
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
//import {BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'semantic-ui-css/semantic.min.css'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import { routes } from './routes'

Vue.config.productionTip = false
//Vue.use(BootstrapVue)
//Vue.use(IconsPlugin)
Vue.use(SuiVue)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: routes
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

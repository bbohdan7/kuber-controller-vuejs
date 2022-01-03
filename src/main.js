import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import VueRouter from 'vue-router'
import 'semantic-ui-css/semantic.min.css'
import { routes } from './routes'

Vue.config.productionTip = false
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

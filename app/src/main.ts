import Vue from "vue"
import App from "@/App.vue"

import router from "@/router"
import store from "@/store"

import { i18n } from "@/plugins"

Vue.config.productionTip = false
Vue.config.performance = process.env.NODE_ENV !== "production"

import "@/helpers/axios/interceptors"

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")

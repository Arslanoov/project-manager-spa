import Vue from "vue"
import App from "./App.vue"
import router, { routesNames } from "./router"
import store from "./store"

import vuetify from "./plugins/vuetify"
import axios from "axios"

import "@/helpers/axios/interceptor"

import UserInterface from "@/types/user/UserInterface"

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const user: UserInterface | undefined = JSON.parse(localStorage.getItem('user') as string)
if (user) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
}

axios.interceptors.response.use(response => response, async error => {
  if (!error.response || error.response.status !== 403) {
    return Promise.reject(error)
  }

  const query: { error: string | undefined } = {
    error: undefined
  }

  if (error.response.data) {
    query.error = error.response.data.error
  }
  await router.push({ name: routesNames.AccessDenied, query })
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")

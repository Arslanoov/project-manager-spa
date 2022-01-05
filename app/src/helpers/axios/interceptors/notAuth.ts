import axios from "axios"
import store from "@/store/index"
import router from "@/router/index"
import { routesNames } from "@/router/names"

axios.interceptors.response.use(response => response, error => {
  if (401 === error.response.status) {
    store.dispatch("User/refresh")
      .catch(() => {
        store.dispatch("User/logout")
          .then(() => router.push({
            name: routesNames.AuthHome
          }))
      })
  }

  return Promise.reject(error)
})

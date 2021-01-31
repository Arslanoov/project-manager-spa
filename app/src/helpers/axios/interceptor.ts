import axios from "axios"
import store from "@/store/index"
import router, { routesNames } from "@/router/index"

axios.interceptors.response.use(response => response, error => {
  if (401 === error.response.status) {
    store.dispatch("User/refresh")
      .catch(() => {
        store.dispatch("User/logout")
          .then(() => router.push({
            name: routesNames.Login
          }))
      })
  }

  return Promise.reject(error)
})

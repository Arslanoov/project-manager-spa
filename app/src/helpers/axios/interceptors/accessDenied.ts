import axios from "axios"

import router from "@/router"
import { routesNames } from "@/router/names"

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

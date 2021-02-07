import router from "@/router/router"
import { routesNames } from "@/router/names"

import { isAuth as checkIsAuth } from "@/helpers/auth"

router.beforeEach((to, from, next) => {
  const isAuth = checkIsAuth()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth)

  if (requiresAuth && !isAuth) {
    next({
      name: routesNames.Login
    })
    return
  }

  if (requiresNotAuth && isAuth) {
    next({
      name: routesNames.Home
    })
    return
  }

  next()
})

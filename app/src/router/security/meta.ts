import router from "@/router/router"
import { routesNames } from "@/router/names"

import { isAuth as checkIsAuth } from "@/helpers/auth"

router.beforeEach((to, from, next) => {
  const isAuth = checkIsAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  requiresAuth && !isAuth ? next({
    name: routesNames.Login
  }) : next()
})

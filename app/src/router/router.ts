import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import { routesNames } from "@/router/names"

Vue.use(VueRouter)

const loadView = (path: string): Function => {
  return () => import(
    /* webpackChunkName: "view-[request]" */
    `@/views/${path}.vue`
  )
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: {
      name: routesNames.Home
    }
  },
  {
    path: "/auth/login",
    name: routesNames.Login,
    component: loadView("Auth/Login"),
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: "/auth/sign-up",
    name: routesNames.SignUp,
    component: loadView("Auth/SignUp"),
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: "/auth/confirm-sign-up/:token",
    name: routesNames.ConfirmSignUp,
    component: loadView("Auth/ConfirmSignUp"),
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: "/today",
    name: routesNames.Home,
    component: loadView("Todo/Home"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: routesNames.Settings,
    component: loadView("Settings"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/todo/:id",
    name: routesNames.CustomSchedule,
    component: loadView("Todo/CustomSchedule"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/403",
    name: routesNames.AccessDenied,
    component: loadView("AccessDenied")
  },
  {
    path: "*",
    name: routesNames.NotFound,
    component: loadView("NotFound")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

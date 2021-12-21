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
    name: routesNames.AuthHome,
    component: loadView("Auth/Home"),
    meta: {
      layout: "auth",
      requiresNotAuth: true
    }
  },
  {
    path: "/auth/login/email",
    name: routesNames.LoginEmail,
    component: loadView("Auth/Login/Email"),
    meta: {
      layout: "auth",
      requiresNotAuth: true
    }
  },

  {
    path: "/board",
    name: routesNames.Board,
    component: loadView("Board/Home"),
    meta: {
      layout: "main",
      requiresAuth: true,
      withHeader: false
    }
  },

  {
    path: "/board/project/create",
    name: routesNames.ProjectCreate,
    component: loadView("Board/Project/Create"),
    meta: {
      layout: "main",
      requiresAuth: true,
      withHeader: true,
      title: "Project Create"
    }
  },

  {
    path: "/auth/sign-up",
    name: routesNames.SignUp,
    component: loadView("Auth/SignUp"),
    meta: {
      layout: "auth",
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
    path: "/settings",
    name: routesNames.Settings,
    component: loadView("Settings"),
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

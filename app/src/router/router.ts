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
      requiresNotAuth: true
    }
  },
  {
    path: "/auth/login/email",
    name: routesNames.LoginEmail,
    component: loadView("Auth/Login/Email"),
    meta: {
      requiresNotAuth: true
    }
  },
  {
    path: "/auth/sign-up/confirm/:token",
    name: routesNames.ConfirmSignUp,
    component: loadView("Auth/ConfirmSignUp"),
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
    path: "/board",
    name: routesNames.Board,
    component: loadView("Board/Home"),
    meta: {
      layout: "main",
      requiresAuth: true
    }
  },
  {
    path: "/board/project/create",
    name: routesNames.ProjectCreate,
    component: loadView("Board/Project/Create"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/board/project/daily",
    name: routesNames.DailyProject,
    component: loadView("Board/Project/Daily"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/board/project/:id",
    name: routesNames.CustomProject,
    component: loadView("Board/Project/View"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/board/project/:projectId/task/create",
    name: routesNames.TaskCreate,
    component: loadView("Board/Project/Task/Create"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/board/project/:projectId/task/:id",
    name: routesNames.TaskView,
    component: loadView("Board/Project/Task/View"),
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

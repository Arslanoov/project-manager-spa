import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import Login from "@/views/Auth/Login.vue"
import SignUp from "@/views/Auth/SignUp.vue"
import ConfirmSignUp from "@/views/Auth/ConfirmSignUp.vue"
import DailySchedule from "@/views/Todo/DailySchedule.vue"
import AccessDenied from "@/views/AccessDenied.vue"
import NotFound from "@/views/NotFound.vue"

import { routesNames } from "@/router/names"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: routesNames.Home,
    redirect: {
      name: routesNames.DailySchedule
    }
  },
  {
    path: "/auth/login",
    name: routesNames.Login,
    component: Login
  },
  {
    path: "/auth/sign-up",
    name: routesNames.SignUp,
    component: SignUp
  },
  {
    path: "/auth/confirm-sign-up/:token",
    name: routesNames.ConfirmSignUp,
    component: ConfirmSignUp
  },
  {
    path: "/today",
    name: routesNames.DailySchedule,
    component: DailySchedule,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/403",
    name: routesNames.AccessDenied,
    component: AccessDenied
  },
  {
    path: "*",
    name: routesNames.NotFound,
    component: NotFound
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

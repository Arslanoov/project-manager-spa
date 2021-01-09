import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import Home from "@/views/Home.vue"
import Login from "@/views/Auth/Login.vue"
import SignUp from "@/views/Auth/SignUp.vue"
import ConfirmSignUp from "@/views/Auth/ConfirmSignUp.vue"
import NotFound from "@/views/NotFound.vue"

Vue.use(VueRouter)

export enum routesNames {
  Home = "Home",
  Login = "Login",
  SignUp = "SignUp",
  ConfirmSignUp = "ConfirmSIgnUp",
  NotFound = "NotFound"
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: routesNames.Home,
    component: Home
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

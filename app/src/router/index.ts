import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import Home from "@/views/Home.vue"
import Login from "@/views/Auth/Login.vue"
import SignUp from "@/views/Auth/SignUp.vue"

Vue.use(VueRouter)

export enum routesNames {
  Home = "Home",
  Login = "Login",
  SignUp = "SignUp"
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
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router

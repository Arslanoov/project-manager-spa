import Vue from "vue"
import Vuex from "vuex"

import User from "@/store/modules/user"
import Project from "@/store/modules/project"
import Task from "@/store/modules/task"
import Settings from "@/store/modules/settings"
import Alert from "@/store/modules/alert"

import VuexPersistence from "vuex-persist"

const vuexLocalStorage = new VuexPersistence({
  key: "storage",
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Project,
    Task,
    Settings,
    Alert
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    vuexLocalStorage.plugin
  ]
})

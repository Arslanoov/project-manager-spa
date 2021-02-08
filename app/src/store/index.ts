import Vue from "vue"
import Vuex from "vuex"

import Nav from "@/store/modules/nav"
import User from "@/store/modules/user"
import Schedule from "@/store/modules/schedule"
import Task from "@/store/modules/task"
import Settings from "@/store/modules/settings"
import Alert from "@/store/modules/alert"

// TODO: Fix local storage store

// import VuexPersistence from "vuex-persist"

/*const vuexLocalStorage = new VuexPersistence({
  key: "storage",
  storage: window.localStorage
})*/

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Nav,
    User,
    Schedule,
    Task,
    Settings,
    Alert
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    // vuexLocalStorage.plugin
  ]
})

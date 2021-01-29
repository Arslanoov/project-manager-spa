import Vue from "vue"
import Vuex from "vuex"

import User from "@/store/modules/user"
import Schedule from "@/store/modules/schedule"
import Task from "@/store/modules/task"

// TODO: Fix local storage store

// import VuexPersistence from "vuex-persist"

/*const vuexLocalStorage = new VuexPersistence({
  key: "storage",
  storage: window.localStorage
})*/

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Schedule,
    Task
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    // vuexLocalStorage.plugin
  ]
})

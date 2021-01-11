import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import User from "@/store/modules/user"
import Schedule from "@/store/modules/schedule"

export default new Vuex.Store({
  modules: {
    User,
    Schedule
  },
  strict: process.env.NODE_ENV !== 'production'
})

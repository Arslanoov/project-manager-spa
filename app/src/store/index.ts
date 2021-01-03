import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import User from "@/store/modules/user"

export default new Vuex.Store({
  modules: {
    User
  },
  strict: process.env.NODE_ENV !== 'production'
})

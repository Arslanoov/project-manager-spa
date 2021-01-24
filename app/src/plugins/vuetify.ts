import Vue from "vue"
import Vuetify from "vuetify/lib/framework"

Vue.use(Vuetify)

// TODO: Add dark theme
const isDarkMode: boolean = localStorage.getItem("isDarkMode") === "true"

export default new Vuetify({
  theme: { dark: isDarkMode }
})

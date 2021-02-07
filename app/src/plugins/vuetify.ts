import Vue from "vue"
import Vuetify from "vuetify/lib/framework"

Vue.use(Vuetify)

import SettingsStorage from "@/services/storage/SettingsStorage"

const storage = new SettingsStorage()
const settings = storage.getSettings()

export default new Vuetify({
  theme: {
    dark: settings.nightMode
  }
})

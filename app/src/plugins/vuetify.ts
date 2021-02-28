import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import { LangTranslator } from "vuetify/types/services/lang"
import i18n from "@/plugins/i18n"

Vue.use(Vuetify)

import SettingsStorage from "@/services/storage/SettingsStorage"

const storage = new SettingsStorage()
const settings = storage.getSettings()

export default new Vuetify({
  theme: {
    dark: settings.nightMode
  },
  lang: {
    t: ((key: string, ...params: Array<string>) => i18n.t(key, params)) as LangTranslator
  }
})

import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import Settings from "@/store/modules/settings"
import SettingsInterface from "@/types/settings/SettingsInterface"
import {DEFAULT_SETTINGS} from "@/const/settings"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      settings: Settings
    }
  })

  return getModule(Settings, store)
}

const settingsStore = factory()

describe("Nav Store", () => {
  it("sets settings", () => {
    expect(settingsStore.settings).toEqual(DEFAULT_SETTINGS)

    let newSettings: SettingsInterface = {
      ...DEFAULT_SETTINGS,
      nightMode: true
    }

    settingsStore.setSettings(newSettings)

    expect(settingsStore.settings).toEqual(newSettings)

    newSettings = {
      ...DEFAULT_SETTINGS,
      nightMode: false
    }

    settingsStore.setSettings(newSettings)
  })

  it("sets night mode", () => {
    expect(settingsStore.settings.nightMode).toEqual(false)

    settingsStore.setNightMode(true)

    expect(settingsStore.settings.nightMode).toEqual(true)

    settingsStore.setNightMode(false)

    expect(settingsStore.settings.nightMode).toEqual(false)
  })
})

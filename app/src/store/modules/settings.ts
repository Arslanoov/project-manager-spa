import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import SettingsStorage from "@/services/storage/SettingsStorage"

import SettingsInterface from "@/types/settings/SettingsInterface"

import { DEFAULT_SETTINGS } from "@/const/settings"

const storage = new SettingsStorage()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "settings" : undefined
})

class Settings extends VuexModule {
  public settings: SettingsInterface = DEFAULT_SETTINGS

  @Mutation
  public setSettings(settings: SettingsInterface): void {
    this.settings = settings
  }

  @Mutation
  public setNightMode(nightMode: boolean): void {
    this.settings.nightMode = nightMode
  }

  @Action({ rawError: true })
  public fetchSettings(): void {
    this.context.commit("setSettings", storage.getSettings())
  }

  @Action({ rawError: true })
  public toggleNightMode(): void {
    storage.toggleNightMode()
    this.context.commit("setNightMode", !this.settings.nightMode)
  }

  @Action({ rawError: true })
  public changeNightMode(value: boolean): void {
    storage.changeNightMode(value)
    this.context.commit("setNightMode", value)
  }
}

export default Settings

import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import SettingsStorage from "@/services/storage/SettingsStorage"

import SettingsInterface from "@/types/settings/SettingsInterface"

import { DEFAULT_SETTINGS } from "@/const/settings"

const storage = new SettingsStorage()

@Module({
  namespaced: true
  // Add for tests name: "settings"
  // TODO: Fix
})

class Settings extends VuexModule {
  public settings: SettingsInterface = DEFAULT_SETTINGS

  @Mutation
  public setSettings(settings: SettingsInterface): void {
    this.settings = settings
  }

  @Mutation
  public changeNightMode(nightMode: boolean): void {
    this.settings.nightMode = nightMode
  }

  @Action({ rawError: true })
  public fetchSettings(): void {
    this.context.commit("setSettings", storage.getSettings())
  }

  @Action({ rawError: true })
  public toggleNightMode(): void {
    storage.toggleNightMode()
    this.context.commit("changeNightMode", !this.settings.nightMode)
  }
}

export default Settings

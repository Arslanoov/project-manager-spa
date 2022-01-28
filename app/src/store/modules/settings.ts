import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import SettingsStorage from "@/services/storage/SettingsStorage"

import SettingsInterface from "@/types/settings/SettingsInterface"

import { defaultSettings } from "@/const/settings"

const storage = new SettingsStorage()

@Module({
  namespaced: true,
  name: process.env.NODE_ENV === "test" ? "settings" : undefined
})

class Settings extends VuexModule {
  public settings: SettingsInterface = defaultSettings()
  public language = "ru"

  @Mutation
  public setSettings(settings: SettingsInterface): void {
    this.settings = settings
  }

  @Mutation
  public setHideTasksMode(nightMode: boolean): void {
    this.settings.hideFinishedTasks = nightMode
  }

  @Mutation
  public setLanguage(name: string): void {
    this.language = name
  }

  @Action({ rawError: true })
  public fetchSettings(): void {
    this.context.commit("setSettings", storage.getSettings())
  }

  @Action({ rawError: true })
  public toggleHideTasks(): void {
    storage.toggleHideTasks()
    this.context.commit("setHideTasksMode", !this.settings.hideFinishedTasks)
  }

  @Action({ rawError: true })
  public changeLanguage(name: string): void {
    localStorage.setItem("language", name)
    this.context.commit("setLanguage", name)
  }
}

export default Settings

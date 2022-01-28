import { defaultSettings } from "@/const/settings"

import SettingsInterface from "@/types/settings/SettingsInterface"

export default class SettingsStorage {
  public getSettings(): SettingsInterface {
    const parsed = JSON.parse(localStorage.getItem("settings") as string)
    if (!parsed) {
      this.setSettings(defaultSettings())
      return JSON.parse(localStorage.getItem("settings") as string)
    }

    return parsed
  }

  public toggleHideTasks(): void {
    const settings = this.getSettings()
    this.setSettings({
      ...settings,
      hideFinishedTasks: !settings.hideFinishedTasks
    })
  }

  private setSettings(newSettings: SettingsInterface): void {
    localStorage.setItem("settings", JSON.stringify(newSettings))
  }
}

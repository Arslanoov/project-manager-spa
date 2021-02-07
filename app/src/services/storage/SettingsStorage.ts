import { DEFAULT_SETTINGS } from "@/const/settings"

import SettingsInterface from "@/types/settings/SettingsInterface"

export default class SettingsStorage {
  public getSettings(): SettingsInterface {
    const parsed = JSON.parse(localStorage.getItem("settings") as string)
    if (!parsed) {
      this.setSettings(DEFAULT_SETTINGS)
    }

    return parsed
  }

  public toggleNightMode(): void {
    const settings = this.getSettings()
    this.setSettings({
      ...settings,
      nightMode: !settings.nightMode
    })
  }

  public changeNightMode(value: boolean): void {
    const settings = this.getSettings()
    this.setSettings({
      ...settings,
      nightMode: value
    })
  }

  private setSettings(newSettings: SettingsInterface): void {
    localStorage.setItem("settings", JSON.stringify(newSettings))
  }
}

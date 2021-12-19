<template>
  <Component :is="layout" v-hotkey="keymap" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  namespace
} from "vuex-class"

import MainLayout from "@/layouts/MainLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"

import SettingsStoreModule from "@/store/modules/settings"

import SettingsInterface from "@/types/settings/SettingsInterface"

const settingsModule = namespace("Settings")

@Component({
  name: "App",
  components: {
    MainLayout,
    AuthLayout
  }
})

export default class App extends Vue {
  @settingsModule.State("settings") settings: SettingsInterface

  @settingsModule.Action("toggleHideTasks") toggleHideTasks: typeof SettingsStoreModule.prototype.toggleHideTasks
  @settingsModule.Action("fetchSettings") fetchSettings: typeof SettingsStoreModule.prototype.fetchSettings
  @settingsModule.Action("changeNightMode") changeNightMode: typeof SettingsStoreModule.prototype.changeNightMode

  public get layout() {
    return this.$route.meta.layout ? `${this.$route.meta.layout}-layout` : "main-layout"
  }

  public keymap = {
    'ctrl+m': this.toggleTheme,
    'ctrl+h': this.toggleHideTasks
  }

  public mounted(): void {
    this.fetchSettings()

    window.matchMedia("(prefers-color-scheme: dark)")
      .addListener(e => this.changeTheme(e.matches))

    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", e => this.changeTheme(e.matches))
  }

  public changeTheme(isNightMode: boolean): void {
    this.changeNightMode(isNightMode)
    this.$vuetify.theme.dark = isNightMode
  }

  public toggleTheme(): void {
    this.changeTheme(!this.settings.nightMode)
  }
}
</script>
